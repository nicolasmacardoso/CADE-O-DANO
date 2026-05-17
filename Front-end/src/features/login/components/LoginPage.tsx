import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import type { StoredPlayer } from "../../../services/storage/playerStorage";
import FloatingAlert from "../../../shared/components/FloatingAlert";
import RemoteImage from "../../../shared/components/RemoteImage";

type Props = {
    onSearch: (nick: string, tag: string) => Promise<void>;
    loading: boolean;
    historyError: string;
    searchedPlayers: StoredPlayer[];
};

function LoginPage({ onSearch, loading, historyError, searchedPlayers }: Props) {
    const [nick, setNick] = useState("");
    const [tag, setTag] = useState("");
    const [openSearchPlayersList, setOpenSearchPlayersList] = useState(false);
    const [shouldFocusFirstSearchedPlayer, setShouldFocusFirstSearchedPlayer] = useState(false);
    
    const [activeSearchedPlayerIndex, setActiveSearchedPlayerIndex] = useState<number | null>(null);

    const userInputRef = useRef<HTMLInputElement>(null);
    const searchedPlayerButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const ignoreNextUserInputFocusRef = useRef(false);

    const filteredSearchedPlayers = searchedPlayers.filter((player) =>
        player.nick.toLowerCase().includes(nick.toLowerCase())
    );

    useEffect(() => {
        if (!shouldFocusFirstSearchedPlayer) return;
        if (!openSearchPlayersList) return;
        if (filteredSearchedPlayers.length === 0) return;

        searchedPlayerButtonRefs.current[0]?.focus();
        setShouldFocusFirstSearchedPlayer(false);
    }, [
        shouldFocusFirstSearchedPlayer, 
        openSearchPlayersList, 
        filteredSearchedPlayers.length
    ]);

    function handleUserInputKeyDown (event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "ArrowDown") {
            event.preventDefault();

            setOpenSearchPlayersList(true);
            setShouldFocusFirstSearchedPlayer(true);
            setActiveSearchedPlayerIndex(0);
        } else if (event.key === "Escape") {
            setOpenSearchPlayersList(false);
            setActiveSearchedPlayerIndex(null);
        };
    }

    function handleUserInputFocus () {
        if (ignoreNextUserInputFocusRef.current) {
            ignoreNextUserInputFocusRef.current = false;
            return;
        } 

        setOpenSearchPlayersList(true);
    }

    function handleUserFieldBlur (event: FocusEvent<HTMLDivElement, Element>) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpenSearchPlayersList(false);
            setActiveSearchedPlayerIndex(null);
        }
    }

    function handleSearchedPlayersButtonClick (nick: string, tag: string) {
        setOpenSearchPlayersList(false);

        setNick(nick);
        setTag(tag);

        onSearch(nick, tag);
    }

    function handleSearchedPlayersButtonKeyDown (event: KeyboardEvent<HTMLButtonElement>, index: number) {
        const isLastItem = index === filteredSearchedPlayers.length - 1;
        
        if (event.key === "ArrowDown") {
            if (isLastItem) return;

            event.preventDefault();

            searchedPlayerButtonRefs.current[index+1]?.focus();

            setActiveSearchedPlayerIndex(index+1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();

            if (index === 0) {
                userInputRef.current?.focus();

                setActiveSearchedPlayerIndex(null);
                
                return;
            }

            searchedPlayerButtonRefs.current[index-1]?.focus();

            setActiveSearchedPlayerIndex(index-1);
        } else if (event.key === "Escape") {
            ignoreNextUserInputFocusRef.current = true;

            setOpenSearchPlayersList(false);
            
            setActiveSearchedPlayerIndex(null);

            userInputRef.current?.focus();
        };
    }
  
    return (
        <div className="login-page">
            <FloatingAlert
                variant={historyError ? "error" : "loading"}
                message={historyError || (loading ? "Buscando histórico do jogador..." : "")}
            />

            <section className="login-hero" aria-labelledby="login-title">
                <p className="login-hero__eyebrow">League analytics</p>
                <h1 id="login-title">Cade o dano?</h1>
                <p className="login-hero__description">
                    Analise historico, dano, KDA, builds, runas e desempenho real das partidas em uma interface feita para leitura rapida.
                </p>
                <div className="login-hero__metrics" aria-label="Recursos principais">
                    <span>Historico</span>
                    <span>Dano</span>
                    <span>Runas</span>
                </div>
            </section>

            <div className="login-form" aria-label="Buscar jogador">
                <div className="login-form__header">
                    <p>Buscar invocador</p>
                    <span>Riot ID</span>
                </div>

                <div 
                    className="user-field"
                    onBlur={(event) => handleUserFieldBlur(event)}
                >
                    <input
                        placeholder="Usuário"
                        id="user-input"
                        autoComplete="off"
                        ref={userInputRef}
                        value={nick}
                        onChange={(e) => setNick(e.target.value)}
                        onFocus={handleUserInputFocus}
                        onKeyDown={(event) => handleUserInputKeyDown(event)}
                    />

                    {openSearchPlayersList && filteredSearchedPlayers.length > 0 && (
                        <div className="searched-players-list">
                            {filteredSearchedPlayers.map(({ 
                                nick, 
                                tag, 
                                profileIconUrl 
                            }, index) => (
                                <button
                                    tabIndex={-1}
                                    ref={(element) => {
                                        searchedPlayerButtonRefs.current[index] = element;
                                    }}
                                    key={`${nick}-${tag}`}
                                    className={
                                        activeSearchedPlayerIndex === index ? 
                                            "searched-players__button searched-players__button--selected" : 
                                            "searched-players__button"
                                    }
                                    type="button"
                                    onMouseEnter={() => setActiveSearchedPlayerIndex(index)}
                                    onClick={() => handleSearchedPlayersButtonClick(nick, tag)}
                                    onKeyDown={(event) => handleSearchedPlayersButtonKeyDown(event, index)}
                                >
                                    <RemoteImage className="searched-players__icon" src={profileIconUrl} alt="Ícone do jogador pesquisado"/>
                                    <p className="searched-players__nick">{nick}</p>
                                    <p className="searched-players__tag">#{tag}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="tag-field">
                    <span className="tag-hashtag">#</span>

                    <input
                        className="login-input"
                        type="text"
                        id="tag-input"
                        autoComplete="off"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key !== "Enter" || !nick.trim() || !tag.trim()) return;
                            onSearch(nick, tag);
                        }}
                        placeholder="BR1"
                    />
                </div>

                <button 
                    className={loading ? "search-button is-loading" : "search-button"}
                    disabled={loading || !nick.trim() || !tag.trim()}
                    onClick={() => onSearch(nick, tag)}
                >
                    {loading ? "Buscando..." : "Analisar jogador"}
                    {loading ? (
                        <LoaderCircle size={20} strokeWidth={2.4} aria-hidden="true" />
                    ) : (
                        <ArrowRight size={20} strokeWidth={2.4} aria-hidden="true" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
