import { AppLayout } from "@/components/layout/AppLayout";
import { LoteCard } from "@/components/bdr/LoteCard";
import { Tabs, Typography } from "antd";

const { Title, Text } = Typography;

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

  const tabItems = [
    {
      key: "afinz",
      label: "Afinz",
      children: (
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
      ),
    },
    {
      key: "termo",
      label: "Termo",
      children: (
        <div className="border rounded-lg p-8 text-center text-gray-500 bg-white">
          <p>Conteúdo da aba Termo</p>
          <p className="text-sm mt-1">
            Visualize e gerencie os termos gerados
          </p>
        </div>
      ),
    },
    {
      key: "bdr",
      label: "BDR",
      children: (
        <div className="border rounded-lg p-8 text-center text-gray-500 bg-white">
          <p>Conteúdo da aba BDR</p>
          <p className="text-sm mt-1">
            Informações gerais do BDR
          </p>
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Gestão de BDR
          </Title>
          <Text type="secondary">
            Gerencie os lotes, arquivos e termos do BDR
          </Text>
        </div>

        <Tabs defaultActiveKey="afinz" items={tabItems} />
      </div>
    </AppLayout>
  );
}
