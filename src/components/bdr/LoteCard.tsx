import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Arquivo {
  nome: string;
  status: "enviado" | "pendente" | "erro";
  enviadoEm: string;
}

interface Assinatura {
  nome: string;
  status: "assinado" | "pendente";
}

interface Termo {
  urlDownload: string;
  status: "pendente" | "completo";
  assinaturas: Assinatura[];
}

interface LoteCardProps {
  loteNumero: number;
  arquivos: Arquivo[];
  termo?: Termo;
  onGerarTermo?: () => void;
}

export function LoteCard({
  loteNumero,
  arquivos,
  termo,
  onGerarTermo,
}: LoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enviado":
      case "assinado":
        return <Badge variant="outline" className="border-success text-success bg-success/10">
          {status}
        </Badge>;
      case "pendente":
        return <Badge variant="outline" className="border-warning text-warning bg-warning/10">
          {status}
        </Badge>;
      case "erro":
        return <Badge variant="outline" className="border-destructive text-destructive bg-destructive/10">
          {status}
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-foreground">
              Lote {loteNumero}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onGerarTermo}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              Gerar Termo
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <Tabs defaultValue="arquivos" className="w-full">
            <TabsList className="mb-4 bg-muted">
              <TabsTrigger value="arquivos">Arquivos</TabsTrigger>
              <TabsTrigger value="termo">Termo</TabsTrigger>
            </TabsList>

            <TabsContent value="arquivos" className="mt-0">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Arquivo</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Enviado em</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {arquivos.map((arquivo, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {arquivo.nome}
                        </TableCell>
                        <TableCell>{getStatusBadge(arquivo.status)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {arquivo.enviadoEm}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="termo" className="mt-0">
              {termo ? (
                <div className="border rounded-md p-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Url:
                      </span>
                      <a
                        href={termo.urlDownload}
                        className="text-sm text-info hover:underline"
                      >
                        download
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Status:
                      </span>
                      <span className="text-sm">
                        {termo.status === "pendente"
                          ? "pendente assinaturas"
                          : "completo"}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-sm font-medium text-muted-foreground">
                      Assinaturas:
                    </span>
                    <div className="mt-2 space-y-1">
                      {termo.assinaturas.map((assinatura, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{assinatura.nome}:</span>
                          {getStatusBadge(assinatura.status)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border rounded-md p-8 text-center text-muted-foreground">
                  <p>Nenhum termo gerado ainda.</p>
                  <p className="text-sm mt-1">
                    Clique em "Gerar Termo" para criar um novo termo.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
}
