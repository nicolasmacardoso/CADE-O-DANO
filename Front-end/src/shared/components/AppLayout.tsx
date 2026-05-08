import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebar?: ReactNode;
};

function AppLayout({ children, sidebar }: Props) {
  return (
    <div className="app-layout">
      <main className="app-layout__main">
        {children}
      </main>

      {sidebar && (
        <aside className="app-layout__sidebar">
          {sidebar}
        </aside>
      )}
    </div>
  );
}

export default AppLayout;
