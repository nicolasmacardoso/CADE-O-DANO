# Visão geral da arquitetura

## Stack utilizada

O projeto é dividido em duas aplicações principais:

| Camada | Tecnologia | Observações |
|--------|------------|-------------|
| Front-end | React, TypeScript, Vite, Tailwind CSS | Aplicação web consumindo a API própria do projeto. |
| Back-end | ASP.NET Core 8, Controllers, HttpClient, AutoMapper, MemoryCache, Swagger | API responsável por buscar dados na Riot API e entregar DTOs prontos para o front-end. |
| API externa | Riot API e Data Dragon | Fonte dos dados de jogador, partidas, elos, campeões, itens e runas. |

## Hospedagem

O front-end está configurado para publicação no GitHub Pages.

Evidências no projeto:

- `Front-end/vite.config.ts` usa `base: '/CADE-O-DANO/'`.
- `.github/workflows/deploy.yml` publica o build do front-end.

O back-end é consumido por uma URL hospedada no Azure Container Apps.

Evidência no projeto:

- `Front-end/src/services/api/riotApi.ts` usa como fallback a URL `https://cadeodanobackend.livelywater-5b3a910a.eastus.azurecontainerapps.io/`.

## Fluxo geral

```text
Usuário
  -> Front-end React hospedado no GitHub Pages
  -> Back-end ASP.NET Core hospedado no Azure Container Apps
  -> Riot API
  -> Data Dragon
  -> Back-end monta DTOs
  -> Front-end renderiza histórico, ranked e detalhes da partida
```

## Responsabilidades

### Front-end

- Coletar Riot ID do jogador.
- Montar chamadas para a API do projeto.
- Renderizar dashboard, histórico, ranked e detalhes de partida.
- Usar `VITE_API_BASE_URL` quando configurado.
- Usar a URL hospedada do back-end como fallback.

### Back-end

- Manter a chave da Riot API fora do front-end.
- Receber chamadas do front-end.
- Buscar dados na Riot API.
- Buscar dados estáticos no Data Dragon.
- Calcular estatísticas derivadas, como KDA, CS, CSPM, participação em abates e win rate.
- Retornar contratos em DTOs próprios do projeto.

## Contratos principais

| Recurso | Documento |
|---------|-----------|
| Histórico de partidas | [../api/history.md](../api/history.md) |
| Detalhes da partida | [../api/match-details.md](../api/match-details.md) |
| Ranked | [../api/ranked.md](../api/ranked.md) |

## Observações técnicas

- O back-end registra controllers com `app.MapControllers()`.
- O CORS atual permite qualquer origem, header e método pela política `FrontendPolicy`.
- O `HttpClient` usado para a Riot API envia a chave pelo header `X-Riot-Token`.
- O timeout configurado para chamadas HTTP da Riot API é de 120 segundos.
- Swagger é habilitado apenas em ambiente de desenvolvimento.
- A API envelopa respostas usando `ServiceResult<T>`, com os campos `result`, `message` e `data` no JSON final.
