# Detalhes da partida

## Endpoint

```http
GET /match/{matchId}?puuid={puuid}
```

## Descrição

Busca os detalhes de uma partida específica e retorna informações agregadas da partida, times, bans, participantes, itens, runas e elos dos jogadores.

No front-end, este endpoint é consumido pela função `buscarMatch` em `Front-end/src/services/api/riotApi.ts`.

## Parâmetros

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| matchId | string | Sim | Identificador da partida usado na rota. |
| puuid | string | Sim | PUUID do jogador pesquisado. Usado para marcar o participante principal da tela. |

## Exemplo de request

```http
GET /match/BR1_3241247142?puuid=player-puuid
```

## Exemplo de response

### Sucesso

```json
{
  "result": true,
  "message": null,
  "data": {
    "matchId": "BR1_3241247142",
    "queueType": "Ranqueada Flex",
    "gameStartDate": "14/05/2026 23:21",
    "gameDuration": "34min 54s",
    "totalKills": 109,
    "playerWin": false,
    "teams": [
      {
        "teamId": 100,
        "totalTeamKills": 69,
        "totalTeamDeaths": 40,
        "totalTeamAssists": 144,
        "bans": [
          {
            "championName": "Syndra",
            "championIconUrl": "https://ddragon.leagueoflegends.com/cdn/16.9.1/img/champion/Syndra.png"
          },
          {
            "championName": null,
            "championIconUrl": "https://ddragon.leagueoflegends.com/cdn/16.9.1/img/champion/.png"
          }
        ],
        "participants": [
          {
            "summonerName": "floquinho",
            "summonerHashtag": "0506",
            "championName": "Rumble",
            "championIconUrl": "https://ddragon.leagueoflegends.com/cdn/16.9.1/img/champion/Rumble.png",
            "championSplashArtUrl": "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rumble_0.jpg",
            "kills": 14,
            "deaths": 7,
            "assists": 22,
            "kda": 5.14,
            "killParticipation": "52,17%",
            "cs": 148,
            "csPerMinute": 4.24,
            "runes": {
              "primaryTree": {
                "name": "Feitiçaria",
                "iconUrl": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"
              },
              "secondaryTree": {
                "name": "Determinação",
                "iconUrl": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png"
              },
              "primaryPerkRunes": [
                {
                  "name": "Toque Ígneo",
                  "shortDescription": "Causar dano a um Campeão com uma habilidade o queima ao longo do tempo.",
                  "iconUrl": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/DeathfireTouch/DEATHFIRE_TOUCH_KEYSTONE.png"
                }
              ],
              "secondaryPerkRunes": [
                {
                  "name": "Osso Revestido",
                  "shortDescription": "Após sofrer dano de um Campeão inimigo, reduz parte do dano recebido.",
                  "iconUrl": "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/BonePlating/BonePlating.png"
                }
              ]
            },
            "itemIconUrls": [
              "https://ddragon.leagueoflegends.com/cdn/16.9.1/img/item/6653.png",
              "https://ddragon.leagueoflegends.com/cdn/16.9.1/img/item/3157.png",
              null,
              "https://ddragon.leagueoflegends.com/cdn/16.9.1/img/item/3340.png"
            ],
            "totalDamage": 55620,
            "champLevel": 19,
            "win": true,
            "summonerElos": [
              {
                "queueType": "Ranqueada Flex",
                "leagueIconUrl": "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-platinum.png",
                "tier": "Platina",
                "rank": "I",
                "leaguePoints": 65,
                "wins": 89,
                "losses": 79,
                "winRate": null
              }
            ],
            "isSearchedPlayer": false,
            "teamId": 100,
            "subTeamId": 0
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
  "message": "Failed to get match data for BR1_3241247142",
  "data": null
}
```

## Estrutura da resposta

### Envelope

| Campo | Tipo | Nullable | Descrição |
|-------|------|----------|-----------|
| result | boolean | Não | Indica sucesso ou falha da operação. |
| message | string | Sim | Mensagem de erro quando `result` é `false`. |
| data | MatchDetailsDto | Sim | Dados da partida em caso de sucesso. |

### MatchDetailsDto

| Campo | Tipo | Nullable | Descrição |
|-------|------|----------|-----------|
| matchId | string | Não | Identificador da partida. |
| queueType | string | Não | Descrição da fila calculada pelo back-end. |
| gameStartDate | string | Não | Data/hora formatada a partir do timestamp da Riot API. |
| gameDuration | string | Não | Duração formatada da partida. |
| totalKills | number | Não | Soma dos abates de todos os participantes. |
| playerWin | boolean | Não | Indica se o participante do `puuid` informado venceu. |
| teams | TeamDto[] | Não | Times ou grupos da partida. |

### TeamDto

| Campo | Tipo | Nullable | Descrição |
|-------|------|----------|-----------|
| teamId | number | Não | Id do time. Em Arena, recebe o `subTeamId`. |
| totalTeamKills | number | Não | Soma dos abates dos participantes do grupo. |
| totalTeamDeaths | number | Não | Soma das mortes dos participantes do grupo. |
| totalTeamAssists | number | Não | Soma das assistências dos participantes do grupo. |
| bans | BanDto[] | Não | Campeões banidos pelo time. Em Arena retorna lista vazia. |
| participants | ParticipantDto[] | Não | Participantes do time ou grupo. |

### BanDto

| Campo | Tipo | Nullable | Descrição |
|-------|------|----------|-----------|
| championName | string | Sim | Nome do campeão banido. Pode ser `null` quando a Riot retorna champion id sem mapeamento válido. |
| championIconUrl | string | Sim | URL do ícone do campeão banido. |

### ParticipantDto

| Campo | Tipo | Nullable | Descrição |
|-------|------|----------|-----------|
| summonerName | string | Sim | Nome do jogador retornado pela Riot API. |
| summonerHashtag | string | Sim | Tag do jogador retornada pela Riot API. |
| championName | string | Sim | Nome do campeão usado pelo participante. |
| championIconUrl | string | Sim | URL do ícone do campeão. |
| championSplashArtUrl | string | Sim | URL da splash art do campeão. |
| kills | number | Não | Abates do participante. |
| deaths | number | Não | Mortes do participante. |
| assists | number | Não | Assistências do participante. |
| kda | number | Não | KDA calculado pelo back-end. |
| killParticipation | string | Não | Participação em abates formatada. |
| cs | number | Não | Soma de tropas e monstros abatidos. |
| csPerMinute | number | Não | CS por minuto calculado pelo back-end. |
| runes | ParticipantRunesDto | Sim | Runas do participante. No fluxo atual, pode ficar `null` em partidas de Arena. |
| itemIconUrls | string[] | Não | URLs dos itens. Pode conter posições `null` quando o slot de item está vazio. |
| totalDamage | number | Não | Dano total causado a campeões. |
| champLevel | number | Não | Nível do campeão ao fim da partida. |
| win | boolean | Não | Indica se o participante venceu. |
| summonerElos | SummonerEloDto[] | Sim | Elos do participante. Pode retornar lista vazia. |
| isSearchedPlayer | boolean | Não | Marca o participante cujo `puuid` é igual ao parâmetro de query. |
| teamId | number | Não | Id do time retornado pela Riot API. |
| subTeamId | number | Não | Id do subtime retornado pela Riot API, usado principalmente em Arena. |

## Regras de negócio / observações

- A resposta é envelopada por `ServiceResult<MatchDetailsDto>`.
- Em caso de sucesso, `result` retorna `true`, `data` contém o DTO e `message` tende a ser `null`.
- Em caso de erro, o controller retorna `400 Bad Request` com `result: false`, `message` preenchida e `data: null`.
- O back-end usa cache em memória por `matchId` por 30 minutos ao buscar a partida na Riot API.
- `playerWin` é calculado a partir do participante cujo `puuid` é igual ao parâmetro de query.
- `isSearchedPlayer` marca o participante cujo `puuid` é igual ao parâmetro de query.
- Se nenhum participante tiver o `puuid` informado, `playerWin` retorna `false` e nenhum participante é marcado como pesquisado.
- Para partidas comuns, `teams` é agrupado por `teamId`.
- Para Arena (`queueId` igual a `1750`), `teams` é agrupado por `subTeamId`, e o campo `teamId` do `TeamDto` recebe esse valor.
- Em Arena, o fluxo atual não preenche `runes`, porque o serviço só monta runas quando a fila não é Arena.
- Em partidas comuns, `bans` vem de `matchData.Info.Teams`.
- Em Arena, `bans` retorna lista vazia porque o builder não associa bans quando a fila é Arena.
- `totalTeamKills`, `totalTeamDeaths` e `totalTeamAssists` são calculados a partir dos participantes agrupados.
- `summonerElos` é buscado individualmente para cada participante e pode ser lista vazia.
- `winRate` aparece como nullable na resposta real, apesar do DTO estar declarado como `string`.
- `itemIconUrls` pode conter `null` quando algum slot de item está vazio.
- `championName` em `BanDto` pode retornar `null`; nesse caso, a URL do ícone pode vir sem o nome do campeão no caminho.
- `queueType` é convertido a partir do `queueId`; ids não mapeados retornam `"Modo Desconhecido"`.
- > TODO: validar comportamento real quando `puuid` é omitido ou enviado vazio.
