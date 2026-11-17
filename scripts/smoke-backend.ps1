param(
  [ValidateSet('x64', 'x86')]
  [string]$TargetArch = 'x64'
)
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Backend = Join-Path $Root 'backend\bin\autocar-backend.exe'
if (-not (Test-Path $Backend)) { throw "Backend não encontrado: $Backend" }

$Listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 0)
$Listener.Start()
$Port = ([System.Net.IPEndPoint]$Listener.LocalEndpoint).Port
$Listener.Stop()
$DataDir = Join-Path $env:TEMP ("autocar-smoke-{0}" -f [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force $DataDir | Out-Null
$env:AUTOCAR_HOST = '127.0.0.1'
$env:AUTOCAR_PORT = [string]$Port
$env:AUTOCAR_DATA_DIR = $DataDir
$env:AUTOCAR_ENV = 'test'
$Process = $null
try {
  $Process = Start-Process -FilePath $Backend -WorkingDirectory $Root -PassThru -WindowStyle Hidden
  $Base = "http://127.0.0.1:$Port"
  $Health = $null
  for ($attempt = 0; $attempt -lt 40; $attempt++) {
    if ($Process.HasExited) { throw "Backend encerrou com código $($Process.ExitCode)." }
    try { $Health = Invoke-RestMethod -Uri "$Base/api/health" -TimeoutSec 2; break }
    catch { Start-Sleep -Milliseconds 500 }
  }
  if (-not $Health.ok) { throw 'Endpoint /api/health não respondeu com sucesso.' }
  $LoginBody = @{ login = 'admin@autocar.local'; password = 'admin123' } | ConvertTo-Json
  $Login = Invoke-RestMethod -Uri "$Base/api/auth/login" -Method Post -ContentType 'application/json' -Body $LoginBody -TimeoutSec 10
  if (-not $Login.token) { throw 'Login de smoke test não retornou token.' }
  $Headers = @{ 'X-AutoCar-Token' = $Login.token }
  $State = Invoke-RestMethod -Uri "$Base/api/state" -Headers $Headers -TimeoutSec 10
  if (-not $State.user.admin) { throw 'Login de smoke test não recebeu a permissão de administrador.' }
  $Snapshot = @{ company = @{ legalName = ''; tradeName = 'Smoke Test Windows'; document = ''; phone = ''; email = ''; address = ''; city = ''; state = ''; zip = ''; taxRegime = '' } } | ConvertTo-Json -Depth 8
  $Saved = Invoke-RestMethod -Uri "$Base/api/state" -Method Put -Headers $Headers -ContentType 'application/json' -Body $Snapshot -TimeoutSec 10
  if ($Saved.state.company.tradeName -ne 'Smoke Test Windows') { throw 'Alteração não persistiu no snapshot SQLite.' }
  if (-not (Test-Path (Join-Path $DataDir 'autocar.db'))) { throw 'Arquivo SQLite não foi criado.' }
  Write-Host "Smoke test Windows $TargetArch aprovado: health, login, permissões e persistência SQLite."
} finally {
  if ($Process -and -not $Process.HasExited) { Stop-Process -Id $Process.Id -Force }
  Remove-Item -Recurse -Force $DataDir -ErrorAction SilentlyContinue
  Remove-Item Env:AUTOCAR_HOST, Env:AUTOCAR_PORT, Env:AUTOCAR_DATA_DIR, Env:AUTOCAR_ENV -ErrorAction SilentlyContinue
}
