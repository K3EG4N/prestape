import { Line } from "@ant-design/plots";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DASHBOARD_COLORS, MOCK_LOAN_TREND } from "@/constants/dashboard";

export const LoanTrendChart = () => {
  return (
    <DashboardCard title="Préstamos y devoluciones" className="lg:col-span-4">
      <div className="h-60 lg:h-full">
        <Line
          data={MOCK_LOAN_TREND}
          xField="week"
          yField="value"
          colorField="type"
          shapeField="smooth"
          autoFit
          scale={{
            color: {
              range: [DASHBOARD_COLORS.primary, DASHBOARD_COLORS.secondary],
            },
          }}
          style={{ lineWidth: 2 }}
          axis={{
            x: { title: false },
            y: { title: false, gridLineDash: [4, 4] },
          }}
          legend={{
            color: { position: "top", layout: { justifyContent: "flex-end" } },
          }}
          interaction={{ tooltip: { marker: true } }}
        />
      </div>
    </DashboardCard>
  );
};
