using System.Text.RegularExpressions;

namespace CadeODano.Helpers;

public static class FormatHelper
{
  public static string FormatUnixMilliseconds(long unixMilliseconds)
  {
    var utcDate = DateTimeOffset
        .FromUnixTimeMilliseconds(unixMilliseconds)
        .UtcDateTime;

    var brazilTimeZone = TimeZoneInfo.FindSystemTimeZoneById(
        OperatingSystem.IsWindows()
            ? "E. South America Standard Time"
            : "America/Sao_Paulo");

    var brazilDate = TimeZoneInfo.ConvertTimeFromUtc(
        utcDate,
        brazilTimeZone);

    return brazilDate.ToString("dd/MM/yyyy HH:mm");
  }

  public static string FormatGameDuration(int durationInSeconds)
  {
    var minutes = durationInSeconds / 60;
    var seconds = durationInSeconds % 60;

    return $"{minutes:D2}min {seconds:D2}s";
  }

  public static string CleanRuneDescription(string text)
  {
    if (string.IsNullOrWhiteSpace(text))
      return string.Empty;

    return Regex.Replace(text, "<.*?>", string.Empty);
  }
}