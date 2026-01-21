import { AppLayout } from "@/components/layout/AppLayout";
import { Card, Button, Table, Typography, Empty } from "antd";
import { DownloadOutlined, FilterOutlined } from "@ant-design/icons";

const { Title } = Typography;

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

const columns = tableHeaders.map((header) => ({
  title: header,
  dataIndex: header.toLowerCase().replace(/\s+/g, "_"),
  key: header.toLowerCase().replace(/\s+/g, "_"),
}));

export default function Index() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Title level={2} style={{ margin: 0 }}>
            Troca de Titularidade
          </Title>
          <div className="flex items-center gap-3">
            <Button type="primary" icon={<FilterOutlined />}>
              Filtros Avançados
            </Button>
            <Button icon={<DownloadOutlined />}>
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => (
            <Card key={stat.title}>
              <div className="text-center">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">
                  {stat.value}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={[]}
            locale={{
              emptyText: (
                <Empty
                  description="Não há dados"
                  image={<DownloadOutlined style={{ fontSize: 48, color: "#bfbfbf" }} />}
                />
              ),
            }}
            scroll={{ x: "max-content" }}
          />
        </Card>

        {/* Documentos Destino Section */}
        <div className="space-y-4">
          <Title level={4} style={{ margin: 0 }}>
            Documentos destino das trocas{" "}
            <span className="text-gray-500 font-normal">
              (Últimos 6 meses)
            </span>
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {documentosDestino.map((doc, index) => (
              <Card
                key={index}
                title={
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-medium leading-tight flex-1">
                      {doc.title}
                      {doc.count !== null && (
                        <span className="text-gray-500 ml-1">
                          ({doc.count})
                        </span>
                      )}
                    </span>
                    <Button
                      type="link"
                      size="small"
                      icon={<DownloadOutlined />}
                      className="ml-2 shrink-0 p-0"
                    >
                      Exportar
                    </Button>
                  </div>
                }
              >
                <div className="grid grid-cols-2 gap-4">
                  {doc.subItems.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-center">
                      <p className="text-xs text-gray-500">
                        {item.label}
                      </p>
                      <p className="text-2xl font-bold">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
