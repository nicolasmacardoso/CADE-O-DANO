namespace CadeODano.Helpers;

public static class QueueHelper
{
    public static string GetQueueDescription(int queueId)
    {
        return queueId switch
        {
            420 => "Ranqueada Solo/Duo",
            440 => "Ranqueada Flex",
            400 => "Normal Draft",
            430 => "Normal Blind",
            450 => "ARAM",
            700 => "Clash",
            1700 => "Arena",
            _ => "Modo Desconhecido"
        };
    }
}