#Requires -Version 7
<#
.SYNOPSIS
  Verifica la coherencia entre las actividades, el registro de evidencias y el catálogo de agentes.
.DESCRIPTION
  Falla (exit 1) si:
  - una actividad act-N de actividades.html no tiene evidencia en deliverables.registry.json, o al revés;
  - el contador de progreso no coincide con el número de actividades;
  - agentes-preconstruidos.html no separa los agentes disponibles en Outlook de los que requieren licencia;
  - un agente visible en Copilot de Outlook no tiene tarjeta;
  - actividades.html no incluye talleres de Outlook ni la extensión a SharePoint y Teams;
  - aparece el término prohibido «dossier».
#>
param([string]$Root = (Split-Path -Parent $PSScriptRoot))

$errors = [System.Collections.Generic.List[string]]::new()
$acts = Get-Content (Join-Path $Root 'actividades.html') -Raw -Encoding utf8
$agents = Get-Content (Join-Path $Root 'agentes-preconstruidos.html') -Raw -Encoding utf8
$registry = Get-Content (Join-Path $Root 'deliverables.registry.json') -Raw -Encoding utf8 | ConvertFrom-Json

# 1. Actividades vs. registro
$htmlIds = [regex]::Matches($acts, '<article class="activity-card[^"]*" id="(act-\d+)"') | ForEach-Object { $_.Groups[1].Value }
$regIds = $registry.artifacts | Where-Object { $_.station.page -eq 'actividades.html' } | ForEach-Object { $_.station.sectionId }
foreach ($id in $htmlIds) { if ($id -notin $regIds) { $errors.Add("La actividad $id no tiene evidencia en deliverables.registry.json.") } }
foreach ($id in $regIds) { if ($id -notin $htmlIds) { $errors.Add("El registro apunta a $id, que no existe en actividades.html.") } }
foreach ($d in $registry.artifacts) { if (-not $d.id) { $errors.Add("Hay una evidencia sin id en el registro (sectionId $($d.station.sectionId)).") } }

# 2. Hitos y progreso
foreach ($id in $htmlIds) { if ($acts -notmatch "href=`"#$id`" class=`"milestone-node`"") { $errors.Add("Falta el hito de navegación para $id.") } }
if ($acts -match 'const total = \d+;') { $errors.Add('El total de progreso está fijo; debe calcularse a partir de las tarjetas.') }

# 3. Catálogo de agentes
foreach ($s in 'id="disponibles-outlook"', 'id="requieren-licencia"') {
  if ($agents -notmatch [regex]::Escape($s)) { $errors.Add("agentes-preconstruidos.html no tiene la sección $s.") }
}
$visible = 'Prompt Coach', 'Writing Coach', 'Idea Coach', 'Workflows', 'Learning', 'SharePoint list agent', 'Asesor de reuniones', 'Career Coach'
$availableBlock = if ($agents -match '(?s)id="disponibles-outlook"(.*?)id="requieren-licencia"') { $Matches[1] } else { '' }
foreach ($a in $visible) { if ($availableBlock -notmatch [regex]::Escape($a)) { $errors.Add("El agente '$a' no aparece en la sección de disponibles en Outlook.") } }
$licensed = if ($agents -match '(?s)id="requieren-licencia"(.*)$') { $Matches[1] } else { '' }
foreach ($a in 'Researcher', 'Analyst', 'Facilitator') { if ($licensed -notmatch $a) { $errors.Add("El agente '$a' debe documentarse en la sección de licencia.") } }
if ($agents -match '7\+ agentes incluidos') { $errors.Add('La cifra «7+ agentes incluidos» no refleja la disponibilidad real.') }

# 4. Talleres de Outlook y extensión
$outlookCards = [regex]::Matches($acts, '<article class="activity-card[^"]*" id="act-\d+" data-id="\d+" data-tool="outlook"').Count
if ($outlookCards -lt 5) { $errors.Add("Se esperaban al menos 5 talleres de Outlook; hay $outlookCards.") }
foreach ($t in 'sharepoint', 'teams') { if ($acts -notmatch "data-tool=`"$t`"") { $errors.Add("Falta el taller de extensión para $t.") } }
$act2 = if ($acts -match '(?s)id="act-2".*?</article>') { $Matches[0] } else { '' }
if ($act2 -match 'Invoca al agente <strong>Researcher') { $errors.Add('El Taller 2 todavía exige Researcher como paso obligatorio.') }

if ($outlookCards -lt 10) { $errors.Add("Outlook debe ser el centro: se esperaban al menos 10 talleres de Outlook; hay $outlookCards.") }
if ($acts -notmatch 'data-diagnostic="true"') { $errors.Add('Falta el Taller 0 de diagnóstico de capacidades (data-diagnostic="true").') }
$firstCard = [regex]::Match($acts, '<article class="activity-card[^"]*"[^>]*>').Value
if ($firstCard -notmatch 'data-diagnostic="true"') { $errors.Add('El primer taller visible debe ser el diagnóstico de capacidades.') }

# 4b. Reenfoque en Outlook en las demás páginas
$apps = Get-Content (Join-Path $Root 'copilot-apps.html') -Raw -Encoding utf8
$firstApp = [regex]::Match($apps, '<h2[^>]*>\s*Microsoft (\w+)').Groups[1].Value
if ($firstApp -ne 'Outlook') { $errors.Add("copilot-apps.html debe empezar por Outlook; empieza por '$firstApp'.") }
$index = Get-Content (Join-Path $Root 'index.html') -Raw -Encoding utf8
if ([regex]::Match($index, '(?s)<h1>(.*?)</h1>').Groups[1].Value -notmatch 'Outlook') { $errors.Add('El título principal de index.html no menciona Outlook.') }
$fund = Get-Content (Join-Path $Root 'fundamentos.html') -Raw -Encoding utf8
if ($fund -notmatch 'id="copilot-en-outlook"') { $errors.Add('fundamentos.html no tiene la sección id="copilot-en-outlook".') }
$prompts = Get-Content (Join-Path $Root 'prompts.html') -Raw -Encoding utf8
if ($prompts -notmatch 'id="prompts-outlook"') { $errors.Add('prompts.html no tiene la categoría id="prompts-outlook".') }
$creacion = Get-Content (Join-Path $Root 'creacion-agentes.html') -Raw -Encoding utf8
if ($creacion -notmatch 'id="agente-para-correo"') { $errors.Add('creacion-agentes.html no tiene la sección id="agente-para-correo".') }
if ($availableBlock -notmatch 'id="copilot-outlook-base"') { $errors.Add('Falta la tarjeta base de Copilot de Outlook en la sección de disponibles.') }

# 5. Término prohibido
Get-ChildItem $Root -Filter *.html | ForEach-Object {
  if ((Get-Content $_.FullName -Raw -Encoding utf8) -match '(?i)dossier') { $errors.Add("$($_.Name) contiene el término «dossier».") }
}

if ($errors.Count) { $errors | ForEach-Object { Write-Host "ERROR: $_" -ForegroundColor Red }; exit 1 }
Write-Host "Consistencia de la guía verificada: $($htmlIds.Count) actividades, $outlookCards talleres de Outlook." -ForegroundColor Green
