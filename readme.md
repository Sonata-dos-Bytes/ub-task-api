# 📒 UB Task API

UB Task API é uma API leve em **Node.js + TypeScript + Express** para acessar tarefas e perfis na plataforma UB Virtual, automatizando a busca de atividades acadêmicas direto do site da faculdade.

## 📚 Tabela de Conteúdos
- [📖 Visão Geral](#-visão-geral)
- [🛠 Tecnologias](#-tecnologias)
- [⚙️ Configuração](#️-configuração)
  - [📋 Pré-requisitos](#-pré-requisitos)
  - [⬇️ Instalação](#️-instalação)
  - [🎬 Tutorial de Execução](#-tutorial-de-execução)
- [🔍 Endpoints](#-endpoints)
- [📒 Sobre](#-sobre)

## 📖 Visão Geral

Esta API permite:

- Buscar informações de **perfil** do usuário (nome, e-mails, avatar).
- Listar **tarefas** pendentes com detalhes como matéria, título, prazos e links.
- Explorar todos os endpoints de forma simples.

Ideal para integrar rotinas acadêmicas e aplicações que precisam de dados atualizados da UB Virtual.

## 🛠 Tecnologias

- **Node.js** & **TypeScript**
- **Express**: servidor e roteamento
- **Docker** & **Docker Compose**: containerização
- **ESLint** + **Prettier**: lint e formatação

## ⚙️ Configuração

### 📋 Pré-requisitos

- Node.js >= 14.x
- npm ou yarn
- (Opcional) Docker & Docker Compose

### ⬇️ Instalação

1. Clone o repositório e navegue até a pasta:
   ```bash
   git clone https://github.com/Sonata-dos-Bytes/ub-task-api.git
   cd ub-task-api
   ```
2. Copie o arquivo de ambiente e ajuste variáveis em `.env`:
   ```bash
   cp .env.example .env
   # defina PORT, URL da UB e outras chaves
   ```
3. Instale dependências:
   ```bash
   npm install
   # ou yarn
   ```

### 🎬 Tutorial de Execução

Siga este passo a passo para rodar o projeto em diferentes modos:

1. **Desenvolvimento (Hot Reload)**
   ```bash
   npm run dev
   ```
   - Acesse: `http://localhost:3000`
   - A cada alteração no código, o servidor recarrega automaticamente.

2. **Produção (Modo Cluster)**
   ```bash
   npm run build      # transpila TS para JS
   npm start          # inicia o servidor em production
   ```
   - Ideal para deploy em servidores.

3. **Via Docker**
   ```bash
   docker-compose up --build
   ```
   - Expõe a porta definida em `.env` no container.

4. **Testar API**
   - Faça requisições com `curl`, Postman ou diretamente no navegador.

## 🔍 Endpoints

<details>
<summary><strong>GET /</strong></summary>

Retorna status, mensagem de boas-vindas e dados de contato.

```json
{
  "status": true,
  "message": "Welcome to the UB API!",
  "data": { /* contato e versão */ }
}
```
</details>

<details>
<summary><strong>POST /ub/ead-ub/profile</strong></summary>

- **Body**: `{ "login": "<usuário>", "password": "<senha>" }`
- **200**: dados do perfil
- **400**: validação
- **401**: credenciais inválidas
- **500**: erro interno

```json
{
  "status": true,
  "data": { /* perfil */ }
}
```
</details>

<details>
<summary><strong>POST /ub/ead-ub/tasks</strong></summary>

- **Body**: `{ "login": "<usuário>", "password": "<senha>" }`
- **200**: lista de tarefas
- **500**: erro interno

```json
{
  "status": true,
  "data": [ /* tarefas */ ]
}
```
</details>

## 📒 Sobre

Desenvolvido por Pedro Henrique Martins.  
Contato: pedro.henrique.martins404@gmail.com  
Repositório: https://github.com/Sonata-dos-Bytes/ub-task-api  

_License: MIT_

