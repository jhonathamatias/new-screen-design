import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Tabs, 
  Input, 
  Button, 
  Card, 
  Table, 
  Tag, 
  Drawer, 
  Space, 
  Typography,
  Divider,
  Empty,
  Pagination
} from "antd";
import { 
  SearchOutlined, 
  PlusOutlined, 
  FileTextOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;

interface Arquivo {
  key: string;
  nome: string;
  status: "enviado" | "pendente";
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

interface Lote {
  loteNumero: number;
  dataCriacao: string;
  arquivos: Arquivo[];
  termo?: Termo;
}

// Dados mockados para demonstração
const lotesAfinz: Lote[] = [
  {
    loteNumero: 3,
    dataCriacao: "20/01/2025",
    arquivos: [
      { key: "1", nome: "Cessao", status: "enviado", enviadoEm: "20/01/2025 9:00" },
      { key: "2", nome: "IOF", status: "enviado", enviadoEm: "20/01/2025 9:30" },
    ],
    termo: {
      urlDownload: "#",
      status: "pendente",
      assinaturas: [
        { nome: "Jhon", status: "assinado" },
        { nome: "Borges", status: "pendente" },
      ],
    },
  },
  {
    loteNumero: 2,
    dataCriacao: "19/01/2025",
    arquivos: [
      { key: "1", nome: "Cessao", status: "enviado", enviadoEm: "20/01/2025 9:00" },
      { key: "2", nome: "IOF", status: "enviado", enviadoEm: "20/01/2025 9:30" },
      { key: "3", nome: "Contabilidade", status: "enviado", enviadoEm: "20/01/2025 10:00" },
    ],
  },
  {
    loteNumero: 1,
    dataCriacao: "18/01/2025",
    arquivos: [
      { key: "1", nome: "Cessao", status: "enviado", enviadoEm: "19/01/2025 14:00" },
      { key: "2", nome: "IOF", status: "pendente", enviadoEm: "-" },
    ],
  },
];

const lotesTermo: Lote[] = [
  {
    loteNumero: 3,
    dataCriacao: "20/01/2025",
    arquivos: [
      { key: "1", nome: "Termo_Cessao_v1", status: "enviado", enviadoEm: "20/01/2025 11:00" },
    ],
    termo: {
      urlDownload: "#",
      status: "completo",
      assinaturas: [
        { nome: "Jhon", status: "assinado" },
        { nome: "Borges", status: "assinado" },
      ],
    },
  },
];

const lotesBDR: Lote[] = [
  {
    loteNumero: 2,
    dataCriacao: "18/01/2025",
    arquivos: [
      { key: "1", nome: "BDR_Relatorio_Jan", status: "enviado", enviadoEm: "18/01/2025 16:00" },
      { key: "2", nome: "BDR_Anexos", status: "enviado", enviadoEm: "18/01/2025 16:30" },
    ],
  },
];

export default function CCBGestaoArquivosAntd() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("afinz");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLote, setSelectedLote] = useState<Lote | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

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

  const handleOpenDrawer = (lote: Lote) => {
    setSelectedLote(lote);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedLote(null);
  };

  const handleGerarTermo = () => {
    if (selectedLote) {
      console.log(`Gerando termo para Lote ${selectedLote.loteNumero}`);
    }
  };

  const columns: ColumnsType<Arquivo> = [
    {
      title: "Arquivo",
      dataIndex: "nome",
      key: "nome",
      render: (text) => (
        <Space>
          <FileTextOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "enviado" ? "success" : "warning"}>
          {status === "enviado" ? "Enviado" : "Pendente"}
        </Tag>
      ),
    },
    {
      title: "Enviado em",
      dataIndex: "enviadoEm",
      key: "enviadoEm",
    },
  ];

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
            <Title level={3} style={{ margin: 0, color: "hsl(var(--foreground))" }}>
              CCB – Gestão Arquivos (Antd)
            </Title>
            <Text type="secondary">
              Gerencie os lotes, arquivos e termos de CCB
            </Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            style={{ 
              backgroundColor: "hsl(var(--accent))",
              borderColor: "hsl(var(--accent))"
            }}
          >
            Novo Lote
          </Button>
        </div>

        {/* Tabs e Busca */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            style={{ marginBottom: 0 }}
          />

          <Input
            placeholder="Buscar por lote ou arquivo..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 288 }}
            allowClear
          />
        </div>

        {/* Lista de Lotes como Cards */}
        <div className="grid gap-4">
          {filteredLotes.length > 0 ? (
            filteredLotes
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((lote) => (
              <Card
                key={`${activeTab}-${lote.loteNumero}`}
                hoverable
                onClick={() => handleOpenDrawer(lote)}
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-center justify-between">
                  <Space>
                    <FolderOpenOutlined style={{ fontSize: 24, color: "hsl(var(--primary))" }} />
                    <div>
                      <Title level={5} style={{ margin: 0 }}>
                        Lote {lote.loteNumero}
                      </Title>
                      <Text type="secondary">
                        {lote.arquivos.length} arquivo(s) • Criado em {lote.dataCriacao}
                      </Text>
                    </div>
                  </Space>
                  <Space>
                    {lote.termo && (
                      <Tag color={lote.termo.status === "completo" ? "success" : "warning"}>
                        Termo: {lote.termo.status === "completo" ? "Completo" : "Pendente"}
                      </Tag>
                    )}
                    <Tag color="blue">
                      {lote.arquivos.filter(a => a.status === "enviado").length}/{lote.arquivos.length} enviados
                    </Tag>
                  </Space>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <Empty
                description={
                  searchTerm
                    ? "Nenhum lote encontrado para esta busca"
                    : "Nenhum lote cadastrado. Clique em 'Novo Lote' para criar."
                }
              />
            </Card>
          )}
        </div>

        {/* Paginação */}
        {filteredLotes.length > pageSize && (
          <div className="flex justify-end mt-4">
            <Pagination
              current={currentPage}
              total={filteredLotes.length}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showTotal={(total) => `Total: ${total} lotes`}
            />
          </div>
        )}

        {/* Drawer de Detalhes */}
        <Drawer
          title={selectedLote ? `Lote ${selectedLote.loteNumero}` : "Detalhes do Lote"}
          placement="right"
          width={600}
          onClose={handleCloseDrawer}
          open={drawerOpen}
          extra={
            <Space>
              {selectedLote && !selectedLote.termo && (
                <Button type="primary" onClick={handleGerarTermo}>
                  Gerar Termo
                </Button>
              )}
            </Space>
          }
        >
          {selectedLote && (
            <div className="space-y-6">
              {/* Arquivos */}
              <div>
                <Title level={5}>Arquivos</Title>
                <Table
                  columns={columns}
                  dataSource={selectedLote.arquivos}
                  pagination={false}
                  size="small"
                />
              </div>

              <Divider />

              {/* Termo */}
              <div>
                <Title level={5}>Termo</Title>
                {selectedLote.termo ? (
                  <Card size="small">
                    <Space direction="vertical" className="w-full">
                      <div className="flex items-center justify-between">
                        <Text>Status:</Text>
                        <Tag color={selectedLote.termo.status === "completo" ? "success" : "warning"}>
                          {selectedLote.termo.status === "completo" ? "Completo" : "Pendente"}
                        </Tag>
                      </div>
                      <div className="flex items-center justify-between">
                        <Text>Download:</Text>
                        <Button 
                          type="link" 
                          icon={<DownloadOutlined />}
                          href={selectedLote.termo.urlDownload}
                        >
                          Baixar Termo
                        </Button>
                      </div>
                      <Divider style={{ margin: "12px 0" }} />
                      <Title level={5} style={{ fontSize: 14 }}>Assinaturas</Title>
                      {selectedLote.termo.assinaturas.map((assinatura, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1">
                          <Text>{assinatura.nome}</Text>
                          <Space>
                            {assinatura.status === "assinado" ? (
                              <CheckCircleOutlined style={{ color: "#52c41a" }} />
                            ) : (
                              <ClockCircleOutlined style={{ color: "#faad14" }} />
                            )}
                            <Tag color={assinatura.status === "assinado" ? "success" : "warning"}>
                              {assinatura.status === "assinado" ? "Assinado" : "Pendente"}
                            </Tag>
                          </Space>
                        </div>
                      ))}
                    </Space>
                  </Card>
                ) : (
                  <Empty
                    description="Nenhum termo gerado para este lote"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  >
                    <Button type="primary" onClick={handleGerarTermo}>
                      Gerar Termo
                    </Button>
                  </Empty>
                )}
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </AppLayout>
  );
}
