import { Typography } from "antd";

export const PageHeader = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <div className="shrink-0">
      <Typography.Title level={2} style={{ marginTop: 8, marginBottom: 0 }}>
        {title}
      </Typography.Title>
      <Typography.Text type="secondary">{text}</Typography.Text>
    </div>
  );
};
