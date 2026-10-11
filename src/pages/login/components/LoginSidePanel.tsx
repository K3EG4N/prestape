import { Flex, Typography } from "antd";
import {
  CodeSandboxOutlined,
  ScheduleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

interface Step {
  icon: ReactNode;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: <SearchOutlined />,
    title: "Busca",
    description: "Encuentra el equipo que necesitas.",
  },
  {
    icon: <ScheduleOutlined />,
    title: "Reserva",
    description: "Elige la fecha y el horario de recojo.",
  },
  {
    icon: <CodeSandboxOutlined />,
    title: "Recoge",
    description: "Retíralo en tu laboratorio.",
  },
];

const ICON_SIZE = 56;
const LINE_GAP = 12; // espacio entre el icono y el inicio/fin de la línea
const STEP_INTERVAL = 0.5; // segundos entre cada step
const LINE_DURATION = 0.5;

const animationStyles = `
  @keyframes auth-step-fade {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* La línea se dibuja de izquierda a derecha, del step actual al siguiente */
  @keyframes auth-line-reveal {
    from { opacity: 0; clip-path: inset(0 100% 0 0); }
    to   { opacity: 1; clip-path: inset(0 0 0 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .auth-step, .auth-line {
      animation: none !important;
      opacity: 1 !important;
      clip-path: none !important;
    }
  }
`;

const StepItem = ({
  step,
  index,
  isLast,
}: {
  step: Step;
  index: number;
  isLast: boolean;
}) => (
  <div style={{ position: "relative" }}>
    <Flex
      vertical
      align="center"
      gap={4}
      className="auth-step"
      style={{
        textAlign: "center",
        padding: "0 6px",
        opacity: 0,
        animation: `auth-step-fade 0.6s ease-out ${index * STEP_INTERVAL}s both`,
      }}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          borderRadius: 16,
          fontSize: 22,
          color: "#fff",
          background: "rgba(255,255,255,0.14)",
          border: "1px solid rgba(255,255,255,0.28)",
          marginBottom: 10,
        }}
      >
        {step.icon}
      </Flex>

      <Typography.Text
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: "rgba(255,255,255,0.75)",
        }}
      >
        PASO {index + 1}
      </Typography.Text>
      <Typography.Title
        level={4}
        style={{ margin: 0, color: "#fff", fontWeight: 600 }}
      >
        {step.title}
      </Typography.Title>
      <Typography.Text
        style={{
          fontSize: 13,
          lineHeight: 1.4,
          color: "rgba(255,255,255,0.92)",
        }}
      >
        {step.description}
      </Typography.Text>
    </Flex>

    {!isLast && (
      <div
        aria-hidden
        className="auth-line"
        style={{
          position: "absolute",
          top: ICON_SIZE / 2,
          left: `calc(50% + ${ICON_SIZE / 2 + LINE_GAP}px)`,
          width: `calc(100% - ${ICON_SIZE + LINE_GAP * 2}px)`,
          borderTop: "1.5px dashed rgba(255,255,255,0.55)",
          opacity: 0,
          animation: `auth-line-reveal ${LINE_DURATION}s ease-out ${
            index * STEP_INTERVAL + 0.2
          }s both`,
        }}
      />
    )}
  </div>
);

export const LoginSidePanel = () => {
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
        gap={56}
        style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center" }}>
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
            Escoge el equipo y
            <br />
            recógelo al toque.
          </Typography.Title>
          <Typography.Paragraph
            style={{
              margin: "20px auto 0",
              maxWidth: 440,
              fontSize: 18,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Consulta qué hay disponible, reserva y gestiona tus préstamos del
            laboratorio en un solo lugar.
          </Typography.Paragraph>
        </div>

        {/* 3 columnas iguales: el texto nunca se superpone porque cada uno
            tiene su propia columna y hace wrap dentro de ella */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            alignItems: "start",
          }}
        >
          {STEPS.map((step, i) => (
            <StepItem
              key={step.title}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </Flex>
    </Flex>
  );
};
