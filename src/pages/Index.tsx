import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileDown, Filter } from "lucide-react";

const statsCards = [
  { title: "Total Enviado", value: 0 },
  { title: "Total Aceito", value: 0 },
  { title: "Total Rejeitado", value: 0 },
  { title: "Total Sem Termo", value: 0 },
];

const tableHeaders = [
  "Ticket BDR",
  "Id Cliente",
  "Doc Origem",
  "Saldo BDR ...",
  "Doc Destino",
  "Saldo BDR ...",
  "Dt da Troca",
  "Saldo",
  "Status BDR",
  "Retorno BDR",
  "ID da Troca",
  "Ações",
];

const documentosDestino = [
  {
    title: "Aprovados Simples",
    count: 0,
    subItems: [
      { label: "Com Termo", value: 0 },
      { label: "Sem Termo", value: 0 },
    ],
  },
  {
    title: "Rejeitados",
    count: 4,
    subItems: [
      { label: "Com Termo", value: 4 },
      { label: "Sem Termo", value: 0 },
    ],
  },
  {
    title: "Troca titularidade travadas com cedente enviado para documento destino",
    count: 5,
    subItems: [
      { label: "Por outros motivos", value: 4 },
      { label: "Por documento destino rejeitado", value: 1 },
    ],
  },
  {
    title: "Trocas travadas com cedentes não enviados para os documentos destino",
    count: null,
    subItems: [{ label: "Total", value: 1 }],
  },
];

export default function Index() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Troca de Titularidade
          </h1>
          <div className="flex items-center gap-3">
            <Button className="bg-primary hover:bg-primary/90">
              <Filter className="w-4 h-4 mr-2" />
              Filtros Avançados
            </Button>
            <Button variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => (
            <Card key={stat.title} className="bg-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Table */}
        <Card className="bg-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {tableHeaders.map((header) => (
                      <TableHead key={header} className="font-semibold whitespace-nowrap">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={tableHeaders.length}
                      className="h-32 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-3">
                          <FileDown className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p>Não há dados</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Documentos Destino Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Documentos destino das trocas{" "}
            <span className="text-muted-foreground font-normal">
              (Últimos 6 meses)
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {documentosDestino.map((doc, index) => (
              <Card key={index} className="bg-card">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium text-foreground leading-tight flex-1">
                      {doc.title}
                      {doc.count !== null && (
                        <span className="text-muted-foreground ml-1">
                          ({doc.count})
                        </span>
                      )}
                    </CardTitle>
                    <Button variant="outline" size="sm" className="ml-2 shrink-0">
                      <FileDown className="w-4 h-4 mr-1" />
                      Exportar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {doc.subItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-center">
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
