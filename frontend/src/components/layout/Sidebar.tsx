import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isAnimating: boolean;
}

export default function Sidebar({ isAnimating }: SidebarProps) {

 const { t } = useTranslation();

  return (
     <motion.aside
      className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
      animate={{ opacity: isAnimating ? 0 : 1 }}
      transition={{ duration: 0.25 }}
    >
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 font-bold text-xl">ML Dashboard</div>

<NavLink
  to="/"
  className={({ isActive }) =>
    `text-gray-700 dark:text-gray-200 hover:text-blue-500 ${
      isActive ? "font-bold text-blue-600" : ""
    }`
  }
>
   {t("dashboard.title")}
</NavLink>

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

<NavLink
  to="/sandbox2"
  className={({ isActive }) =>
    `text-gray-700 dark:text-gray-200 hover:text-blue-500 ${
      isActive ? "font-bold text-blue-600" : ""
    }`
  }
>
   {t("sidebar.sandbox")} 2
</NavLink>

    </aside>
    </motion.aside>
  );
}
