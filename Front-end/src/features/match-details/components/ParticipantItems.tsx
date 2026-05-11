type Props = {
    itemIconUrls: string[];
}

function ParticipantItems ({ itemIconUrls }: Props) {
    const itemSlots = Array.from({ length: 7 });

    return (
        <div className="participant-card__items">
            {itemSlots.map((_, index) => (
                <div className="participant-card__item-slot" key={index}>
                    {itemIconUrls[index] ? (
                        <img
                            className="participant-card__item-icon"
                            src={itemIconUrls[index]}
                            alt="Icone do item"
                        />
                    ) : (
                        <div className="participant-card__empty-item" />
                    )}
                </div>
            ))}
        </div>
    );
}

export default ParticipantItems;