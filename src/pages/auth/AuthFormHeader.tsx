import { Flex, Typography } from "antd";
import logo from "@/assets/prestape-logo.svg";

export const AuthFormHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <Flex vertical gap={8}>
      <div className="my-4 flex justify-start items-center gap-2">
        <img
          src={logo}
          alt="Logo del sistema"
          className="size-10"
          draggable={false}
        />
        <span className="text-2xl font-semibold text-[#1677FF]">Prestape</span>
      </div>
      <div>
        <Typography.Title level={2} style={{ lineHeight: "16px" }}>
          {title}
        </Typography.Title>
        <Typography.Text style={{ fontSize: "15px", color: "#6B7280" }}>
          {subtitle}
        </Typography.Text>
      </div>
    </Flex>
  );
};
