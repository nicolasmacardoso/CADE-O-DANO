using System.CodeDom.Compiler;
using CadeODano;
using CadeODano.DTOs;
using Microsoft.AspNetCore.Mvc;

[ApiController]
public class StatsController : Controller
{
  private readonly IRiotApiService _riotApiService;

  public StatsController (IRiotApiService riotApiService)
  {
    _riotApiService = riotApiService;
  }

  [HttpGet("/search/{Nickname}/{Hashtag}")]
  public async Task<IActionResult> SearchByNickname([FromRoute] PlayerSearchRequestDto playerRequest)
  {
    var result = await _riotApiService.GetPlayerStats(playerRequest);

    if (!result.Result)
      return BadRequest(result);

    return Ok(result);
  }
}