import { Flex } from "antd";

export const AuthLayout = ({
  children,
  sidePanel,
}: {
  children: React.ReactNode;
  sidePanel: React.ReactNode;
}) => {
  return (
    <Flex
      justify="space-between"
      style={{
        height: "100vh",
      }}
    >
      {children}
      {sidePanel}
    </Flex>
  );
};
