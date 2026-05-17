import { ArrowLeft } from "lucide-react";

type Props = {
    onBack: () => void;
}

function BackButton({ onBack }: Props) {
    return (
        <button className="backButton" type="button" onClick={onBack} aria-label="Voltar para a tela anterior">
            <ArrowLeft size={18} strokeWidth={2.5} aria-hidden="true" />
            Voltar
        </button>
    );
}

export default BackButton;
