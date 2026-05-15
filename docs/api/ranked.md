# Ranked

## Endpoint

Não existe endpoint HTTP separado para ranked no back-end atual.

Os dados ranqueados são retornados dentro do endpoint:

```http
GET /search/{Nickname}/{Hashtag}?count={count}
```

## Descrição

Documenta o contrato atual do bloco `rankedStats.elos`, retornado junto com o histórico de partidas.

Este arquivo existe para deixar claro para front-end e back-end que ranked hoje é parte da resposta de busca do jogador, não uma rota independente.

## Parâmetros

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| Nickname | string | Sim | Nome do jogador usado na rota de busca. |
| Hashtag | string | Sim | Tag do jogador usada na rota de busca, sem `#`. |
| count | string | Sim | Quantidade de partidas solicitada no endpoint de busca. Não altera diretamente o bloco de ranked. |

## Exemplo de request

```http
GET /search/Faker/BR1?count=100
```

## Exemplo de response

```json
{
  "result": true,
  "message": null,
  "data": {
    "rankedStats": {
      "elos": [
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
      ]
    }
  }
}
```

## Regras de negócio / observações

- O tipo real usado é `PlayerRankedStatsDto`, contendo `List<SummonerEloDto> Elos`.
- `elos` pode retornar lista vazia quando a Riot API retornar uma lista vazia.
- Se a Riot API retornar erro ao buscar elo, o endpoint de busca falha e responde `400 Bad Request`.
- `queueType` é traduzido quando recebe valores conhecidos como `RANKED_SOLO_5x5` e `RANKED_FLEX_SR`.
- `tier` é traduzido para português quando recebe valores conhecidos como `IRON`, `BRONZE`, `SILVER`, `GOLD`, `PLATINUM`, `EMERALD`, `DIAMOND`, `MASTER`, `GRANDMASTER` e `CHALLENGER`.
- `queueType`, `leagueIconUrl`, `tier` e `rank` são nullable no DTO.
- `winRate` não é nullable no DTO, mas depende do cálculo do serviço.
- > TODO: validar comportamento real para jogadores sem partidas ranqueadas em diferentes regiões/filas.
