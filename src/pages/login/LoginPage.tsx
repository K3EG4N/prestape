import { AuthLayout } from "../auth/AuthLayout";
import { LoginForm } from "./components/LoginForm";
import { LoginSidePanel } from "./components/LoginSidePanel";

export const LoginPage = () => {
  return (
    <AuthLayout sidePanel={<LoginSidePanel />}>
      <LoginForm />
    </AuthLayout>
  );
};
