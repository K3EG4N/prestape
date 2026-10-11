import { Flex, Typography } from "antd";

export const Field = ({
  children,
  label,
  rightlabel,
}: {
  children: React.ReactNode;
  label: string;
  rightlabel?: string | React.ReactNode;
}) => {
  return (
    <Flex vertical gap={4} style={{ width: "100%" }}>
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Typography.Text
          style={{ fontSize: "12px", fontWeight: 500, marginBottom: "3px" }}
        >
          {label}
        </Typography.Text>
        {rightlabel && (
          <Typography.Text
            style={{ fontSize: "12px", fontWeight: 500, marginBottom: "3px" }}
          >
            {rightlabel}
          </Typography.Text>
        )}
      </Flex>
      {children}
    </Flex>
  );
};
