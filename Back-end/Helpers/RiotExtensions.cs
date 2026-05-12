namespace CadeODano.Helpers;

public static class RiotExtensions
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

    public static string ToQueueName(this string queueType)
    {
        return queueType switch
        {
            "RANKED_SOLO_5x5" => "Ranqueada Solo/Duo",
            "RANKED_FLEX_SR" => "Ranqueada Flex",
            _ => queueType
        };
    }

    public static string ToTierName(this string tier)
    {
        return tier switch
        {
            "IRON" => "Ferro",
            "BRONZE" => "Bronze",
            "SILVER" => "Prata",
            "GOLD" => "Ouro",
            "PLATINUM" => "Platina",
            "EMERALD" => "Esmeralda",
            "DIAMOND" => "Diamante",
            "MASTER" => "Mestre",
            "GRANDMASTER" => "Grão-Mestre",
            "CHALLENGER" => "Desafiante",
            _ => tier
        };
    }
}