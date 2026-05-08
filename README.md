# CADE O DANO

Aplicacao full-stack para consultar historico e desempenho de jogadores de League of Legends usando a Riot API.

O front-end permite buscar um jogador pelo Riot ID, visualizar dados do perfil, elos ranqueados, campeoes mais jogados, campeoes com maior dano, historico de partidas e detalhes completos de uma partida selecionada. O back-end centraliza o consumo da Riot API, aplica regras de montagem dos DTOs, calcula estatisticas e entrega os dados prontos para a interface.

## Funcionalidades

- Busca de jogador por `nickname` e `tag`.
- Consulta automatica de ate 100 partidas recentes pelo front-end.
- Exibicao de dados do invocador, incluindo icone de perfil e nivel.
- Exibicao de elos ranqueados, LP, vitorias, derrotas e win rate.
- Listagem do historico de partidas.
- Indicacao visual de maior e menor dano dentro da lista de partidas.
- Detalhamento de uma partida especifica.
- Separacao dos participantes por time.
- Destaque do jogador pesquisado dentro da partida.
- Calculo de campeoes mais jogados.
- Calculo de campeoes com maior dano.
- Cache em memoria para detalhes de partidas ja consultadas.

## Stack

### Front-end

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- ESLint
- Variaveis de ambiente com `VITE_API_BASE_URL`

### Back-end

- .NET 8
- ASP.NET Core Web API
- HttpClient
- AutoMapper
- Swagger
- MemoryCache
- Docker
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
|   |-- Properties/
|   |-- Services/
|   |-- Dockerfile
|   `-- Program.cs
|-- Front-end/
|   |-- public/
|   |-- src/
|   |   |-- app/
|   |   |-- assets/
|   |   |-- features/
|   |   |   |-- history/
|   |   |   |-- login/
|   |   |   `-- match-details/
|   |   |-- hooks/
|   |   |-- services/
|   |   |   `-- api/
|   |   |-- shared/
|   |   `-- types/
|   |-- .env.example
|   `-- package.json
`-- .github/
    `-- workflows/
```

## Pre-requisitos

- Node.js `20.19.0` ou superior
- npm
- .NET SDK 8
- Chave de desenvolvedor da Riot Games
- Docker, opcional para executar o back-end em container

## Configuracao do back-end

O back-end le a chave da Riot API pela configuracao `RiotApi:Key`.

Exemplo em `Back-end/appsettings.Development.json`:

```json
{
  "RiotApi": {
    "Key": "SUA_CHAVE_DA_RIOT_API"
  }
}
```

Tambem e possivel informar a chave por variavel de ambiente:

```powershell
$env:RiotApi__Key="SUA_CHAVE_DA_RIOT_API"
```

Importante: a chave da Riot API deve ficar somente no back-end. Ela nunca deve ser exposta no front-end.

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

Pelo `launchSettings.json`, a API sobe em:

```text
https://localhost:7249
http://localhost:5249
```

Em ambiente de desenvolvimento, o Swagger fica disponivel em:

```text
https://localhost:7249/swagger
```

## Como rodar o back-end com Docker

Entre na pasta do back-end:

```powershell
cd Back-end
```

Gere a imagem:

```powershell
docker build -t cade-o-dano-api .
```

Execute o container informando a chave da Riot API:

```powershell
docker run -p 8080:8080 -e RiotApi__Key="SUA_CHAVE_DA_RIOT_API" cade-o-dano-api
```

## Configuracao do front-end

Entre na pasta do front-end:

```powershell
cd Front-end
```

Crie o arquivo `.env` com base no `.env.example`:

```powershell
copy .env.example .env
```

Para usar o back-end local, configure:

```env
VITE_API_BASE_URL=https://localhost:7249
```

Se `VITE_API_BASE_URL` nao for informado, o front-end usa como fallback a API publicada:

```text
https://cadeodanobackend.livelywater-5b3a910a.eastus.azurecontainerapps.io/
```

## Como rodar o front-end

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

### Buscar historico e estatisticas do jogador

```http
GET /search/{Nickname}/{Hashtag}?count=100
```

Exemplo:

```http
GET /search/Faker/KR1?count=100
```

Retorna dados do jogador, PUUID, icone de perfil, nivel, elos ranqueados, partidas recentes e estatisticas calculadas.

### Buscar detalhes da partida

```http
GET /match/{matchId}?puuid={puuid}
```

Retorna os detalhes da partida, separando os participantes por time e marcando o jogador pesquisado.

## Fluxo da aplicacao

1. O usuario informa `nickname` e `tag`.
2. O front-end chama `/search/{Nickname}/{Hashtag}?count=100`.
3. O back-end busca o PUUID pela Riot API.
4. O back-end busca dados do invocador, icone de perfil, nivel e elos ranqueados.
5. O back-end busca os IDs das partidas recentes.
6. O back-end consulta as partidas e calcula estatisticas.
7. O front-end exibe o sidebar do jogador e a lista de partidas.
8. Ao selecionar uma partida, o front-end chama `/match/{matchId}` para exibir os detalhes.

## Organizacao do front-end

O front-end esta dividido por responsabilidade:

- `src/app`: fluxo principal da aplicacao.
- `src/features/login`: tela de busca do jogador.
- `src/features/history`: historico e cards das partidas.
- `src/features/match-details`: detalhes da partida selecionada.
- `src/shared`: componentes reutilizaveis, como layout, botao de voltar e sidebar do jogador.
- `src/services/api`: client HTTP e tipos das respostas da API.
- `src/types`: tipos compartilhados de partidas, detalhes e jogador.

Essa organizacao facilita manutencao porque separa telas por dominio sem criar uma arquitetura exagerada para o tamanho atual do projeto.

## Deploy

O projeto possui workflow de deploy do front-end para GitHub Pages em:

```text
.github/workflows/deploy.yml
```

O deploy roda automaticamente em push para a branch `main`, instalando dependencias dentro de `Front-end`, executando `npm run build` e publicando a pasta `Front-end/dist`.

O workflow usa Node.js 22 no GitHub Actions.

O `vite.config.ts` esta configurado com:

```ts
base: "/CADE-O-DANO/"
```

Essa configuracao e necessaria para servir corretamente a aplicacao no GitHub Pages.

## Observacoes importantes

- A chave da Riot API deve ficar somente no back-end.
- O front-end usa `VITE_API_BASE_URL` para trocar entre API local e API publicada.
- A API da Riot possui limite de requisicoes; evitar buscas excessivas em desenvolvimento.
- O back-end usa cache em memoria para detalhes de partidas por 30 minutos.
- O front-end envia `nickname` e `tag` com `encodeURIComponent`, evitando erro com espacos e caracteres especiais no Riot ID.
