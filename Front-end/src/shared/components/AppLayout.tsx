import { useState, type ReactNode } from "react";

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
            >
                <div className="app-layout__sidebar-button-line"/>
                <div className="app-layout__sidebar-button-line"/>
                <div className="app-layout__sidebar-button-line"/>
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
