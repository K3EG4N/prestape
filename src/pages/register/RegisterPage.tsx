import { AuthLayout } from "../auth/AuthLayout";
import { RegisterForm } from "./components/RegisterForm";
import { RegisterSidePanel } from "./components/RegisterSidePanel";

export const RegisterPage = () => {
  return (
    <AuthLayout sidePanel={<RegisterSidePanel />}>
      <RegisterForm />
    </AuthLayout>
  );
};
