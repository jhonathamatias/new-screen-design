import { useState } from "react";
import { Card, Button, Tabs, Table, Tag, Typography } from "antd";
import { UpOutlined, DownOutlined, SwapOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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

  const getStatusTag = (status: string) => {
    switch (status) {
      case "enviado":
      case "assinado":
        return <Tag color="success">{status}</Tag>;
      case "pendente":
        return <Tag color="warning">{status}</Tag>;
      case "erro":
        return <Tag color="error">{status}</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns = [
    {
      title: "Arquivo",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusTag(status),
    },
    {
      title: "Enviado em",
      dataIndex: "enviadoEm",
      key: "enviadoEm",
    },
  ];

  const tabItems = [
    {
      key: "arquivos",
      label: "Arquivos",
      children: (
        <Table
          columns={columns}
          dataSource={arquivos.map((arquivo, index) => ({
            ...arquivo,
            key: index,
          }))}
          pagination={false}
          size="small"
        />
      ),
    },
    {
      key: "termo",
      label: "Termo",
      children: termo ? (
        <div className="border rounded-md p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Text strong className="text-sm">
                Url:
              </Text>
              <a
                href={termo.urlDownload}
                className="text-sm text-blue-500 hover:underline"
              >
                download
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Text strong className="text-sm">
                Status:
              </Text>
              <Text className="text-sm">
                {termo.status === "pendente"
                  ? "pendente assinaturas"
                  : "completo"}
              </Text>
            </div>
          </div>
          <div className="pt-2 border-t">
            <Text strong className="text-sm">
              Assinaturas:
            </Text>
            <div className="mt-2 space-y-1">
              {termo.assinaturas.map((assinatura, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <Text>{assinatura.nome}:</Text>
                  {getStatusTag(assinatura.status)}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-md p-8 text-center text-gray-500">
          <p>Nenhum termo gerado ainda.</p>
          <p className="text-sm mt-1">
            Clique em "Gerar Termo" para criar um novo termo.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Card className="shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Title level={4} style={{ margin: 0 }}>
          Lote {loteNumero}
        </Title>
        <div className="flex items-center gap-2">
          <Button size="small" onClick={onGerarTermo}>
            Gerar Termo
          </Button>
          <Button
            type="text"
            size="small"
            icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Button type="text" size="small" icon={<SwapOutlined />} />
        </div>
      </div>

      {isExpanded && <Tabs defaultActiveKey="arquivos" items={tabItems} />}
    </Card>
  );
}
