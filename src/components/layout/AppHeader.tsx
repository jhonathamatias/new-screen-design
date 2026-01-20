import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  return (
    <header className="h-14 bg-header text-header-foreground flex items-center justify-between px-4 border-b border-sidebar-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-warning-foreground">B</span>
          </div>
          <span className="font-semibold text-lg">BackOffice</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-sidebar-accent rounded text-sm">
          <span>FIDC</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Avatar className="w-8 h-8 bg-info">
              <AvatarFallback className="bg-info text-info-foreground text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm max-w-[150px] truncate">{userName}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover">
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Configurações</DropdownMenuItem>
          <DropdownMenuItem>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
