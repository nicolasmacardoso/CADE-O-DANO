import { useState } from "react";

type Props = {
    onSearch: (nick: string, tag: string, matchesNumber: string) => Promise<void>;
    loading: boolean;
}

function LoginPage ({ onSearch, loading }: Props) {
    const [nick, setNick] = useState("");
    const [tag, setTag] = useState("");
    const [matchesNumber, setMatchesNumber] = useState("");
    
    return (
        <div>
            <input
                placeholder="Usuário"
                value={nick}
                onChange={(e) => setNick(e.target.value)} 
            />
            
            <div className="flex items-center border px-2">
                <span className="text-gray-500">#</span>

                <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="outline-none flex-1"
                    placeholder="BR1" 
                />
            </div>
                <input
                    type="text"
                    value={matchesNumber}
                    onChange={(e) => setMatchesNumber(e.target.value)}
                    className="outline-none flex-1"
                    placeholder="5"
                />

            <button 
                disabled={loading || !nick.trim() || !tag.trim()}
                onClick={() => onSearch(nick, tag, matchesNumber)}
            >
                {loading ? "Carregando..." : "Buscar"}
            </button>
        </div>
    )
}

export default LoginPage;