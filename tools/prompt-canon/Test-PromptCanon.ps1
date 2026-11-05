#Requires -Version 7
<#
.SYNOPSIS
  Compuerta del canon de prompts: todas las guías enseñan CRTT+L y verifican con V.E.R.A.
.DESCRIPTION
  Recorre -Root (por defecto _projects) sin entrar en carpetas históricas ni generadas.
  Termina en 1 si encuentra otro marco de prompt (GCSE, RCTF, CO-STAR…), una lista de pilares
  distinta de «Contexto, Rol, Tarea, Tono y Límites», o V.E.R.A. presentado como estructura.
  Canon: _core/knowledge_base/PROMPT_ENGINEERING_CANON.md
.EXAMPLE
  ./Test-PromptCanon.ps1 -Root ..\..\..\_projects\copilot365-guia
#>
param(
  [string]$Root = (Join-Path $PSScriptRoot '..\..\..\_projects'),
  [switch]$Summary
)
Import-Module (Join-Path $PSScriptRoot 'PromptCanon.psm1') -Force

$found = @(Invoke-PromptCanonScan -Root $Root)
if ($Summary) {
  $found | Group-Object { ($_.File -split '[\\/]')[0] } | Sort-Object Count -Descending |
    ForEach-Object { '{0,5}  {1}' -f $_.Count, $_.Name }
}
if ($found.Count) {
  if (-not $Summary) {
    foreach ($v in $found) { Write-Host ("{0}:{1}  {2}" -f $v.File, $v.Line, $v.Reason) -ForegroundColor Red }
  }
  Write-Host "Canon de prompts: $($found.Count) incumplimientos. Usa CRTT+L (ver PROMPT_ENGINEERING_CANON.md)." -ForegroundColor Red
  exit 1
}
Write-Host 'Canon de prompts verificado: solo CRTT+L y V.E.R.A.' -ForegroundColor Green
exit 0
