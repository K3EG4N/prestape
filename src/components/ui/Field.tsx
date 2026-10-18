import { Flex, Typography } from "antd";
import type { IFieldProps } from "@/interfaces/IField";

const labelStyle = { fontSize: "12px", fontWeight: 500, marginBottom: "3px" };

export const Field = ({ children, label, rightlabel, required }: IFieldProps) => {
  return (
    <Flex vertical gap={4} style={{ width: "100%" }}>
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Typography.Text style={labelStyle}>
          {label}
          {required && (
            <span
              aria-hidden="true"
              className="ml-0.5 text-(--ant-color-error)"
            >
              *
            </span>
          )}
        </Typography.Text>
        {rightlabel && (
          <Typography.Text style={labelStyle}>{rightlabel}</Typography.Text>
        )}
      </Flex>
      {children}
    </Flex>
  );
};
