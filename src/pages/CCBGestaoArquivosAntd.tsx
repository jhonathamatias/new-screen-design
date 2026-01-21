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
  CopyOutlined
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";

const { Title, Text } = Typography;

interface File {
  key: string;
  name: string;
  status: "enviado" | "pendente";
  sentAt: string;
}

interface Signature {
  name: string;
  status: "assinado" | "pendente";
}

interface Term {
  downloadUrl: string;
  status: "pendente" | "completo";
  signatures: Signature[];
}

interface Batch {
  batchNumber: number;
  createdAt: string;
  files: File[];
  term?: Term;
}

interface BDRFile {
  key: string;
  id: number;
  createdAt: string;
  type: string;
  ticket: string;
  totalRecords: number;
  totalValue: string | null;
  returnMessage: string | null;
  status: "concluido" | "concluido_erros" | "enviado" | "pendente";
}

interface TermRecord {
  key: string;
  id: number;
  batchNumber: number;
  createdAt: string;
  downloadUrl: string;
  totalSignatures: number;
  completedSignatures: number;
  status: "pendente" | "completo";
}

// Mock data for demonstration
const afinzBatches: Batch[] = [
  {
    batchNumber: 3,
    createdAt: "20/01/2025",
    files: [
      { key: "1", name: "Cessao", status: "enviado", sentAt: "20/01/2025 9:00" },
      { key: "2", name: "IOF", status: "enviado", sentAt: "20/01/2025 9:30" },
    ],
    term: {
      downloadUrl: "#",
      status: "pendente",
      signatures: [
        { name: "Jhon", status: "assinado" },
        { name: "Borges", status: "pendente" },
      ],
    },
  },
  {
    batchNumber: 2,
    createdAt: "19/01/2025",
    files: [
      { key: "1", name: "Cessao", status: "enviado", sentAt: "20/01/2025 9:00" },
      { key: "2", name: "IOF", status: "enviado", sentAt: "20/01/2025 9:30" },
      { key: "3", name: "Contabilidade", status: "enviado", sentAt: "20/01/2025 10:00" },
    ],
  },
  {
    batchNumber: 1,
    createdAt: "18/01/2025",
    files: [
      { key: "1", name: "Cessao", status: "enviado", sentAt: "19/01/2025 14:00" },
      { key: "2", name: "IOF", status: "pendente", sentAt: "-" },
    ],
  },
];

const termBatches: Batch[] = [
  {
    batchNumber: 3,
    createdAt: "20/01/2025",
    files: [
      { key: "1", name: "Termo_Cessao_v1", status: "enviado", sentAt: "20/01/2025 11:00" },
    ],
    term: {
      downloadUrl: "#",
      status: "completo",
      signatures: [
        { name: "Jhon", status: "assinado" },
        { name: "Borges", status: "assinado" },
      ],
    },
  },
];

// Mock data for BDR tab based on print
const bdrFiles: BDRFile[] = [
  { key: "1", id: 55645, createdAt: "20/01/2026 18:00:17", type: "CCB", ticket: "449ee650-93df-4b2...", totalRecords: 15, totalValue: null, returnMessage: null, status: "concluido" },
  { key: "2", id: 55644, createdAt: "20/01/2026 17:45:10", type: "CCB", ticket: "edef58c7-21f4-4a1...", totalRecords: 11, totalValue: null, returnMessage: null, status: "concluido" },
  { key: "3", id: 55643, createdAt: "20/01/2026 17:30:28", type: "CCB", ticket: "2c38403b-a31e-41b...", totalRecords: 26, totalValue: null, returnMessage: null, status: "concluido_erros" },
  { key: "4", id: 55642, createdAt: "20/01/2026 17:29:24", type: "CCB", ticket: "548f7644-5487-41a...", totalRecords: 23594, totalValue: "R$ 6.815.596,54", returnMessage: null, status: "enviado" },
  { key: "5", id: 55641, createdAt: "20/01/2026 17:15:19", type: "CCB", ticket: "1a0daa41-295e-407...", totalRecords: 21, totalValue: null, returnMessage: null, status: "concluido_erros" },
  { key: "6", id: 55640, createdAt: "20/01/2026 17:00:19", type: "CCB", ticket: "9c0c0161-292f-499...", totalRecords: 20, totalValue: null, returnMessage: null, status: "concluido_erros" },
  { key: "7", id: 55639, createdAt: "20/01/2026 16:45:10", type: "CCB", ticket: "792bf4b9-4f96-4e8...", totalRecords: 20, totalValue: null, returnMessage: null, status: "concluido" },
  { key: "8", id: 55638, createdAt: "20/01/2026 16:30:16", type: "CCB", ticket: "bd99b83e-58a4-4c7...", totalRecords: 38, totalValue: null, returnMessage: null, status: "concluido" },
  { key: "9", id: 55637, createdAt: "20/01/2026 16:15:15", type: "CCB", ticket: "2e061a65-67a2-4d3...", totalRecords: 92, totalValue: null, returnMessage: null, status: "concluido" },
  { key: "10", id: 55636, createdAt: "20/01/2026 16:00:00", type: "CCB", ticket: "a1b2c3d4-5678-90a...", totalRecords: 150, totalValue: "R$ 1.250.000,00", returnMessage: null, status: "concluido" },
];

const bdrBatches: Batch[] = [
  {
    batchNumber: 2,
    createdAt: "18/01/2025",
    files: [
      { key: "1", name: "BDR_Relatorio_Jan", status: "enviado", sentAt: "18/01/2025 16:00" },
      { key: "2", name: "BDR_Anexos", status: "enviado", sentAt: "18/01/2025 16:30" },
    ],
  },
];

// Mock data for Term tab (table of generated terms)
const termRecords: TermRecord[] = [
  { key: "1", id: 1001, batchNumber: 3, createdAt: "20/01/2025 11:30:00", downloadUrl: "#", totalSignatures: 2, completedSignatures: 2, status: "completo" },
  { key: "2", id: 1002, batchNumber: 5, createdAt: "19/01/2025 14:15:00", downloadUrl: "#", totalSignatures: 3, completedSignatures: 1, status: "pendente" },
  { key: "3", id: 1003, batchNumber: 8, createdAt: "18/01/2025 09:45:00", downloadUrl: "#", totalSignatures: 2, completedSignatures: 2, status: "completo" },
  { key: "4", id: 1004, batchNumber: 10, createdAt: "17/01/2025 16:20:00", downloadUrl: "#", totalSignatures: 4, completedSignatures: 0, status: "pendente" },
  { key: "5", id: 1005, batchNumber: 12, createdAt: "16/01/2025 10:00:00", downloadUrl: "#", totalSignatures: 2, completedSignatures: 2, status: "completo" },
  { key: "6", id: 1006, batchNumber: 15, createdAt: "15/01/2025 13:30:00", downloadUrl: "#", totalSignatures: 3, completedSignatures: 3, status: "completo" },
  { key: "7", id: 1007, batchNumber: 18, createdAt: "14/01/2025 08:45:00", downloadUrl: "#", totalSignatures: 2, completedSignatures: 1, status: "pendente" },
  { key: "8", id: 1008, batchNumber: 20, createdAt: "13/01/2025 17:10:00", downloadUrl: "#", totalSignatures: 5, completedSignatures: 5, status: "completo" },
];

dayjs.extend(customParseFormat);

export default function CCBGestaoArquivosAntd() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [activeTab, setActiveTab] = useState("afinz");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bdrCurrentPage, setBdrCurrentPage] = useState(1);
  const [termCurrentPage, setTermCurrentPage] = useState(1);
  const pageSize = 5;
  const bdrPageSize = 10;
  const termPageSize = 10;

  const getCurrentBatches = () => {
    switch (activeTab) {
      case "afinz":
        return afinzBatches;
      case "termo":
        return termBatches;
      case "bdr":
        return bdrBatches;
      default:
        return [];
    }
  };

  const filteredBatches = getCurrentBatches().filter((batch) => {
    if (!selectedDate) return true;
    const batchDate = dayjs(batch.createdAt, "DD/MM/YYYY");
    return batchDate.isSame(selectedDate, "day");
  });

  const filteredBdrFiles = bdrFiles;

  const handleOpenDrawer = (batch: Batch) => {
    setSelectedBatch(batch);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedBatch(null);
  };

  const handleGenerateTerm = () => {
    if (selectedBatch) {
      console.log(`Gerando termo para Lote ${selectedBatch.batchNumber}`);
    }
  };

  const fileColumns: ColumnsType<File> = [
    {
      title: "Arquivo",
      dataIndex: "name",
      key: "name",
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
      dataIndex: "sentAt",
      key: "sentAt",
    },
  ];

  const getStatusTag = (status: BDRFile["status"]) => {
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

  const bdrColumns: ColumnsType<BDRFile> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      width: 80,
    },
    {
      title: "Data de criação",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      width: 140,
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "CCB", value: "CCB" },
      ],
      onFilter: (value, record) => record.type === value,
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
      dataIndex: "totalRecords",
      key: "totalRecords",
      sorter: (a, b) => a.totalRecords - b.totalRecords,
      width: 120,
    },
    {
      title: "Total valor",
      dataIndex: "totalValue",
      key: "totalValue",
      render: (value) => value || "–",
      width: 140,
    },
    {
      title: "Retorno mensagem",
      dataIndex: "returnMessage",
      key: "returnMessage",
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

  const termActionMenuItems: MenuProps["items"] = [
    { key: "1", label: "Ver detalhes" },
    { key: "2", label: "Baixar termo" },
    { key: "3", label: "Reenviar para assinatura" },
  ];

  const termColumns: ColumnsType<TermRecord> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      width: 80,
    },
    {
      title: "Lote",
      dataIndex: "batchNumber",
      key: "batchNumber",
      sorter: (a, b) => a.batchNumber - b.batchNumber,
      width: 80,
    },
    {
      title: "Data de criação",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      width: 160,
    },
    {
      title: "Download",
      dataIndex: "downloadUrl",
      key: "downloadUrl",
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
      key: "signatures",
      render: (_, record) => (
        <span>
          {record.completedSignatures}/{record.totalSignatures}
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
        <Dropdown menu={{ items: termActionMenuItems }} trigger={["click"]}>
          <Button type="text" icon={<SettingOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const filteredTerms = termRecords;

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
        dataSource={filteredBdrFiles}
        pagination={{
          current: bdrCurrentPage,
          pageSize: bdrPageSize,
          total: filteredBdrFiles.length,
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

  const renderTermContent = () => (
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
        columns={termColumns}
        dataSource={filteredTerms}
        pagination={{
          current: termCurrentPage,
          pageSize: termPageSize,
          total: filteredTerms.length,
          onChange: (page) => setTermCurrentPage(page),
          showSizeChanger: false,
          showTotal: (total) => `Total: ${total} termos`,
        }}
        size="middle"
        scroll={{ x: 900 }}
        style={{ backgroundColor: "white", borderRadius: 8 }}
      />
    </div>
  );

  const renderBatchesContent = () => (
    <>
      {/* Batch list as Cards */}
      <div className="grid gap-4">
        {filteredBatches.length > 0 ? (
          filteredBatches
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((batch) => (
            <Card
              key={`${activeTab}-${batch.batchNumber}`}
              hoverable
              onClick={() => handleOpenDrawer(batch)}
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center justify-between">
                <Space>
                  <FolderOpenOutlined style={{ fontSize: 24, color: "hsl(var(--primary))" }} />
                  <div>
                    <Title level={5} style={{ margin: 0 }}>
                      Lote {batch.batchNumber}
                    </Title>
                    <Text type="secondary">
                      {batch.files.length} arquivo(s) • Criado em {batch.createdAt}
                    </Text>
                  </div>
                </Space>
                <Space>
                  {batch.term && (
                    <Tag color={batch.term.status === "completo" ? "success" : "warning"}>
                      Termo: {batch.term.status === "completo" ? "Completo" : "Pendente"}
                    </Tag>
                  )}
                  <Tag color="blue">
                    {batch.files.filter(a => a.status === "enviado").length}/{batch.files.length} enviados
                  </Tag>
                </Space>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <Empty
              description="Nenhum lote cadastrado. Clique em 'Novo Lote' para criar."
            />
          </Card>
        )}
      </div>

      {/* Pagination */}
      {filteredBatches.length > pageSize && (
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            total={filteredBatches.length}
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
        {/* Page Header */}
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

        {/* Tabs and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
              setCurrentPage(1);
              setBdrCurrentPage(1);
              setTermCurrentPage(1);
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

        {/* Content based on active tab */}
        {activeTab === "bdr" && renderBDRContent()}
        {activeTab === "termo" && renderTermContent()}
        {activeTab === "afinz" && renderBatchesContent()}

        {/* Details Drawer */}
        <Drawer
          title={selectedBatch ? `Lote ${selectedBatch.batchNumber}` : "Detalhes do Lote"}
          placement="right"
          size="large"
          onClose={handleCloseDrawer}
          open={drawerOpen}
          extra={
            <Space>
              {selectedBatch && !selectedBatch.term && (
                <Button type="primary" onClick={handleGenerateTerm}>
                  Gerar Termo
                </Button>
              )}
            </Space>
          }
        >
          {selectedBatch && (
            <div className="space-y-6">
              {/* Files */}
              <div>
                <Title level={5}>Arquivos</Title>
                <Table
                  columns={fileColumns}
                  dataSource={selectedBatch.files}
                  pagination={false}
                  size="small"
                />
              </div>

              <Divider />

              {/* Term */}
              <div>
                <Title level={5}>Termo</Title>
                {selectedBatch.term ? (
                  <Card size="small">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Text strong>Status:</Text>
                        <Tag color={selectedBatch.term.status === "completo" ? "success" : "warning"}>
                          {selectedBatch.term.status === "completo" ? "Completo" : "Pendente"}
                        </Tag>
                      </div>
                      <div className="flex items-center gap-2">
                        <Text strong>Download:</Text>
                        <Button 
                          type="link" 
                          icon={<DownloadOutlined />}
                          href={selectedBatch.term.downloadUrl}
                          className="p-0"
                        >
                          Baixar Termo
                        </Button>
                      </div>
                      <Divider style={{ margin: "12px 0" }} />
                      <Title level={5} style={{ fontSize: 14, margin: 0 }}>Assinaturas</Title>
                      {selectedBatch.term.signatures.map((signature) => (
                        <div key={signature.name} className="flex items-center gap-2 py-1">
                          <Text>{signature.name}</Text>
                          <Space>
                            {signature.status === "assinado" ? (
                              <CheckCircleOutlined style={{ color: "#52c41a" }} />
                            ) : (
                              <ClockCircleOutlined style={{ color: "#faad14" }} />
                            )}
                            <Tag color={signature.status === "assinado" ? "success" : "warning"}>
                              {signature.status === "assinado" ? "Assinado" : "Pendente"}
                            </Tag>
                          </Space>
                        </div>
                      ))}
                    </div>
                  </Card>
                ) : (
                  <Empty
                    description="Nenhum termo gerado para este lote"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  >
                    <Button type="primary" onClick={handleGenerateTerm}>
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
