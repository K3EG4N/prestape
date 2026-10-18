import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link, useMatches, type UIMatch } from "react-router-dom";
import type { IRouteHandle } from "@/interfaces/IRoute";

export const AppBreadcrumb = () => {
  const matches = useMatches() as UIMatch<unknown, IRouteHandle | undefined>[];
  const crumbs = matches.filter((m) => m.handle?.breadcrumb);
  const isHome = crumbs.length === 0;

  const items = [
    {
      key: "/",
      title: isHome ? (
        <HomeOutlined className="text-stone-900!" />
      ) : (
        <Link to="/" aria-label="Inicio">
          <HomeOutlined />
        </Link>
      ),
    },
    ...crumbs.map((match, index) => {
      const { breadcrumb } = match.handle!;
      const label =
        typeof breadcrumb === "function" ? breadcrumb(match.params) : breadcrumb;
      const isCurrent = index === crumbs.length - 1;

      return {
        key: match.id,
        title: isCurrent ? (
          <span aria-current="page" className="font-semibold text-stone-900">
            {label}
          </span>
        ) : (
          <Link to={match.pathname}>{label}</Link>
        ),
      };
    }),
  ];

  return <Breadcrumb items={items} />;
};
