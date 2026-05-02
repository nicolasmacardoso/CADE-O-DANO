namespace CadeODano.Helpers;

public static class FormatHelper
{
  public static string FormatUnixMilliseconds(long unixTime)
  {
    return DateTimeOffset
        .FromUnixTimeMilliseconds(unixTime)
        .ToLocalTime()
        .ToString("dd/MM/yyyy HH:mm");
  }

  public static string FormatGameDuration(int durationInSeconds)
  {
    var minutes = durationInSeconds / 60;
    var seconds = durationInSeconds % 60;

    return $"{minutes:D2}min {seconds:D2}s";
  }
}