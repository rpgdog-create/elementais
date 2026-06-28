# Elementais RPG - Rastreador de Coleção 🌟

Um aplicativo PWA (Progressive Web App) premium e moderno para acompanhar sua coleção de sprites e criaturas no **Elementais RPG**. Este aplicativo foi projetado para rodar perfeitamente em dispositivos móveis como um aplicativo nativo e pode ser empacotado para Android (APK).

---

## 🚀 Como Executar o Projeto Localmente

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Gerar a build de produção:**
   ```bash
   npm run build
   ```

---

## 🛠️ Como Publicar no GitHub Pages (Através da branch main usando a pasta /docs)

Para usar o **PWABuilder** e gerar seu APK, seu aplicativo precisa estar hospedado em uma URL segura (`https://`). O **GitHub Pages** permite que você publique o app gratuitamente diretamente da pasta `/docs` na sua branch `main`.

### Passo 1: Ajustar a URL Base (se necessário)
No arquivo `vite.config.ts`, você verá a linha:
```typescript
base: '/elementais/',
```
Como o seu repositório no GitHub se chama exatamente `elementais`, a configuração já está perfeita e configurada como `/elementais/`! Não precisa alterar nada.

### Passo 2: Gerar os Arquivos do App Localmente
Execute o comando de build no seu computador:
```bash
npm run build
```
Isso criará uma pasta chamada `docs` na raiz do seu projeto contendo todos os arquivos prontos para o PWA (HTML, JS, CSS, Manifesto e Ícones).

### Passo 3: Criar o Repositório no GitHub
1. Vá até o seu GitHub e crie um novo repositório público chamado `elementais`.
2. Não adicione README ou arquivos `.gitignore` na criação do repositório (pois o projeto já os possui).

### Passo 4: Enviar o Código e a pasta `docs` para o GitHub
Abra o terminal na pasta do seu projeto e execute os seguintes comandos:
```bash
# Inicializar o git (caso não esteja inicializado)
git init

# Adicionar todos os arquivos (incluindo a pasta docs/)
git add .

# Criar o commit inicial
git commit -m "feat: build do PWA configurado na pasta docs para publicacao"

# Renomear a branch padrão para main
git branch -M main

# Vincular ao seu repositório remoto
git remote add origin https://github.com/rpgdog-create/elementais.git

# Enviar o código
git push -u origin main
```

### Passo 5: Ativar a Publicação no GitHub Pages
1. Vá no seu repositório no GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment**, sob **Source**, mantenha **Deploy from a branch**.
4. Em **Branch**, selecione a branch `main`.
5. No seletor de pastas ao lado (que por padrão diz `/ (root)`), altere para **/docs**.
6. Clique em **Save** (Salvar).
7. Em poucos minutos, seu app estará no ar na URL segura: `https://rpgdog-create.github.io/elementais/`.

---

## 📱 Como Gerar o APK pelo PWABuilder (Instalação no Celular)

Uma vez que seu aplicativo esteja publicado e acessível pela URL do GitHub Pages, siga os passos abaixo para gerar o arquivo de instalação `.apk`:

1. Acesse o site oficial do [PWABuilder](https://www.pwabuilder.com/).
2. Cole a URL pública do seu aplicativo (`https://rpgdog-create.github.io/elementais/`) no campo de texto e clique em **Start**.
3. O PWABuilder irá analisar o site. Como as configurações de manifesto (`manifest.json`), ícones de alta qualidade (192px e 512px) e Service Worker já estão perfeitas e otimizadas no código, seu app receberá uma pontuação excelente!
4. Clique no botão **Package for Stores** (ou **Generate APK**).
5. Selecione a opção **Android** e clique em **Generate Package**.
6. Uma janela com opções de configuração do Android abrirá (você pode manter os valores padrão ou personalizar o nome do pacote). Como você vai usar apenas no seu telefone e não vai subir na Google Store, não se preocupe com chaves de assinatura complexas.
7. Baixe o arquivo `.zip` gerado e extraia-o. Dentro dele, você encontrará o arquivo `.apk` de instalação (geralmente com o nome terminado em `-release.apk` ou `-debug.apk`).

---

## 📲 Instalando o APK no seu Telefone Android

Como você está instalando o aplicativo diretamente e não através da Play Store, seu celular pedirá permissão para instalar aplicativos de fontes desconhecidas:

1. Transfira o arquivo `.apk` para o seu celular (pode enviar por cabo, pelo WhatsApp Web, Google Drive ou Telegram para você mesmo).
2. Toque no arquivo `.apk` no seu celular para abri-lo.
3. O sistema Android exibirá um aviso de segurança sobre "Fontes Desconhecidas".
4. Clique em **Configurações** no aviso e ative a opção **Permitir desta fonte** (ou autorize seu navegador/gerenciador de arquivos a instalar APKs).
5. Volte e clique em **Instalar**.
6. Pronto! O **Elementais RPG** estará instalado no seu celular, com um ícone personalizado de alta definição na tela inicial e rodando em tela cheia de forma ultra-fluida.
