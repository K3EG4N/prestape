import { Button, Flex, Form } from "antd";
import { AuthFormHeader } from "../../auth/AuthFormHeader";
import { FormSelect } from "@/components/form/FormSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerschema, type RegisterSchema } from "@/schemas/register.schema";
import { FormInput } from "@/components/form/FormInput";
import { useNavigate } from "react-router-dom";
import { useRegister } from "@/hooks/auth/useRegister";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { loading, register } = useRegister();
  const { control, handleSubmit, setError, clearErrors } =
    useForm<RegisterSchema>({
      resolver: zodResolver(registerschema),
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      mode: "onTouched",
    });

  const onSubmit = async (data: RegisterSchema) => {
    clearErrors();
    const { error, status } = await register(data);

    if (error) {
      if (status === 409) {
        setError("email", { type: "server", message: error });
        return;
      }

      if (status === 400) {
        setError("password", { type: "server", message: error });
        setError("confirmPassword", { type: "server", message: error });
        return;
      }

      setError("root", { type: "server", message: error });

      return;
    }

    navigate("/");
  };

  return (
    <Form
      style={{ width: 650, flex: "0 0 650px" }}
      requiredMark={false}
      onFinish={handleSubmit(onSubmit, (errors) => console.log("zod:", errors))}
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
          title="Registro de usuario"
          subtitle="Crea tu cuenta para comenzar a usar nuestros servicios."
        />

        <FormSelect
          name="type"
          control={control}
          label="Tipo de usuario"
          options={[
            { label: "Estudiante", value: "student" },
            { label: "Docente", value: "teacher" },
          ]}
        />

        <FormInput
          name="email"
          control={control}
          label="Correo electrónico"
          autoComplete="email"
        />

        <Flex gap={12}>
          <FormInput
            password
            name="password"
            control={control}
            label="Contraseña"
            autoComplete="current-password"
          />
          <FormInput
            password
            name="confirmPassword"
            control={control}
            label="Confirmar contraseña"
            autoComplete="current-password"
          />
        </Flex>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          style={{ width: "100%", fontWeight: "500" }}
          loading={loading}
        >
          Registrar
        </Button>
        <div className="text-sm flex gap-1 justify-center items-center">
          <span className="text-gray-500">¿Ya tienes cuenta?</span>
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
              navigate("/login");
            }}
          >
            Inicia sesión
          </Button>
        </div>
      </Flex>
    </Form>
  );
};
