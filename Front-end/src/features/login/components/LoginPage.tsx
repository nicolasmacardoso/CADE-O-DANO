import { useState } from "react";
/* import cadeODanoLogo from "../assets/cade-o-dano-logo.png"; */

type Props = {
  onSearch: (nick: string, tag: string) => Promise<void>;
  loading: boolean;
  historyError: string;
};

function LoginPage({ onSearch, loading, historyError }: Props) {
  const [nick, setNick] = useState("");
  const [tag, setTag] = useState("");

  return (
    <div className="login-page">
      {historyError && <p className="request error">{historyError}</p>}

      <div className="login-form">
        <input
          placeholder="Usuario"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
        />

        <div className="tag-field">
          <span className="tag-hashtag">#</span>

          <input
            className="login-input"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
