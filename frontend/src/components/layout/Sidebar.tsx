import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

 const { t } = useTranslation();
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 font-bold text-xl">ML Dashboard</div>

<NavLink
  to="/sandbox"
  className={({ isActive }) =>
    `text-gray-700 dark:text-gray-200 hover:text-blue-500 ${
      isActive ? "font-bold text-blue-600" : ""
    }`
  }
>
   {t("sidebar.sandbox")}
</NavLink>

    </aside>
  );
}
