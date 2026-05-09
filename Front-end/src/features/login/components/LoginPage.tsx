import { useRef, useState } from "react";
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

  const userInputRef = useRef<HTMLInputElement>(null);
  const searchedPlayerButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  
  const ignoreNextUserInputFocusRef = useRef(false);

  const filteredSearchedPlayers = searchedPlayers.filter((player) =>
    player.nick.toLowerCase().includes(nick.toLowerCase())
  );
  
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
                setOpenSearchPlayersList(true);
                event.preventDefault();
                searchedPlayerButtonRefs.current[0]?.focus();
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
                  className="searched-players__button"
                  type="button"
                  onClick={() => {
                    setOpenSearchPlayersList(false);
                    setNick(nick);
                    setTag(tag);
                    onSearch(nick, tag);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      searchedPlayerButtonRefs.current[index+1]?.focus();
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      searchedPlayerButtonRefs.current[index-1]?.focus();
                      if (index == 0) {
                        userInputRef.current?.focus();
                      }
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
