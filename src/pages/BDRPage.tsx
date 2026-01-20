import { AppLayout } from "@/components/layout/AppLayout";
import { LoteCard } from "@/components/bdr/LoteCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados mockados para demonstração
const lotesData = [
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

export default function BDRPage() {
  const handleGerarTermo = (loteNumero: number) => {
    console.log(`Gerando termo para Lote ${loteNumero}`);
    // Implementar lógica de geração de termo
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Gestão de BDR
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os lotes, arquivos e termos do BDR
          </p>
        </div>

        <Tabs defaultValue="afinz" className="w-full">
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

          <TabsContent value="afinz" className="mt-6">
            <div className="space-y-4">
              {lotesData.map((lote) => (
                <LoteCard
                  key={lote.loteNumero}
                  loteNumero={lote.loteNumero}
                  arquivos={lote.arquivos}
                  termo={lote.termo}
                  onGerarTermo={() => handleGerarTermo(lote.loteNumero)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="termo" className="mt-6">
            <div className="border rounded-lg p-8 text-center text-muted-foreground bg-card">
              <p>Conteúdo da aba Termo</p>
              <p className="text-sm mt-1">
                Visualize e gerencie os termos gerados
              </p>
            </div>
          </TabsContent>

          <TabsContent value="bdr" className="mt-6">
            <div className="border rounded-lg p-8 text-center text-muted-foreground bg-card">
              <p>Conteúdo da aba BDR</p>
              <p className="text-sm mt-1">
                Informações gerais do BDR
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
