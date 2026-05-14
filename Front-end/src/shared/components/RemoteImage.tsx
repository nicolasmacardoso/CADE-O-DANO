import { useEffect, useRef, useState } from "react";

type ImageStatus = "loading" | "loaded" | "error";

type Props = {
    src: string;
    alt: string;
    className?: string;
    loading?: "eager" | "lazy";
}

function RemoteImage({ src, alt, className = "", loading = "lazy" }: Props) {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [status, setStatus] = useState<ImageStatus>("loading");

    useEffect(() => {
        const image = imageRef.current;

        setStatus("loading");

        if (!image) return;

        if (image.complete && image.naturalWidth > 0) {
            setStatus("loaded");
        } else if (image.complete && image.naturalWidth === 0) {
            setStatus("error");
        }
    }, [src]);

    return (
        <img
            ref={imageRef}
            className={[
                "remote-image",
                `remote-image--${status}`,
                className,
            ].filter(Boolean).join(" ")}
            src={src}
            alt={alt}
            loading={loading}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
        />
    );
}

export default RemoteImage;
