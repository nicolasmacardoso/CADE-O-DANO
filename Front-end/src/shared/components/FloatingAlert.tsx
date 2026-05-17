type Props = {
    message?: string;
    variant: "loading" | "error";
}

function FloatingAlert({ message, variant }: Props) {
    if (!message) return null;

    const title = variant === "error" ? "Algo deu errado" : "Aguarde";

    return (
        <div className={`floating-alert floating-alert--${variant}`} role={variant === "error" ? "alert" : "status"}>
            <span className="floating-alert__icon" aria-hidden="true" />

            <div className="floating-alert__content">
                <strong>{title}</strong>
                <p>{message}</p>
            </div>

            {variant === "error" && (
                <span className="floating-alert__timer" aria-hidden="true" />
            )}
        </div>
    );
}

export default FloatingAlert;
