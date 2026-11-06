$ErrorActionPreference = 'Stop'
$RootDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RootDir

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js não encontrado.' }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { throw 'npm não encontrado.' }

if (-not (Test-Path 'node_modules')) {
  Write-Host 'Instalando dependências de empacotamento...'
  npm install
} else {
  Write-Host 'Dependências já instaladas; reutilizando node_modules.'
}

if (Test-Path 'release') { Remove-Item 'release' -Recurse -Force }
npm run package:windows

Write-Host "`nPacotes Windows gerados em: $RootDir\release"
Get-ChildItem 'release' -File | Where-Object { $_.Extension -in '.exe' } | Select-Object -ExpandProperty FullName
