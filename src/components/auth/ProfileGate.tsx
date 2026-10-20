import { Button, Result, Spin } from "antd";
import { useAuthContext } from "@/context/useAuthContext";
import type { IProfileGateProps } from "@/interfaces/IRoute";

export const ProfileGate = ({ children }: IProfileGateProps) => {
  const { loadingProfile, profileError, refreshProfile, signOut } =
    useAuthContext();

  if (loadingProfile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Result
          status="500"
          title="No pudimos cargar tu cuenta"
          subTitle="Revisa tu conexión e inténtalo nuevamente."
          extra={[
            <Button key="retry" type="primary" onClick={() => refreshProfile()}>
              Reintentar
            </Button>,
            <Button key="logout" onClick={signOut}>
              Cerrar sesión
            </Button>,
          ]}
        />
      </div>
    );
  }

  return children;
};
