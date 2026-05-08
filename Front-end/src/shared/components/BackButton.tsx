type Props = {
    onBack: () => void;
}

function BackButton({onBack}: Props) {
    return (
        <button className="backButton" onClick={onBack}>Voltar</button>
    )
}

export default BackButton;