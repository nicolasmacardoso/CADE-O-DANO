type Props = {
    onBack: () => void;
}

function BackButton({onBack}: Props) {
    return (
        <button onClick={onBack}>Voltar</button>
    )
}

export default BackButton;