#Requires -Version 7
# Copia de _infrastructure/devbraind/scripts/PromptCanon.psm1 (fuente canónica). No la edites aquí: actualiza la fuente y vuelve a copiarla.
<#
  Reglas del canon de prompts de DevBrain (_core/knowledge_base/PROMPT_ENGINEERING_CANON.md).
  Método único para construir prompts: CRTT+L (Contexto, Rol, Tarea, Tono, Límites).
  Protocolo único para verificar la respuesta: V.E.R.A. (nunca como estructura del prompt).
  Una línea puede declarar una excepción con data-prompt-canon-exception="motivo" o
  <!-- prompt-canon-exception: motivo -->; solo para mencionar equivalencias, no para enseñarlas.
#>

# Acrónimos que solo nombran marcos de prompt: se rechazan siempre.
$script:Unambiguous = 'GCSE', 'RCTF', 'RCIRF', 'RTCE', 'CO-STAR', 'COSTAR', 'RISEN', 'TCREI', 'PTCF'
# Acrónimos que también son palabras técnicas: se rechazan solo junto a vocabulario de prompts.
$script:Ambiguous = 'CREATE', 'CLEAR', 'PREP', 'RTF', 'CRAFT', 'RACE', 'CARE', 'ROSES'
$script:QuickAcronyms = '(?<![\w-])(?:' + ((@($script:Unambiguous) + @($script:Ambiguous) | ForEach-Object { [regex]::Escape($_) }) -join '|') + ')(?![\w-])'
$script:PromptWords ='(?i)\b(prompts?|prompting|marco|m[ée]todo|f[óo]rmula|est[áa]ndar|framework|t[ée]cnica)\b'

$script:Canonical = 'contexto', 'rol', 'tarea', 'tono', 'limites'
$script:PillarWord = '(?:rol|contexto|tarea|tono|l[íi]mites|formato|restricciones|objetivo|fuentes?|expectativas)'
$script:PillarList = "(?i)\b$PillarWord(?:\s*(?:,|·|\+|/|→|\by\b|\be\b)\s*$PillarWord\b){2,}"

function ConvertTo-PillarKey([string]$Word) {
  $w = $Word.ToLowerInvariant() -replace 'í', 'i'
  if ($w -eq 'fuentes') { return 'fuente' }
  return $w
}

function Test-CanonicalPillarList([string]$List) {
  $words = @([regex]::Matches($List, "(?i)$script:PillarWord") | ForEach-Object { ConvertTo-PillarKey $_.Value })
  # Una enumeración de controles («fuente, límites y formato») no es un marco: solo se evalúa
  # si nombra al menos dos pilares centrales de un marco de prompt.
  $core = @($words | Where-Object { $_ -in 'rol', 'contexto', 'tarea', 'objetivo' }).Count
  if ($core -lt 2) { return $true }
  $last = -1
  foreach ($w in $words) {
    $pos = [array]::IndexOf($script:Canonical, $w)
    if ($pos -le $last) { return $false }   # pieza ajena (-1) o fuera de orden
    $last = $pos
  }
  return $true
}

function Find-PromptCanonViolation {
  [CmdletBinding()]
  param([AllowEmptyString()][string]$Text, [string]$File = '')
  if ([string]::IsNullOrEmpty($Text)) { return }
  # Filtro rápido por archivo: solo se analiza línea a línea si aparece algún disparador.
  if (-not ($Text -cmatch $script:QuickAcronyms -or $Text -match $script:PillarList -or $Text -match 'V\.\s?E\.\s?R\.\s?A')) { return }
  $lines = $Text -split "`r?`n"
  for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line -match 'prompt-canon-exception') { continue }
    $hits = [System.Collections.Generic.List[object]]::new()

    foreach ($a in $script:Unambiguous) {
      if ($line -cmatch "(?<![\w-])$([regex]::Escape($a))(?![\w-])") { $hits.Add(@($a, "marco de prompt no canónico «$a»; usa CRTT+L")) }
    }
    if ($line -match $script:PromptWords) {
      foreach ($a in $script:Ambiguous) {
        # El acrónimo debe estar a 40 caracteres o menos del vocabulario de prompts y no ir
        # seguido de otra palabra en mayúsculas (CREATE INDEX, CLEAR CACHE…).
        $acrHits = [regex]::Matches($line, "(?<![\w-])$a(?![\w-])(?!\s+[A-Z]{3,})")
        $wordHits = [regex]::Matches($line, $script:PromptWords)
        $close = foreach ($x in $acrHits) {
          foreach ($w in $wordHits) {
            $gap = if ($w.Index -ge $x.Index) { $w.Index - ($x.Index + $x.Length) } else { $x.Index - ($w.Index + $w.Length) }
            if ($gap -le 40) { $true }
          }
        }
        if ($close) { $hits.Add(@($a, "marco de prompt no canónico «$a»; usa CRTT+L")) }
      }
    }
    foreach ($m in [regex]::Matches($line, $script:PillarList)) {
      if (-not (Test-CanonicalPillarList $m.Value)) { $hits.Add(@($m.Value, 'lista de pilares distinta de Contexto, Rol, Tarea, Tono y Límites')) }
    }
    $veraAsStructure = '(?i)((estructur|redact|constru|escrib|arm|formul|elabor)\w*[^.\n]{0,40}\b(prompts?|consultas?|instrucci[oó]n(es)?)\b[^.\n]{0,60}' +
      '|\b(constructor|plantilla|generador|evaluador|calificador)\w*\s+(guiad[oa]\s+)?de\s+(prompts?|instrucciones)\s+)V\.\s?E\.\s?R\.\s?A'
    # Si la misma frase nombra CRTT+L para construir, V.E.R.A. aparece como revisión: es correcto.
    # Tampoco hay falta si V.E.R.A. va precedido de una palabra de revisión («auditoría V.E.R.A.»).
    if ($line -match $veraAsStructure -and $Matches[0] -notmatch 'CRTT' -and
        $Matches[0] -notmatch '(?i)(auditor|revis|verific|compuerta|chequeo|comprobaci)\w*\s+(con\s+)?(el\s+|la\s+)?(protocolo\s+)?V\.\s?E\.\s?R\.\s?A$') {
      $hits.Add(@('V.E.R.A.', 'V.E.R.A. verifica la respuesta; no es la estructura del prompt'))
    }

    foreach ($h in $hits) {
      [pscustomobject]@{ File = $File; Line = $i + 1; Match = $h[0]; Reason = $h[1]; Text = $line.Trim() }
    }
  }
}

$script:Extensions = '.html', '.htm', '.md', '.json', '.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.txt', '.py', '.yml', '.yaml', '.csv'
$script:SkipDirs = '_archive', 'archive', 'backups', 'backup', 'vault', 'legacy', '_graveyard', 'node_modules', '.git',
  'dist', 'build', 'coverage', '__pycache__', 'output', 'outputs', '.entire', 'baseline', 'site-packages',
  '.next', '.nuxt', 'target', 'vendor', '.cache', '.pytest_cache', '.mypy_cache', 'bin', 'obj', '.gradle', '.idea',
  'tmp', '.agents', '.playwright-cli', '.claude', '.cursor', '.gemini', '.opencode', '.devbrain'

function Test-SkipDir([string]$Name) {
  return $Name -in $script:SkipDirs -or $Name -match '^\.?venv' -or $Name -match '^(?:_|\.)?archive'
}

function Get-PromptCanonFiles([string]$Root) {
  $stack = [System.Collections.Generic.Stack[string]]::new()
  $stack.Push((Resolve-Path $Root).Path)
  while ($stack.Count) {
    $dir = $stack.Pop()
    try {
      $subdirs = [IO.Directory]::GetDirectories($dir)
      $files = [IO.Directory]::GetFiles($dir)
    } catch { continue }   # carpeta inaccesible (p. ej. enlaces de WSL)
    foreach ($d in $subdirs) {
      if (-not (Test-SkipDir (Split-Path $d -Leaf))) { $stack.Push($d) }
    }
    foreach ($f in $files) {
      $info = [IO.FileInfo]$f
      # Se omiten los paquetes generados con hash (index-Dclni4gm.js): se corrigen en su fuente.
      if ($info.Extension.ToLowerInvariant() -in $script:Extensions -and $info.Length -lt 3MB -and $info.Name -notmatch '-[A-Za-z0-9_]{8}\.m?js$') { $f }
    }
  }
}

function Invoke-PromptCanonScan {
  [CmdletBinding()]
  param([Parameter(Mandatory)][string]$Root)
  foreach ($f in Get-PromptCanonFiles $Root) {
    $text = [IO.File]::ReadAllText($f)
    Find-PromptCanonViolation -Text $text -File ([IO.Path]::GetRelativePath($Root, $f))
  }
}

Export-ModuleMember -Function Find-PromptCanonViolation, Invoke-PromptCanonScan
