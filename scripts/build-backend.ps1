$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

if (-not (Get-Command pyinstaller -ErrorAction SilentlyContinue)) {
  throw 'PyInstaller não encontrado. Instale-o somente na máquina de empacotamento: py -m pip install pyinstaller'
}

Remove-Item -Recurse -Force build\backend, dist\backend -ErrorAction SilentlyContinue
pyinstaller --noconfirm --clean --onefile --name autocar-backend --distpath dist\backend --workpath build\backend backend\server.py
New-Item -ItemType Directory -Force backend\bin | Out-Null
Copy-Item dist\backend\autocar-backend.exe backend\bin\autocar-backend.exe -Force
$Backend = Join-Path $Root 'backend\bin\autocar-backend.exe'
if (-not (Test-Path $Backend)) { throw "Backend Windows não foi gerado: $Backend" }
$ProcessArchitecture = if ($env:PROCESSOR_ARCHITEW6432) { $env:PROCESSOR_ARCHITEW6432 } else { $env:PROCESSOR_ARCHITECTURE }
if ($ProcessArchitecture -ne 'AMD64') { throw "Execute este script em uma máquina Windows x64; arquitetura detectada: $ProcessArchitecture" }
Write-Host "Backend Windows nativo gerado em $Backend (arquitetura do host: $ProcessArchitecture)"
