type Props = {
    message?: string;
    variant: "loading" | "error";
}

function FloatingAlert({ message, variant }: Props) {
    if (!message) return null;

    return (
        <div className={`floating-alert floating-alert--${variant}`} role={variant === "error" ? "alert" : "status"}>
            <span className="floating-alert__icon" aria-hidden="true" />
            <p>{message}</p>
        </div>
    );
}

export default FloatingAlert;
