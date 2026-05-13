import type { MatchSummary } from "../../../types/match";
import BackButton from "../../../shared/components/BackButton";
import MatchCard from "./MatchCard";
import { useState } from "react";

type Props = {
    onBack: () => void;
    onRefresh: () => Promise<void>;
    matches: MatchSummary[];
    onSelectMatch: (matchId: string) => Promise<void>;
    isLoadingMatchDetails: boolean;
    isRefreshingHistory: boolean;
    matchError: string;
}

function HistoryPage ({ 
    onBack, 
    onRefresh, 
    matches, 
    onSelectMatch, 
    isLoadingMatchDetails,
    isRefreshingHistory, 
    matchError 
}: Props) {
    const maxDamageInList = Math.max(...matches.map((match) => match.totalDamage), 0);
    const matchesWithoutRemake = matches.filter(match => match.result !== 2)
    const minDamageInList = matchesWithoutRemake.length > 0
        ? Math.min(...matchesWithoutRemake.map((match) => match.totalDamage))
        : 0;
        
    const [showDamageText, setShowDamageText] = useState(false);

    return (
        <div className="history-page">
            <div className="history-page__buttons-box">
                <BackButton onBack={onBack}/>
                <button
                    type="button"
                    className={isRefreshingHistory ? "history-page__refresh-button is-loading" : "history-page__refresh-button"}
                    onClick={onRefresh}
                    disabled={isRefreshingHistory}
                    aria-label="Recarregar histórico"
                    title="Recarregar histórico"
                />
            </div>

            <header className="history-page__header">
                <h1>Histórico de partidas</h1>
            </header>
            
            <div className="history-page__feedback">
                {isRefreshingHistory && <p>Atualizando histórico...</p>}
                {isLoadingMatchDetails && <p>Carregando detalhes da partida selecionada...</p>}
                {matchError && <p className="match-error">{matchError}</p>}
            </div>

            <label className="damage-toggle">
                <span className="damage-toggle__label">Exibir dano</span>
                <input 
                    className="damage-toggle__input"
                    type="checkbox" 
                    name="show-damage-text" 
                    checked={showDamageText}
                    onChange={(event) => setShowDamageText(event.target.checked)}
                />
                <span className="damage-toggle__control" />
            </label>
            
            <section className="match-list">
                {matches.length > 0 ?  (
                    matches.map((match) => (
                        <MatchCard
                            key={match.matchId}
                            match={match}
                            maxDamageInList={maxDamageInList}
                            minDamageInList={minDamageInList}
                            onSelectMatch={onSelectMatch}
                            isLoadingMatchDetails={isLoadingMatchDetails}
                            showDamageText={showDamageText}
                        />
                    ))
                ) : (
                    <p className="empty-state">Nenhuma partida encontrada</p>
                )}
            </section>
        </div>
    )
}

export default HistoryPage;
