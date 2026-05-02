import { useState } from "react";

type Props = {
    onSearch: (nick: string, tag: string) => Promise<void>;
    loading: boolean;
}

function LoginPage ({ onSearch, loading }: Props) {
    const [nick, setNick] = useState("");
    const [tag, setTag] = useState("");
    
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

            <button 
                disabled={loading || !nick.trim() || !tag.trim()}
                onClick={() => onSearch(nick, tag)}
            >
                {loading ? "Carregando..." : "Buscar"}
            </button>
        </div>
    )
}

export default LoginPage;