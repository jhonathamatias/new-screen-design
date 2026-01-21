import { NavLink } from "@/components/NavLink";
import { 
  HomeOutlined, 
  DollarOutlined, 
  ReloadOutlined, 
  FolderOutlined, 
  AppstoreOutlined,
  FileTextOutlined 
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const menuItems = [
  { title: "Início", url: "/", icon: HomeOutlined },
  { title: "Reembolsos", url: "/reembolsos", icon: DollarOutlined },
  { title: "Troca de Titularidade", url: "/troca-titularidade", icon: ReloadOutlined },
  { title: "CCB – Gestão Arquivos", url: "/ccb-gestao-arquivos", icon: FolderOutlined },
  { title: "CCB – Antd", url: "/ccb-gestao-arquivos-antd", icon: AppstoreOutlined },
  { title: "BDR", url: "/bdr", icon: FileTextOutlined },
];

export function AppSidebar() {
  return (
    <aside className="w-56 min-h-screen bg-card border-r border-border">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.title}
              to={item.url}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              activeClassName="bg-gray-100 text-gray-900 font-medium"
            >
              <IconComponent className="text-base" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
