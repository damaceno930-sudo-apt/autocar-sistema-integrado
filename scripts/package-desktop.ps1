param(
  [ValidateSet('x64', 'x86')]
  [string]$Architecture = 'x64'
)
$ErrorActionPreference = 'Stop'
$RootDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RootDir
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js não encontrado.' }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { throw 'npm não encontrado.' }
if (-not (Test-Path 'node_modules')) { npm ci }

& (Join-Path $RootDir 'scripts\build-backend.ps1') -TargetArch $Architecture
if (Test-Path 'release') { Remove-Item 'release' -Recurse -Force }
if ($Architecture -eq 'x86') { npm run package:windows:x86 } else { npm run package:windows }
if ($LASTEXITCODE -ne 0) { throw "Empacotamento Windows $Architecture falhou." }
Write-Host "`nPacotes Windows $Architecture gerados em: $RootDir\release"
Get-ChildItem 'release' -File | Where-Object { $_.Extension -in '.exe' } | Select-Object -ExpandProperty FullName
