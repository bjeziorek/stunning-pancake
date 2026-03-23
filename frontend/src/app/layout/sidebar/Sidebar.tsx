import { Flex } from "@radix-ui/themes";
import { Brain, FlaskConical, Home, Puzzle, HeartPlus } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { SidebarNavItem } from "./SideBarNavItem";

interface SidebarProps {
  isAnimating: boolean;
}

export default function Sidebar({ isAnimating }: SidebarProps) {

  const { t } = useTranslation();

  return (
    <motion.aside
      className="
    w-64 flex flex-col
    bg-[var(--color-panel)]
    text-[var(--gray-12)]
    border-r border-[var(--gray-6)]
  
  "
      animate={{ opacity: isAnimating ? 0 : 1 }}
      transition={{ duration: 0.25 }}
    >
      <aside className="hidden md:flex flex-col w-64 gap-2 px-4">
        <Flex direction="column" gap="2">
          <div className="p-4 font-bold text-xl">ML Dashboard</div>


         <SidebarNavItem
        to="/"
        label={t("dashboard.title")}
        icon={<Home size={18} />}
      />

      <SidebarNavItem
        to="/health"
        label={t("sidebar.health")}
        icon={<HeartPlus size={18} />}
      />

      <SidebarNavItem
        to="/models"
        label={t("sidebar.models")}
        icon={<Brain size={18} />}
      />

      <SidebarNavItem
        to="/nn"
        label={t("sidebar.nn")}
        icon={<Brain size={18} />}
      />

      <SidebarNavItem
        to="/sandbox"
        label={t("sidebar.sandbox")}
        icon={<Puzzle size={18} />}
      />

      <SidebarNavItem
        to="/sandbox2"
        label={`${t("sidebar.sandbox")} 2`}
        icon={<FlaskConical size={18} />}
      />

        </Flex>
      </aside>
    </motion.aside>
  );
}
