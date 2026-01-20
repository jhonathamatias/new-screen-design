import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { LoteCard } from "@/components/bdr/LoteCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

// Dados mockados para demonstração
const lotesAfinz = [
  {
    loteNumero: 3,
    arquivos: [
      { nome: "Cessao", status: "enviado" as const, enviadoEm: "20/01/2025 9:00" },
      { nome: "IOF", status: "enviado" as const, enviadoEm: "20/01/2025 9:30" },
    ],
    termo: {
      urlDownload: "#",
      status: "pendente" as const,
      assinaturas: [
        { nome: "Jhon", status: "assinado" as const },
        { nome: "Borges", status: "pendente" as const },
      ],
    },
  },
  {
    loteNumero: 2,
    arquivos: [
      { nome: "Cessao", status: "enviado" as const, enviadoEm: "20/01/2025 9:00" },
      { nome: "IOF", status: "enviado" as const, enviadoEm: "20/01/2025 9:30" },
      { nome: "Contabilidade", status: "enviado" as const, enviadoEm: "20/01/2025 10:00" },
    ],
  },
  {
    loteNumero: 1,
    arquivos: [
      { nome: "Cessao", status: "enviado" as const, enviadoEm: "19/01/2025 14:00" },
      { nome: "IOF", status: "pendente" as const, enviadoEm: "-" },
    ],
  },
];

const lotesTermo = [
  {
    loteNumero: 3,
    arquivos: [
      { nome: "Termo_Cessao_v1", status: "enviado" as const, enviadoEm: "20/01/2025 11:00" },
    ],
    termo: {
      urlDownload: "#",
      status: "completo" as const,
      assinaturas: [
        { nome: "Jhon", status: "assinado" as const },
        { nome: "Borges", status: "assinado" as const },
      ],
    },
  },
];

const lotesBDR = [
  {
    loteNumero: 2,
    arquivos: [
      { nome: "BDR_Relatorio_Jan", status: "enviado" as const, enviadoEm: "18/01/2025 16:00" },
      { nome: "BDR_Anexos", status: "enviado" as const, enviadoEm: "18/01/2025 16:30" },
    ],
  },
];

export default function CCBGestaoArquivos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("afinz");

  const handleGerarTermo = (loteNumero: number) => {
    console.log(`Gerando termo para Lote ${loteNumero}`);
  };

  const getCurrentLotes = () => {
    switch (activeTab) {
      case "afinz":
        return lotesAfinz;
      case "termo":
        return lotesTermo;
      case "bdr":
        return lotesBDR;
      default:
        return [];
    }
  };

  const filteredLotes = getCurrentLotes().filter((lote) =>
    lote.arquivos.some((arquivo) =>
      arquivo.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ) || lote.loteNumero.toString().includes(searchTerm)
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              CCB – Gestão Arquivos
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os lotes, arquivos e termos de CCB
            </p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Novo Lote
          </Button>
        </div>

        {/* Tabs e Busca */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full sm:w-auto"
          >
            <TabsList className="bg-card border border-border">
              <TabsTrigger
                value="afinz"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Afinz
              </TabsTrigger>
              <TabsTrigger
                value="termo"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Termo
              </TabsTrigger>
              <TabsTrigger
                value="bdr"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                BDR
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por lote ou arquivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Lista de Lotes */}
        <div className="space-y-4">
          {filteredLotes.length > 0 ? (
            filteredLotes.map((lote) => (
              <LoteCard
                key={`${activeTab}-${lote.loteNumero}`}
                loteNumero={lote.loteNumero}
                arquivos={lote.arquivos}
                termo={"termo" in lote ? lote.termo : undefined}
                onGerarTermo={() => handleGerarTermo(lote.loteNumero)}
              />
            ))
          ) : (
            <div className="border rounded-lg p-12 text-center text-muted-foreground bg-card">
              <p className="text-lg font-medium">Nenhum lote encontrado</p>
              <p className="text-sm mt-1">
                {searchTerm
                  ? "Tente buscar com outros termos"
                  : "Clique em 'Novo Lote' para criar um novo lote"}
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
