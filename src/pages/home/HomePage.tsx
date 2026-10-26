import { PageHeader } from "@/components/PageHeader";
import { useAuthContext } from "@/context/useAuthContext";
import { ADMIN_ROLE, SUPERVISOR_ROLE } from "@/constants/roles";
import { FEATURES } from "@/constants/features";
import { hasAnyRole } from "@/utils/auth";
import { AdminDashboard } from "./admin/AdminDashboard";
import { MemberDashboard } from "./member/MemberDashboard";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
};

export const HomePage = () => {
  const { profile } = useAuthContext();
  const isManager = hasAnyRole(profile, [ADMIN_ROLE, SUPERVISOR_ROLE]);
  const firstName = profile?.person?.displayName.split(" ")[0];

  return (
    <section className="flex h-full min-h-0 flex-col gap-3">
      <PageHeader
        title={firstName ? `${getGreeting()}, ${firstName}` : getGreeting()}
        text={
          isManager
            ? FEATURES.loans
              ? "Resumen general de préstamos, inventario y usuarios."
              : "Resumen general del inventario y los usuarios."
            : "Revisa tus préstamos y solicitudes."
        }
      />

      <div className="-mx-2 min-h-0 flex-1 overflow-y-auto px-2 pb-1 lg:overflow-hidden">
        {isManager ? <AdminDashboard /> : <MemberDashboard />}
      </div>
    </section>
  );
};
