# CADE O DANO

Aplicacao full-stack para consultar historico de partidas de League of Legends usando a Riot API.

O front-end permite buscar um jogador pelo Riot ID, listar partidas recentes e abrir os detalhes de uma partida. O back-end centraliza o consumo da Riot API, calcula estatisticas do jogador e entrega os dados ja tratados para a interface.

## Funcionalidades

- Busca de jogador por `nickname` e `tag`.
- Consulta das ultimas partidas do jogador.
- Exibicao de resumo das partidas recentes.
- Detalhamento de uma partida especifica.
- Destaque do jogador pesquisado dentro da partida.
- Calculo de campeoes mais jogados e campeoes com maior dano.
- Cache em memoria para detalhes de partidas ja consultadas.

## Stack

### Front-end

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- ESLint

### Back-end

- .NET 8
- ASP.NET Core Web API
- HttpClient
- AutoMapper
- Swagger
- MemoryCache
- Riot Games API

## Estrutura do projeto

```text
CADE-O-DANO/
|-- Back-end/
|   |-- Builders/
|   |-- Controllers/
|   |-- DTOs/
|   |-- Helpers/
|   |-- Interfaces/
|   |-- Mappings/
|   |-- Models/
|   |-- Services/
|   `-- Program.cs
|-- Front-end/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- hooks/
|   |   |-- services/
|   |   `-- types/
|   `-- package.json
`-- .github/
    `-- workflows/
```

## Pre-requisitos

- Node.js 22 ou superior
- npm
- .NET SDK 8
- Chave de desenvolvedor da Riot Games

## Configuracao do back-end

O back-end le a chave da Riot API pela configuracao:

```json
{
  "RiotApi": {
    "Key": "SUA_CHAVE_DA_RIOT_API"
  }
}
```

Para desenvolvimento local, voce pode informar essa chave em `Back-end/appsettings.Development.json` ou por variavel de ambiente:

```powershell
$env:RiotApi__Key="SUA_CHAVE_DA_RIOT_API"
```

## Como rodar o back-end

Entre na pasta do back-end:

```powershell
cd Back-end
```

Restaure os pacotes:

```powershell
dotnet restore
```

Execute a API:

```powershell
dotnet run
```

Em ambiente de desenvolvimento, o Swagger fica disponivel no endereco informado pelo terminal, geralmente em:

```text
https://localhost:5001/swagger
```

## Como rodar o front-end

Entre na pasta do front-end:

```powershell
cd Front-end
```

Instale as dependencias:

```powershell
npm install
```

Execute o projeto:

```powershell
npm run dev
```

O Vite vai informar a URL local da aplicacao, geralmente:

```text
http://localhost:5173
```

## Configuracao da URL da API no front-end

A URL base usada pelo front-end fica em:

```text
Front-end/src/services/api_url.ts
```

Por padrao, ela aponta para a API publicada:

```ts
export const api_base_URL = "https://cadeodanobackend.livelywater-5b3a910a.eastus.azurecontainerapps.io/";
```

Para usar o back-end local, altere temporariamente para a URL exibida pelo `dotnet run`, por exemplo:

```ts
export const api_base_URL = "https://localhost:5001/";
```

## Scripts do front-end

```powershell
npm run dev
```

Sobe o servidor de desenvolvimento com Vite.

```powershell
npm run build
```

Gera a build de producao.

```powershell
npm run lint
```

Executa a analise do ESLint.

```powershell
npm run preview
```

Executa localmente a build gerada pelo Vite.

## Endpoints principais

### Buscar historico do jogador

```http
GET /search/{Nickname}/{Hashtag}?count=5
```

Exemplo:

```http
GET /search/Faker/KR1?count=5
```

Retorna o PUUID do jogador, partidas recentes e estatisticas calculadas.

### Buscar detalhes da partida

```http
GET /match/{matchId}?puuid={puuid}
```

Retorna os detalhes da partida, separando os participantes por time e marcando o jogador pesquisado.

## Fluxo da aplicacao

1. O usuario informa `nickname`, `tag` e quantidade de partidas.
2. O front-end chama o endpoint `/search/{Nickname}/{Hashtag}`.
3. O back-end busca o PUUID na Riot API.
4. O back-end busca os IDs das partidas recentes.
5. O back-end consulta os dados das partidas e calcula estatisticas.
6. O front-end lista o historico.
7. Ao selecionar uma partida, o front-end chama `/match/{matchId}` para exibir os detalhes.

## Deploy

O projeto possui workflow de deploy do front-end para GitHub Pages em:

```text
.github/workflows/deploy.yml
```

O deploy roda automaticamente em push para a branch `main`, instalando dependencias dentro de `Front-end`, executando `npm run build` e publicando a pasta `Front-end/dist`.

O `vite.config.ts` ja esta configurado com:

```ts
base: "/CADE-O-DANO/"
```

Essa configuracao e necessaria para servir corretamente a aplicacao no GitHub Pages.

## Observacoes importantes

- A chave da Riot API nao deve ser exposta no front-end.
- A API da Riot possui limite de requisicoes; evitar buscas muito grandes em ambiente de desenvolvimento.
- O back-end usa cache em memoria para detalhes de partidas por 30 minutos.
- Para trocar entre API local e API publicada, ajuste `Front-end/src/services/api_url.ts`.
