import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { LoteCard } from "@/components/bdr/LoteCard";
import { Tabs, Button, Input, Typography, Empty } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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

  const tabItems = [
    { key: "afinz", label: "Afinz" },
    { key: "termo", label: "Termo" },
    { key: "bdr", label: "BDR" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Title level={2} style={{ margin: 0 }}>
              CCB – Gestão Arquivos
            </Title>
            <Text type="secondary">
              Gerencie os lotes, arquivos e termos de CCB
            </Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />}>
            Novo Lote
          </Button>
        </div>

        {/* Tabs e Busca */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            className="w-full sm:w-auto"
          />

          <Input
            placeholder="Buscar por lote ou arquivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-full sm:w-72"
          />
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
            <Empty
              description={
                <div>
                  <p className="text-lg font-medium">Nenhum lote encontrado</p>
                  <p className="text-sm mt-1 text-gray-500">
                    {searchTerm
                      ? "Tente buscar com outros termos"
                      : "Clique em 'Novo Lote' para criar um novo lote"}
                  </p>
                </div>
              }
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
