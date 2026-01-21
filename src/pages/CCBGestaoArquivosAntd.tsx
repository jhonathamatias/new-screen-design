import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { 
  Tabs, 
  Button, 
  Card, 
  Table, 
  Tag, 
  Drawer, 
  Space, 
  Typography,
  Divider,
  Empty,
  Pagination,
  Dropdown,
  DatePicker
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { 
  FileTextOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  FilterOutlined,
  CopyOutlined,
  SearchOutlined
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";

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

interface BDRArquivo {
  key: string;
  id: number;
  dataCriacao: string;
  tipo: string;
  ticket: string;
  totalRegistros: number;
  totalValor: string | null;
  retornoMensagem: string | null;
  status: "concluido" | "concluido_erros" | "enviado" | "pendente";
}

interface TermoRegistro {
  key: string;
  id: number;
  loteNumero: number;
  dataCriacao: string;
  urlDownload: string;
  totalAssinaturas: number;
  assinaturasCompletas: number;
  status: "pendente" | "completo";
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

// Dados mockados para a aba BDR baseado no print
const bdrArquivos: BDRArquivo[] = [
  { key: "1", id: 55645, dataCriacao: "20/01/2026 18:00:17", tipo: "CCB", ticket: "449ee650-93df-4b2...", totalRegistros: 15, totalValor: null, retornoMensagem: null, status: "concluido" },
  { key: "2", id: 55644, dataCriacao: "20/01/2026 17:45:10", tipo: "CCB", ticket: "edef58c7-21f4-4a1...", totalRegistros: 11, totalValor: null, retornoMensagem: null, status: "concluido" },
  { key: "3", id: 55643, dataCriacao: "20/01/2026 17:30:28", tipo: "CCB", ticket: "2c38403b-a31e-41b...", totalRegistros: 26, totalValor: null, retornoMensagem: null, status: "concluido_erros" },
  { key: "4", id: 55642, dataCriacao: "20/01/2026 17:29:24", tipo: "CCB", ticket: "548f7644-5487-41a...", totalRegistros: 23594, totalValor: "R$ 6.815.596,54", retornoMensagem: null, status: "enviado" },
  { key: "5", id: 55641, dataCriacao: "20/01/2026 17:15:19", tipo: "CCB", ticket: "1a0daa41-295e-407...", totalRegistros: 21, totalValor: null, retornoMensagem: null, status: "concluido_erros" },
  { key: "6", id: 55640, dataCriacao: "20/01/2026 17:00:19", tipo: "CCB", ticket: "9c0c0161-292f-499...", totalRegistros: 20, totalValor: null, retornoMensagem: null, status: "concluido_erros" },
  { key: "7", id: 55639, dataCriacao: "20/01/2026 16:45:10", tipo: "CCB", ticket: "792bf4b9-4f96-4e8...", totalRegistros: 20, totalValor: null, retornoMensagem: null, status: "concluido" },
  { key: "8", id: 55638, dataCriacao: "20/01/2026 16:30:16", tipo: "CCB", ticket: "bd99b83e-58a4-4c7...", totalRegistros: 38, totalValor: null, retornoMensagem: null, status: "concluido" },
  { key: "9", id: 55637, dataCriacao: "20/01/2026 16:15:15", tipo: "CCB", ticket: "2e061a65-67a2-4d3...", totalRegistros: 92, totalValor: null, retornoMensagem: null, status: "concluido" },
  { key: "10", id: 55636, dataCriacao: "20/01/2026 16:00:00", tipo: "CCB", ticket: "a1b2c3d4-5678-90a...", totalRegistros: 150, totalValor: "R$ 1.250.000,00", retornoMensagem: null, status: "concluido" },
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

// Dados mockados para a aba Termo (tabela de termos gerados)
const termosRegistros: TermoRegistro[] = [
  { key: "1", id: 1001, loteNumero: 3, dataCriacao: "20/01/2025 11:30:00", urlDownload: "#", totalAssinaturas: 2, assinaturasCompletas: 2, status: "completo" },
  { key: "2", id: 1002, loteNumero: 5, dataCriacao: "19/01/2025 14:15:00", urlDownload: "#", totalAssinaturas: 3, assinaturasCompletas: 1, status: "pendente" },
  { key: "3", id: 1003, loteNumero: 8, dataCriacao: "18/01/2025 09:45:00", urlDownload: "#", totalAssinaturas: 2, assinaturasCompletas: 2, status: "completo" },
  { key: "4", id: 1004, loteNumero: 10, dataCriacao: "17/01/2025 16:20:00", urlDownload: "#", totalAssinaturas: 4, assinaturasCompletas: 0, status: "pendente" },
  { key: "5", id: 1005, loteNumero: 12, dataCriacao: "16/01/2025 10:00:00", urlDownload: "#", totalAssinaturas: 2, assinaturasCompletas: 2, status: "completo" },
  { key: "6", id: 1006, loteNumero: 15, dataCriacao: "15/01/2025 13:30:00", urlDownload: "#", totalAssinaturas: 3, assinaturasCompletas: 3, status: "completo" },
  { key: "7", id: 1007, loteNumero: 18, dataCriacao: "14/01/2025 08:45:00", urlDownload: "#", totalAssinaturas: 2, assinaturasCompletas: 1, status: "pendente" },
  { key: "8", id: 1008, loteNumero: 20, dataCriacao: "13/01/2025 17:10:00", urlDownload: "#", totalAssinaturas: 5, assinaturasCompletas: 5, status: "completo" },
];

dayjs.extend(customParseFormat);

export default function CCBGestaoArquivosAntd() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("afinz");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLote, setSelectedLote] = useState<Lote | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bdrCurrentPage, setBdrCurrentPage] = useState(1);
  const [termoCurrentPage, setTermoCurrentPage] = useState(1);
  const pageSize = 5;
  const bdrPageSize = 10;
  const termoPageSize = 10;

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

  const filteredLotes = getCurrentLotes().filter((lote) => {
    if (!selectedDate) return true;
    const loteDate = dayjs(lote.dataCriacao, "DD/MM/YYYY");
    return loteDate.isSame(selectedDate, "day");
  });

  const filteredBdrArquivos = bdrArquivos.filter((arquivo) =>
    arquivo.id.toString().includes(searchTerm) ||
    arquivo.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    arquivo.ticket.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getStatusTag = (status: BDRArquivo["status"]) => {
    switch (status) {
      case "concluido":
        return <Tag color="success" style={{ borderRadius: 4 }}>Concluído</Tag>;
      case "concluido_erros":
        return <Tag color="error" style={{ borderRadius: 4 }}>Concluído com erros</Tag>;
      case "enviado":
        return <Tag color="warning" style={{ borderRadius: 4 }}>Enviado</Tag>;
      case "pendente":
        return <Tag color="default" style={{ borderRadius: 4 }}>Pendente</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const actionMenuItems: MenuProps["items"] = [
    { key: "1", label: "Ver detalhes" },
    { key: "2", label: "Reprocessar" },
    { key: "3", label: "Baixar arquivo" },
  ];

  const bdrColumns: ColumnsType<BDRArquivo> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      width: 80,
    },
    {
      title: "Data de criação",
      dataIndex: "dataCriacao",
      key: "dataCriacao",
      sorter: true,
      width: 140,
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      filters: [
        { text: "CCB", value: "CCB" },
      ],
      onFilter: (value, record) => record.tipo === value,
      width: 100,
    },
    {
      title: "Ticket",
      dataIndex: "ticket",
      key: "ticket",
      render: (text) => (
        <Space>
          <span>{text}</span>
          <CopyOutlined 
            style={{ color: "hsl(var(--primary))", cursor: "pointer" }} 
            onClick={() => navigator.clipboard.writeText(text)}
          />
        </Space>
      ),
      width: 180,
    },
    {
      title: "Total registros",
      dataIndex: "totalRegistros",
      key: "totalRegistros",
      sorter: (a, b) => a.totalRegistros - b.totalRegistros,
      width: 120,
    },
    {
      title: "Total valor",
      dataIndex: "totalValor",
      key: "totalValor",
      render: (value) => value || "–",
      width: 140,
    },
    {
      title: "Retorno mensagem",
      dataIndex: "retornoMensagem",
      key: "retornoMensagem",
      render: (value) => value || "–",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Concluído", value: "concluido" },
        { text: "Concluído com erros", value: "concluido_erros" },
        { text: "Enviado", value: "enviado" },
        { text: "Pendente", value: "pendente" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => getStatusTag(status),
      width: 160,
    },
    {
      title: "Ações",
      key: "acoes",
      width: 80,
      render: () => (
        <Dropdown menu={{ items: actionMenuItems }} trigger={["click"]}>
          <Button type="text" icon={<SettingOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const termoActionMenuItems: MenuProps["items"] = [
    { key: "1", label: "Ver detalhes" },
    { key: "2", label: "Baixar termo" },
    { key: "3", label: "Reenviar para assinatura" },
  ];

  const termoColumns: ColumnsType<TermoRegistro> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      width: 80,
    },
    {
      title: "Lote",
      dataIndex: "loteNumero",
      key: "loteNumero",
      sorter: (a, b) => a.loteNumero - b.loteNumero,
      width: 80,
    },
    {
      title: "Data de criação",
      dataIndex: "dataCriacao",
      key: "dataCriacao",
      sorter: true,
      width: 160,
    },
    {
      title: "Download",
      dataIndex: "urlDownload",
      key: "urlDownload",
      render: (url) => (
        <Button 
          type="link" 
          icon={<DownloadOutlined />} 
          href={url}
          style={{ padding: 0 }}
        >
          Baixar
        </Button>
      ),
      width: 120,
    },
    {
      title: "Assinaturas",
      key: "assinaturas",
      render: (_, record) => (
        <span>
          {record.assinaturasCompletas}/{record.totalAssinaturas}
        </span>
      ),
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Completo", value: "completo" },
        { text: "Pendente", value: "pendente" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === "completo" ? "success" : "warning"} style={{ borderRadius: 4 }}>
          {status === "completo" ? "Completo" : "Pendente assinaturas"}
        </Tag>
      ),
      width: 160,
    },
    {
      title: "Ações",
      key: "acoes",
      width: 80,
      render: () => (
        <Dropdown menu={{ items: termoActionMenuItems }} trigger={["click"]}>
          <Button type="text" icon={<SettingOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const filteredTermos = termosRegistros.filter((termo) =>
    termo.id.toString().includes(searchTerm) ||
    termo.loteNumero.toString().includes(searchTerm)
  );

  const tabItems = [
    { key: "afinz", label: "Afinz" },
    { key: "termo", label: "Termo" },
    { key: "bdr", label: "BDR" },
  ];

  const renderBDRContent = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Title level={4} style={{ margin: 0 }}>Arquivos</Title>
        <Button 
          icon={<FilterOutlined />}
          style={{ 
            backgroundColor: "hsl(var(--primary))",
            borderColor: "hsl(var(--primary))",
            color: "white"
          }}
        >
          Filtros avançados
        </Button>
      </div>
      <Table
        columns={bdrColumns}
        dataSource={filteredBdrArquivos}
        pagination={{
          current: bdrCurrentPage,
          pageSize: bdrPageSize,
          total: filteredBdrArquivos.length,
          onChange: (page) => setBdrCurrentPage(page),
          showSizeChanger: false,
          showTotal: (total) => `Total: ${total} registros`,
        }}
        size="middle"
        scroll={{ x: 1200 }}
        style={{ backgroundColor: "white", borderRadius: 8 }}
      />
    </div>
  );

  const renderTermoContent = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Title level={4} style={{ margin: 0 }}>Termos Gerados</Title>
        <DatePicker
          placeholder="Filtrar por data"
          format="DD/MM/YYYY"
          style={{ width: 200 }}
          allowClear
        />
      </div>
      <Table
        columns={termoColumns}
        dataSource={filteredTermos}
        pagination={{
          current: termoCurrentPage,
          pageSize: termoPageSize,
          total: filteredTermos.length,
          onChange: (page) => setTermoCurrentPage(page),
          showSizeChanger: false,
          showTotal: (total) => `Total: ${total} termos`,
        }}
        size="middle"
        scroll={{ x: 900 }}
        style={{ backgroundColor: "white", borderRadius: 8 }}
      />
    </div>
  );

  const renderLotesContent = () => (
    <>
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
    </>
  );

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
        </div>

        {/* Tabs e Busca */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
              setCurrentPage(1);
              setBdrCurrentPage(1);
              setTermoCurrentPage(1);
            }}
            items={tabItems}
            style={{ marginBottom: 0 }}
          />

          {activeTab === "afinz" && (
            <DatePicker
              placeholder="Filtrar por data"
              format="DD/MM/YYYY"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              style={{ width: 200 }}
              allowClear
            />
          )}
        </div>

        {/* Conteúdo baseado na aba */}
        {activeTab === "bdr" && renderBDRContent()}
        {activeTab === "termo" && renderTermoContent()}
        {activeTab === "afinz" && renderLotesContent()}

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
