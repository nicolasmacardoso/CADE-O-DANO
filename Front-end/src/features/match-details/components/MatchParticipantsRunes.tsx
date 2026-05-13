import type { Runes } from "../../../types/matchDetail";

type Props = {
    runes: Runes;
}

function getPerkDescription(perk: { shortDescription?: string; shortDesc?: string }) {
    return perk.shortDescription ?? perk.shortDesc ?? "";
}

function getRuneTreeVariant(treeName?: string) {
    const normalizedTreeName = treeName
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    if (normalizedTreeName === "dominacao") return "domination";
    if (normalizedTreeName === "inspiracao") return "inspiration";
    if (normalizedTreeName === "determinacao") return "resolve";
    if (normalizedTreeName === "feiticaria") return "sorcery";
    if (normalizedTreeName === "precisao") return "precision";

    return "default";
}

function MatchParticipantsRunes ({ runes }: Props) {
    const primaryTree = runes.primaryTree ?? runes.primaryStyle;
    const secondaryTree = runes.secondaryTree ?? runes.secondaryStyle;
    const primaryPerkRunes = runes.primaryPerkRunes?.length
        ? runes.primaryPerkRunes
        : runes.keystone
            ? [runes.keystone]
            : [];
    const secondaryPerkRunes = runes.secondaryPerkRunes ?? [];
    const [keystoneRune, ...primaryRunes] = primaryPerkRunes;
    const primaryVariant = getRuneTreeVariant(primaryTree?.name);
    const secondaryVariant = getRuneTreeVariant(secondaryTree?.name);

    return (
        <section className="participant-runes">
            <div className={`participant-runes__tree participant-runes__tree--primary participant-runes__tree--${primaryVariant}`}>
                <header className="participant-runes__tree-header">
                    <span className="participant-runes__tree-icon">
                        {primaryTree?.iconUrl && <img src={primaryTree.iconUrl} alt="" />}
                    </span>

                    <p>{primaryTree?.name ?? "Arvore principal"}</p>
                </header>

                {keystoneRune && (
                    <article className="participant-runes__keystone">
                        <span className="participant-runes__keystone-icon">
                            <img src={keystoneRune.iconUrl} alt="" />
                        </span>

                        <div className="participant-runes__perk-text">
                            <strong>{keystoneRune.name}</strong>
                            <p>{getPerkDescription(keystoneRune)}</p>
                        </div>
                    </article>
                )}

                <div className="participant-runes__perk-list">
                    {primaryRunes.map((perk) => (
                        <article className="participant-runes__perk" key={perk.name}>
                            <span className="participant-runes__perk-icon">
                                <img src={perk.iconUrl} alt="" />
                            </span>

                            <div className="participant-runes__perk-text">
                                <strong>{perk.name}</strong>
                                <p>{getPerkDescription(perk)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className={`participant-runes__tree participant-runes__tree--secondary participant-runes__tree--${secondaryVariant}`}>
                <header className="participant-runes__tree-header">
                    <span className="participant-runes__tree-icon">
                        {secondaryTree?.iconUrl && <img src={secondaryTree.iconUrl} alt="" />}
                    </span>

                    <p>{secondaryTree?.name ?? "Arvore secundaria"}</p>
                </header>

                <div className="participant-runes__perk-list">
                    {secondaryPerkRunes.map((perk) => (
                        <article className="participant-runes__perk" key={perk.name}>
                            <span className="participant-runes__perk-icon">
                                <img src={perk.iconUrl} alt="" />
                            </span>

                            <div className="participant-runes__perk-text">
                                <strong>{perk.name}</strong>
                                <p>{getPerkDescription(perk)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MatchParticipantsRunes;
