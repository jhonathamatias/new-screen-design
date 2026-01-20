import { Home, Receipt, RefreshCw, FileText, FolderArchive, LayoutGrid } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const menuItems = [
  { title: "Início", url: "/", icon: Home },
  { title: "Reembolsos", url: "/reembolsos", icon: Receipt },
  { title: "Troca de Titularidade", url: "/troca-titularidade", icon: RefreshCw },
  { title: "CCB – Gestão Arquivos", url: "/ccb-gestao-arquivos", icon: FolderArchive },
  { title: "CCB – Antd", url: "/ccb-gestao-arquivos-antd", icon: LayoutGrid },
  { title: "BDR", url: "/bdr", icon: FileText },
];

export function AppSidebar() {
  return (
    <aside className="w-56 min-h-screen bg-card border-r border-border">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            activeClassName="bg-muted text-foreground font-medium"
          >
            <item.icon className="w-4 h-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
