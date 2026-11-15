import { PageHeader } from "@/components/PageHeader";
import { useAuthContext } from "@/context/useAuthContext";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
};

export const HomePage = () => {
  const { profile } = useAuthContext();
  const firstName = profile?.person?.displayName.split(" ")[0];

  return (
    <section className="flex h-full min-h-0 flex-col gap-3">
      <PageHeader
        title={firstName ? `${getGreeting()}, ${firstName}` : getGreeting()}
        text="Bienvenido a PrestaPe."
      />
    </section>
  );
};
