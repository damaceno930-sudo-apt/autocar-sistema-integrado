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
Write-Host "Backend compilado em $Root\backend\bin\autocar-backend.exe"
