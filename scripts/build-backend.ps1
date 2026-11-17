param(
  [ValidateSet('x64', 'x86')]
  [string]$TargetArch = 'x64'
)
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root
$ExpectedBits = if ($TargetArch -eq 'x86') { '32' } else { '64' }
$PyInstaller = $null
$PythonPrefix = @()

if ($env:AUTOCAR_BUILD_PYTHON) {
  $PythonCommand = Get-Command $env:AUTOCAR_BUILD_PYTHON -ErrorAction SilentlyContinue
  if (-not $PythonCommand) { throw "Python de build não encontrado: $env:AUTOCAR_BUILD_PYTHON" }
  $PythonExecutable = $PythonCommand.Source
  $ActualBits = & $PythonExecutable -c "import struct; print(struct.calcsize('P') * 8)"
  if ("$ActualBits" -ne $ExpectedBits) { throw "Python selecionado tem $ActualBits bits; o build $TargetArch requer $ExpectedBits bits." }
  & $PythonExecutable -c "import PyInstaller" 2>$null
  if ($LASTEXITCODE -ne 0) { throw "PyInstaller não encontrado no Python $TargetArch. Execute: python -m pip install pyinstaller" }
  $PyInstaller = $PythonExecutable
  $PythonPrefix = @('-m', 'PyInstaller')
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
  $PythonSelector = "-3-$ExpectedBits"
  & py $PythonSelector -c "import PyInstaller" 2>$null
  if ($LASTEXITCODE -ne 0) { throw "PyInstaller/Python $TargetArch não encontrado. Instale Python $TargetArch e execute: py $PythonSelector -m pip install pyinstaller" }
  $PyInstaller = 'py'
  $PythonPrefix = @($PythonSelector, '-m', 'PyInstaller')
} elseif ($TargetArch -eq 'x64' -and (Get-Command pyinstaller -ErrorAction SilentlyContinue)) {
  $PyInstaller = 'pyinstaller'
} else {
  throw "O Python Launcher e o PyInstaller da arquitetura $TargetArch são necessários para compilar o backend nativo."
}

$DistDir = Join-Path $Root "dist\backend\$TargetArch"
$WorkDir = Join-Path $Root "build\backend\$TargetArch"
Remove-Item -Recurse -Force $WorkDir, $DistDir -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $DistDir, $WorkDir | Out-Null
$PyInstallerArgs = @('--noconfirm', '--clean', '--onefile', '--name', 'autocar-backend', '--distpath', $DistDir, '--workpath', $WorkDir, 'backend\server.py')
& $PyInstaller @PythonPrefix @PyInstallerArgs
if ($LASTEXITCODE -ne 0) { throw "PyInstaller falhou para a arquitetura $TargetArch." }

$Source = Join-Path $DistDir 'autocar-backend.exe'
if (-not (Test-Path $Source)) { throw "Backend Windows não foi gerado: $Source" }
$Bytes = [System.IO.File]::ReadAllBytes($Source)
$PeOffset = [BitConverter]::ToInt32($Bytes, 0x3c)
$Machine = [BitConverter]::ToUInt16($Bytes, $PeOffset + 4)
$ExpectedMachine = if ($TargetArch -eq 'x86') { 0x014c } else { 0x8664 }
if ($Machine -ne $ExpectedMachine) { throw ("Arquitetura incorreta no backend. Esperada {0}; PE machine 0x{1:X4}." -f $TargetArch, $Machine) }
$BinDir = Join-Path $Root 'backend\bin'
New-Item -ItemType Directory -Force $BinDir | Out-Null
$Backend = Join-Path $BinDir 'autocar-backend.exe'
Copy-Item $Source $Backend -Force
Write-Host "Backend Windows nativo $TargetArch gerado e validado em $Backend"
