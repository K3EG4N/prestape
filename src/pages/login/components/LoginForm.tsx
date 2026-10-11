import { Flex, Form, Button } from "antd";
import { FormInput } from "@/components/form/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/login.schema";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/auth/useLogin";
import { AuthFormHeader } from "../../auth/AuthFormHeader";
import { useNavigate } from "react-router-dom";
import type { ILoginRequest } from "@/interfaces/IAuth";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading } = useLogin();
  const { control, handleSubmit, clearErrors, setError } = useForm<LoginSchema>(
    {
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: "" },
      mode: "onTouched",
    },
  );

  const onSubmit = async (data: ILoginRequest) => {
    clearErrors("root");

    const { error } = await login(data);

    if (error) {
      setError("password", {
        type: "server",
        message: error,
      });

      setError("email", {
        type: "server",
        message: error,
      });
      return;
    }

    navigate("/");
  };

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      onFinish={handleSubmit(onSubmit)}
      style={{ width: 650, flex: "0 0 650px" }}
    >
      <Flex
        vertical
        gap={12}
        style={{
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          padding: "80px",
          height: "100%",
        }}
        justify="center"
      >
        <AuthFormHeader
          title="Iniciar Sesión"
          subtitle="Accede a tu cuenta para continuar con tus operaciones."
        />

        <FormInput
          name="email"
          control={control}
          label="Email"
          autoComplete="email"
        />

        <FormInput
          password
          name="password"
          control={control}
          label="Contraseña"
          autoComplete="current-password"
          rightlabel={
            <Button
              type="link"
              size="small"
              style={{ padding: 0, fontWeight: "500", fontSize: "12px" }}
            >
              ¿Olvidaste tu contraseña?
            </Button>
          }
        />
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          style={{ width: "100%", fontWeight: "500" }}
          loading={loading}
        >
          Ingresar
        </Button>
        <div className="text-sm flex gap-1 justify-center items-center">
          <span className="text-gray-500">¿No tienes cuenta?</span>
          <Button
            type="link"
            style={{
              textDecorationLine: "underline",
              justifyContent: "flex-end",
              padding: 0,
              fontWeight: "500",
              marginBottom: "1px",
            }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Crea tu cuenta
          </Button>
        </div>
      </Flex>
    </Form>
  );
};
