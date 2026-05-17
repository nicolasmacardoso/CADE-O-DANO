import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

type Props = {
  children: ReactNode;
  sidebar?: ReactNode;
};

function AppLayout({ children, sidebar }: Props) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app-layout">
            <main className="app-layout__main">
                {children}
            </main>
            
            <button 
                className="app-layout__sidebar-button" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                type="button"
                aria-label={isSidebarOpen ? "Fechar painel do jogador" : "Abrir painel do jogador"}
                aria-expanded={isSidebarOpen}
            >
                {isSidebarOpen ? (
                    <X size={25} strokeWidth={2.5} aria-hidden="true" />
                ) : (
                    <Menu size={25} strokeWidth={2.5} aria-hidden="true" />
                )}
            </button>
            
            {sidebar && (
                <aside className={
                    isSidebarOpen ? 
                    "app-layout__sidebar app-layout__sidebar--open" : 
                    "app-layout__sidebar"
                }>
                    {sidebar}
                </aside>
            )}
        </div>
    );
}

export default AppLayout;
