import { useEffect, useRef, useState } from "react";
import type { StoredPlayer } from "../../../services/storage/playerStorage";

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
  
  return (
    <div className="login-page">
      {historyError && <p className="request error">{historyError}</p>}

      <div className="login-form">
        <div 
          className="user-field"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setOpenSearchPlayersList(false);
            }
          }}
        >
          <input
            placeholder="Usuário"
            id="user-input"
            autoComplete="off"
            ref={userInputRef}
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            onFocus={() => {
              if (ignoreNextUserInputFocusRef.current) {
                ignoreNextUserInputFocusRef.current = false;
                return;
              } 
              setOpenSearchPlayersList(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setOpenSearchPlayersList(true);
                setShouldFocusFirstSearchedPlayer(true);
                setActiveSearchedPlayerIndex(0);
              } else if (event.key === "Escape") {
                setOpenSearchPlayersList(false);
              };
            }}
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
                  className={activeSearchedPlayerIndex === index ? "searched-players__button searched-players__button--selected" : "searched-players__button"}
                  type="button"
                  onMouseEnter={()=>{
                    searchedPlayerButtonRefs.current[index]?.focus();
                    setActiveSearchedPlayerIndex(index)
                  }}
                  onClick={() => {
                    setOpenSearchPlayersList(false);
                    setNick(nick);
                    setTag(tag);
                    onSearch(nick, tag);
                  }}
                  onKeyDown={(event) => {
                    const isLastItem = index === filteredSearchedPlayers.length - 1;
                    
                    if (event.key === "ArrowDown") {
                      if (isLastItem) return;
                      event.preventDefault();
                      searchedPlayerButtonRefs.current[index+1]?.focus();
                      setActiveSearchedPlayerIndex(index+1);
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      if (index == 0) {
                        userInputRef.current?.focus();
                        setActiveSearchedPlayerIndex(null);
                        return;
                      }
                      searchedPlayerButtonRefs.current[index-1]?.focus();
                      setActiveSearchedPlayerIndex(index-1);
                    } else if (event.key === "Escape") {
                      ignoreNextUserInputFocusRef.current = true;
                      setOpenSearchPlayersList(false);
                      userInputRef.current?.focus();
                    };
                  }}
                >
                  <img className="searched-players__icon" src={profileIconUrl} alt="Ícone do jogador pesquisado"/>
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
        />
      </div>
    </div>
  );
}

export default LoginPage;
