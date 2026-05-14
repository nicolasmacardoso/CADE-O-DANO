import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Runes } from "../../../types/matchDetail";
import dominationSplashArt from "../../../assets/domination-splash-art.png";
import inspirationSplashArt from "../../../assets/inspiration-splash-art.png";
import precisionSplashArt from "../../../assets/precision-splash-art.png";
import resolveSplashArt from "../../../assets/resolve-splash-art.png";
import sorcerySplashArt from "../../../assets/sorcery-splash-art.png";

type Props = {
    runes: Runes;
}

type PerkRune = NonNullable<Runes["primaryPerkRunes"]>[number];

type RuneTreeVariant = "default" | "domination" | "inspiration" | "precision" | "resolve" | "sorcery";

function getPerkDescription(perk: { shortDescription?: string; shortDesc?: string }) {
    return perk.shortDescription ?? perk.shortDesc ?? "";
}

function getRuneTreeVariant(treeName?: string): RuneTreeVariant {
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

const runeSplashArtByVariant: Record<RuneTreeVariant, string> = {
    default: precisionSplashArt,
    domination: dominationSplashArt,
    inspiration: inspirationSplashArt,
    precision: precisionSplashArt,
    resolve: resolveSplashArt,
    sorcery: sorcerySplashArt,
};

const runeGlowByVariant: Record<RuneTreeVariant, string> = {
    default: "rgba(216, 177, 95, 0.32)",
    domination: "rgba(255, 64, 80, 0.42)",
    inspiration: "rgba(40, 188, 212, 0.36)",
    precision: "rgba(216, 177, 95, 0.34)",
    resolve: "rgba(49, 185, 106, 0.34)",
    sorcery: "rgba(54, 104, 255, 0.38)",
};

const featuredRunePositionByVariant: Record<RuneTreeVariant, {
    imageX: number;
    imageY: number;
    size: string;
    opacity: string;
}> = {
    default: {
        imageX: 50,
        imageY: 48,
        size: "clamp(118px, 16vw, 210px)",
        opacity: "0.32",
    },
    domination: {
        imageX: 78.3,
        imageY: 61,
        size: "clamp(118px, 16vw, 210px)",
        opacity: "0.34",
    },
    inspiration: {
        imageX: 80,
        imageY: 47,
        size: "clamp(112px, 15vw, 190px)",
        opacity: "0.3",
    },
    precision: {
        imageX: 78.4,
        imageY: 39,
        size: "clamp(118px, 16vw, 210px)",
        opacity: "0.32",
    },
    resolve: {
        imageX: 76.6,
        imageY: 52,
        size: "clamp(116px, 15vw, 200px)",
        opacity: "0.3",
    },
    sorcery: {
        imageX: 78,
        imageY: 50,
        size: "clamp(112px, 15vw, 190px)",
        opacity: "0.3",
    },
};

function RuneIconWithTooltip({
    perk,
    className
}: {
    perk: PerkRune;
    className: string;
}) {
    const description = getPerkDescription(perk);

    return (
        <span className={className} tabIndex={0}>
            <img src={perk.iconUrl} alt="" />

            <span className="participant-runes__tooltip">
                <strong>{perk.name}</strong>
                {description && <span>{description}</span>}
            </span>
        </span>
    );
}

function MatchParticipantsRunes ({ runes }: Props) {
    const containerRef = useRef<HTMLElement | null>(null);
    const [featuredRunePositionStyle, setFeaturedRunePositionStyle] = useState<Pick<CSSProperties, "left" | "top">>({
        left: "50%",
        top: "48%",
    });

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
    const featuredRunePosition = featuredRunePositionByVariant[primaryVariant];
    const splashArtUrl = runeSplashArtByVariant[primaryVariant];
    const runesStyle = {
        "--participant-runes-bg": `url(${splashArtUrl})`,
        "--participant-runes-glow": runeGlowByVariant[primaryVariant],
        "--featured-rune-size": featuredRunePosition.size,
        "--featured-rune-opacity": featuredRunePosition.opacity,
    } as CSSProperties;

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const splashImage = new Image();
        let resizeObserver: ResizeObserver | null = null;

        function updateFeaturedRunePosition() {
            if (!container || !splashImage.naturalWidth || !splashImage.naturalHeight) return;

            const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
            const imageScale = Math.max(
                containerWidth / splashImage.naturalWidth,
                containerHeight / splashImage.naturalHeight,
            );
            const renderedImageWidth = splashImage.naturalWidth * imageScale;
            const renderedImageHeight = splashImage.naturalHeight * imageScale;
            const imageOffsetX = (containerWidth - renderedImageWidth) * 0.5;
            const imageOffsetY = (containerHeight - renderedImageHeight) * 0.42;

            setFeaturedRunePositionStyle({
                left: imageOffsetX + renderedImageWidth * (featuredRunePosition.imageX / 100),
                top: imageOffsetY + renderedImageHeight * (featuredRunePosition.imageY / 100),
            });
        }

        splashImage.onload = () => {
            updateFeaturedRunePosition();
            resizeObserver = new ResizeObserver(updateFeaturedRunePosition);
            resizeObserver.observe(container);
        };
        splashImage.src = splashArtUrl;

        return () => {
            resizeObserver?.disconnect();
            splashImage.onload = null;
        };
    }, [featuredRunePosition.imageX, featuredRunePosition.imageY, splashArtUrl]);

    return (
        <section className="participant-runes" ref={containerRef} style={runesStyle}>
            {keystoneRune && (
                <div className="participant-runes__featured-rune" style={featuredRunePositionStyle} aria-hidden="true">
                    <img src={keystoneRune.iconUrl} alt="" />
                </div>
            )}

            <div className={`participant-runes__tree participant-runes__tree--primary participant-runes__tree--${primaryVariant}`}>
                <header className="participant-runes__tree-header">
                    <span className="participant-runes__tree-icon">
                        {primaryTree?.iconUrl && <img src={primaryTree.iconUrl} alt="" />}
                    </span>

                    <p>{primaryTree?.name ?? "Arvore principal"}</p>
                </header>

                {keystoneRune && (
                    <article className="participant-runes__keystone">
                        <RuneIconWithTooltip 
                            perk={keystoneRune}
                            className="participant-runes__keystone-icon"
                        />

                        <div className="participant-runes__perk-text">
                            <strong>{keystoneRune.name}</strong>
                        </div>
                    </article>
                )}

                <div className="participant-runes__perk-list">
                    {primaryRunes.map((perk) => (
                        <article className="participant-runes__perk" key={perk.name}>
                            <RuneIconWithTooltip 
                                perk={perk}
                                className="participant-runes__perk-icon"
                            />

                            <div className="participant-runes__perk-text">
                                <strong>{perk.name}</strong>
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
                            <RuneIconWithTooltip 
                                perk={perk}
                                className="participant-runes__perk-icon"
                            />

                            <div className="participant-runes__perk-text">
                                <strong>{perk.name}</strong>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MatchParticipantsRunes;
