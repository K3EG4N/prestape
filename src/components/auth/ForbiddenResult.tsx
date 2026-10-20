import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "@/constants/routes";

export const ForbiddenResult = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full items-center justify-center">
      <Result
        status="403"
        title="403"
        subTitle="No tienes permiso para ver esta sección."
        extra={
          <Button type="primary" onClick={() => navigate(HOME_PATH)}>
            Volver al inicio
          </Button>
        }
      />
    </div>
  );
};
