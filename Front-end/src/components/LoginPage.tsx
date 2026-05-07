import { useState } from "react";
/* import cadeODanoLogo from "../assets/cade-o-dano-logo.png"; */

type Props = {
  onSearch: (nick: string, tag: string, matchesNumber: string) => Promise<void>;
  loading: boolean;
};

function LoginPage({ onSearch, loading }: Props) {
  const [nick, setNick] = useState("");
  const [tag, setTag] = useState("");
  const [matchesNumber, setMatchesNumber] = useState("");

  return (
    <div className="login-page">
      {/* <img className="login-logo" src={cadeODanoLogo} alt="Cade o Dano" /> */}

      <div className="login-form">
        <input
          placeholder="Usuario"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
        />

        <div className="tag-field">
          <span>#</span>

          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="BR1"
          />
        </div>

        <input
          type="text"
          value={matchesNumber}
          onChange={(e) => setMatchesNumber(e.target.value)}
          placeholder="5"
        />

        <button
          disabled={loading || !nick.trim() || !tag.trim()}
          onClick={() => onSearch(nick, tag, matchesNumber)}
        >
          {loading ? "Carregando..." : "Buscar"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
