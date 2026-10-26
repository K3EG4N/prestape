import { Card } from "antd";
import { Link } from "react-router-dom";
import type { IDashboardCardProps } from "@/interfaces/IDashboard";

export const DashboardCard = ({
  title,
  linkTo,
  linkLabel = "Ver todas",
  extra,
  footer,
  footerExtra,
  className = "",
  bodyClassName = "",
  children,
}: IDashboardCardProps) => {
  return (
    <Card
      size="small"
      title={title}
      className={`flex flex-col lg:min-h-0 ${className}`}
      extra={extra ?? (linkTo && <Link to={linkTo}>{linkLabel}</Link>)}
      classNames={{ body: "flex min-h-0 flex-1 flex-col" }}
      styles={{ body: { padding: "10px 14px" } }}
    >
      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
      {(footer || footerExtra) && (
        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-1.5">{footer}</div>
          {footerExtra && <div className="text-stone-500">{footerExtra}</div>}
        </div>
      )}
    </Card>
  );
};
