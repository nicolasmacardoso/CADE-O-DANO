# Detalhes da partida

## Endpoint

```http
GET /match/{matchId}?puuid={puuid}
```

## Descrição

Busca os detalhes de uma partida específica e retorna informações agregadas da partida, times, participantes, itens, runas e elos dos jogadores.

No front-end, este endpoint é consumido pela função `buscarMatch` em `Front-end/src/services/api/riotApi.ts`.

## Parâmetros

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| matchId | string | Sim | Identificador da partida usado na rota. |
| puuid | string | Sim | PUUID do jogador pesquisado. Usado para marcar o participante principal da tela. |

## Exemplo de request

```http
GET /match/BR1_1234567890?puuid=player-puuid
```

## Exemplo de response

### Sucesso

```json
{
  "result": true,
  "message": null,
  "data": {
    "matchId": "BR1_1234567890",
    "queueType": "Ranqueada Solo/Duo",
    "gameStartDate": "01/01/2026 12:00",
    "gameDuration": "35m 20s",
    "totalKills": 50,
    "playerWin": true,
    "teams": [
      {
        "teamId": 100,
        "totalTeamKills": 30,
        "teamKDA": 3.5,
        "participants": [
          {
            "summonerName": "Faker",
            "summonerHashtag": "BR1",
            "championName": "Aatrox",
            "championIconUrl": "https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/Aatrox.png",
            "championSplashArtUrl": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg",
            "kills": 10,
            "deaths": 2,
            "assists": 8,
            "kda": 9,
            "killParticipation": "60.00%",
            "cs": 210,
            "csPerMinute": 6.1,
            "runes": {
              "primaryTree": {
                "name": "Precisão",
                "iconUrl": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png"
              },
              "secondaryTree": {
                "name": "Determinação",
                "iconUrl": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png"
              },
              "primaryPerkRunes": [
                {
                  "name": "Conquistador",
                  "shortDescription": "Descrição curta da runa.",
                  "iconUrl": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png"
                }
              ],
              "secondaryPerkRunes": [
                {
                  "name": "Osso Revestido",
                  "shortDescription": "Descrição curta da runa.",
                  "iconUrl": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/BonePlating/BonePlating.png"
                }
              ]
            },
            "itemIconUrls": [
              "https://ddragon.leagueoflegends.com/cdn/{version}/img/item/3078.png"
            ],
            "totalDamage": 25000,
            "champLevel": 16,
            "win": true,
            "summonerElos": [
              {
                "queueType": "Ranqueada Solo/Duo",
                "leagueIconUrl": "/ranked-emblems/Emblem_Challenger.png",
                "tier": "Desafiante",
                "rank": "I",
                "leaguePoints": 100,
                "wins": 10,
                "losses": 5,
                "winRate": "66.67%"
              }
            ],
            "isSearchedPlayer": true,
            "teamId": 100
          }
        ]
      }
    ]
  }
}
```

### Erro

```json
{
  "result": false,
  "message": "Failed to get match data for BR1_1234567890",
  "data": null
}
```

## Regras de negócio / observações

- A resposta é envelopada por `ServiceResult<MatchDetailsDto>`.
- Em caso de sucesso, `result` retorna `true`, `data` contém o DTO e `message` tende a ser `null`.
- Em caso de erro, o controller retorna `400 Bad Request` com `result: false`, `message` preenchida e `data: null`.
- O back-end usa cache em memória por `matchId` por 30 minutos ao buscar a partida na Riot API.
- `playerWin` é calculado a partir do participante cujo `puuid` é igual ao parâmetro de query.
- `isSearchedPlayer` marca o participante cujo `puuid` é igual ao parâmetro de query.
- Se nenhum participante tiver o `puuid` informado, `playerWin` retorna `false` e nenhum participante é marcado como pesquisado.
- `teams` é agrupado por `teamId` a partir dos participantes retornados pela Riot API.
- `summonerElos` é buscado individualmente para cada participante e pode ser lista vazia.
- `summonerElos` é nullable no DTO, mas o fluxo atual atribui uma lista retornada pelo serviço.
- `runes`, `primaryTree` e `secondaryTree` são marcados como não-null no DTO, mas dependem dos dados de perks da Riot API e do Data Dragon.
- Campos nullable em `ParticipantDto` podem retornar `null`, principalmente `summonerName`, `summonerHashtag`, `championName`, URLs de campeão e dados vindos da Riot.
- `queueType` é convertido a partir do `queueId`; ids não mapeados retornam `"Modo Desconhecido"`.
- > TODO: validar comportamento real quando `puuid` é omitido ou enviado vazio.
