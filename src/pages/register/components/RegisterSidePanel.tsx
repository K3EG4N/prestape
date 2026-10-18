import { Flex, Typography } from "antd";
import {
  AppstoreAddOutlined,
  BellOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  ProfileOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

interface Perk {
  icon: ReactNode;
  title: string;
  description: string;
}

const PERKS: Perk[] = [
  {
    icon: <ClockCircleOutlined />,
    title: "Reserva en minutos",
    description:
      "Elige equipo, fecha y horario desde tu celular o computadora.",
  },
  {
    icon: <AppstoreAddOutlined />,
    title: "Kits completos",
    description: "Pide cámara, trípode y accesorios en una sola solicitud.",
  },
  {
    icon: <ProfileOutlined />,
    title: "Seguimiento",
    description:
      "Revisa el estado de tus solicitudes y préstamos en todo momento.",
  },
  {
    icon: <BellOutlined />,
    title: "Avisos de devolución",
    description: "Recibe un recordatorio antes de que venza tu préstamo.",
  },
];

const BORDER = "1px solid rgba(255,255,255,0.22)";
const FIRST_PERK_DELAY = 0.2;
const PERK_INTERVAL = 0.2;

const animationStyles = `
  @keyframes register-fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .register-fade {
      animation: none !important;
      opacity: 1 !important;
    }
  }
`;

const fadeIn = (delay: number) => ({
  opacity: 0,
  animation: `register-fade-up 0.6s ease-out ${delay}s both`,
});

const PerkItem = ({
  perk,
  index,
  isLast,
}: {
  perk: Perk;
  index: number;
  isLast: boolean;
}) => (
  <Flex
    align="center"
    gap={16}
    className="register-fade"
    style={{
      padding: "16px 0",
      borderTop: BORDER,
      borderBottom: isLast ? BORDER : undefined,
      ...fadeIn(FIRST_PERK_DELAY + index * PERK_INTERVAL),
    }}
  >
    <Flex
      align="center"
      justify="center"
      style={{
        flex: "0 0 48px",
        height: 48,
        borderRadius: 14,
        fontSize: 20,
        color: "#fff",
        background: "rgba(255,255,255,0.14)",
        border: "1px solid rgba(255,255,255,0.28)",
      }}
    >
      {perk.icon}
    </Flex>

    <div style={{ flex: 1, minWidth: 0 }}>
      <Typography.Text
        strong
        style={{
          display: "block",
          marginBottom: 2,
          fontSize: 16,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        {perk.title}
      </Typography.Text>
      <Typography.Text
        style={{
          fontSize: 13.5,
          lineHeight: 1.4,
          color: "rgba(255,255,255,0.88)",
        }}
      >
        {perk.description}
      </Typography.Text>
    </div>

    <Flex
      align="center"
      justify="center"
      style={{
        flex: "none",
        width: 24,
        height: 24,
        borderRadius: "50%",
        fontSize: 11,
        color: "#1677ff",
        background: "#fff",
      }}
    >
      <CheckOutlined />
    </Flex>
  </Flex>
);

export const RegisterSidePanel = () => {
  return (
    <Flex
      vertical
      justify="center"
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        background: "#1677ff",
        padding: "0 66px",
      }}
    >
      <style>{animationStyles}</style>

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -130,
          right: -150,
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -230,
          left: -220,
          width: 440,
          height: 440,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
        }}
      />

      <Flex
        vertical
        gap={34}
        style={{ position: "relative", maxWidth: 520, margin: "0 auto" }}
      >
        <div
          className="register-fade"
          style={{ textAlign: "center", ...fadeIn(0) }}
        >
          <Typography.Title
            level={1}
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            Crea tu cuenta y
            <br />
            pide equipos sin papeleo.
          </Typography.Title>
          <Typography.Paragraph
            style={{
              margin: "18px auto 0",
              maxWidth: 440,
              fontSize: 18,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Un solo acceso para solicitar equipos, seguir tus préstamos y no
            olvidar ninguna devolución.
          </Typography.Paragraph>
        </div>

        <div>
          {PERKS.map((perk, i) => (
            <PerkItem
              key={perk.title}
              perk={perk}
              index={i}
              isLast={i === PERKS.length - 1}
            />
          ))}
        </div>

        <Flex
          align="center"
          justify="center"
          gap={10}
          className="register-fade"
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.88)",
            ...fadeIn(FIRST_PERK_DELAY + PERKS.length * PERK_INTERVAL),
          }}
        >
          <SafetyCertificateOutlined style={{ fontSize: 18 }} />
          <span>
            Usamos tus datos solo para gestionar tus préstamos dentro del
            laboratorio.
          </span>
        </Flex>
      </Flex>
    </Flex>
  );
};
