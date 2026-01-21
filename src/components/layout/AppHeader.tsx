import { Avatar, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface AppHeaderProps {
  userName?: string;
}

export function AppHeader({ userName = "Jhonatha Matias da..." }: AppHeaderProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const menuItems: MenuProps["items"] = [
    { key: "1", label: "Perfil" },
    { key: "2", label: "Configurações" },
    { key: "3", label: "Sair" },
  ];

  return (
    <header className="h-14 bg-header text-header-foreground flex items-center justify-between px-4 border-b border-sidebar-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-warning-foreground">B</span>
          </div>
          <span className="font-semibold text-lg">BackOffice</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-sidebar-accent rounded text-sm cursor-pointer">
          <span>FIDC</span>
          <DownOutlined className="text-xs" />
        </div>
      </div>

      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
          <Avatar className="bg-info text-info-foreground text-xs" size={32}>
            {initials}
          </Avatar>
          <span className="text-sm max-w-[150px] truncate">{userName}</span>
          <DownOutlined className="text-xs" />
        </button>
      </Dropdown>
    </header>
  );
}
