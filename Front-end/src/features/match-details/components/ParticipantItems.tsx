import { useState } from "react";

type Props = {
    itemIconUrls: string[];
}

type ItemLoadStatus = "loading" | "loaded" | "error";

function ParticipantItems ({ itemIconUrls }: Props) {
    const itemSlots = Array.from({ length: 7 });
    const [itemLoadStatus, setItemLoadStatus] = useState<Record<number, ItemLoadStatus>>({});

    function handleItemLoad(index: number) {
        setItemLoadStatus((currentStatus) => ({
            ...currentStatus,
            [index]: "loaded",
        }));
    }

    function handleItemError(index: number) {
        setItemLoadStatus((currentStatus) => ({
            ...currentStatus,
            [index]: "error",
        }));
    }

    return (
        <div className="participant-card__items">
            {itemSlots.map((_, index) => {
                const itemIconUrl = itemIconUrls[index];
                const loadStatus = itemLoadStatus[index] ?? "loading";
                const hasLoadedItem = Boolean(itemIconUrl) && loadStatus === "loaded";
                const hasLoadingItem = Boolean(itemIconUrl) && loadStatus === "loading";

                return (
                    <div
                        className={[
                            "participant-card__item-slot",
                            hasLoadedItem ? "participant-card__item-slot--loaded" : "",
                            hasLoadingItem ? "participant-card__item-slot--loading" : "",
                            !itemIconUrl || loadStatus === "error" ? "participant-card__item-slot--empty" : "",
                        ].filter(Boolean).join(" ")}
                        key={index}
                    >
                        {itemIconUrl && loadStatus !== "error" ? (
                            <img
                                className="participant-card__item-icon"
                                src={itemIconUrl}
                                alt="Icone do item"
                                onLoad={() => handleItemLoad(index)}
                                onError={() => handleItemError(index)}
                            />
                        ) : (
                            <div className="participant-card__empty-item" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ParticipantItems;
