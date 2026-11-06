# AutoCar Sistema Integrado — aplicativo desktop

O aplicativo desktop usa Electron para carregar `index.html`, `styles.css` e `app.js` diretamente dos arquivos locais. Depois de instalado, não precisa de servidor, Internet, API externa ou CDN para abrir a interface.

## Requisitos para empacotar

- Node.js e npm instalados no computador de build.
- Internet apenas durante o primeiro `npm install`, para baixar Electron e electron-builder.
- Após a instalação das dependências, a execução do aplicativo gerado é offline.

A versão do Electron está fixada em `22.3.27` para preservar a estratégia de compatibilidade com Windows 7, Windows 8 e Windows 10 em diante, sem depender do WebView2 instalado no sistema. O instalador Windows é gerado como NSIS e também como executável portátil. No Ubuntu é gerado o `.deb` e, opcionalmente, o AppImage.

## Ubuntu / Linux

Na raiz do projeto:

```bash
chmod +x scripts/package-desktop.sh
./scripts/package-desktop.sh
```

Os arquivos aparecem em `release/`. O script empacota o runtime diretamente com `@electron/packager` e monta o `.deb` com `dpkg-deb`, evitando a dependência do `fpm` e do gerador de atualização do electron-builder; funciona também em hosts Ubuntu ARM64.

## Windows

Abra PowerShell na raiz do projeto e execute:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\package-desktop.ps1
```

Os arquivos `.exe` aparecem em `release/`.

Para gerar um executável portátil Windows a partir de Ubuntu/Linux, sem Wine:

```bash
npm run package:windows:portable
```

Esse comando cria `release/AutoCar Sistema Integrado-win32-x64/AutoCar Sistema Integrado.exe`. Copie a pasta inteira para o Windows; o `.exe` depende dos arquivos que ficam ao lado dele. O instalador NSIS de arquivo único deve ser gerado diretamente no Windows com `./scripts/package-desktop.ps1`, porque o ambiente Linux ARM64 não executa o componente Wine exigido pelo NSIS.

Para distribuição simples, a pasta também pode ser enviada como `release/AutoCar-Sistema-Integrado-Windows-x64-portable.zip`. No Windows, extraia o ZIP e abra `AutoCar Sistema Integrado.exe`; não mova o executável para fora da pasta extraída.

## Comandos manuais

```bash
npm install
npm run start:desktop
npm run package:linux
npm run package:windows
```

O comando `start:desktop` abre a aplicação diretamente para testes. `package:all` tenta gerar os alvos Linux e Windows no mesmo ambiente; para builds Windows mais previsíveis, use o script PowerShell em uma máquina Windows.

## Persistência atual

Este empacotamento transforma o protótipo atual em aplicativo desktop, mas não cria ainda o backend SQLite real. O estado demonstrativo continua em memória e será substituído pelo monólito Python/SQLite na próxima etapa, preservando a mesma interface local.
