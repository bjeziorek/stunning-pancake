import { Flex } from "@radix-ui/themes";
import { Brain, FlaskConical, Home, Puzzle, HeartPlus } from "lucide-react";
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


          <NavLink className="w-full" to="/">
            {({ isActive }) => (
              <Flex
                align="center"
                gap="3"
                className={`
        w-full px-3 py-2 rounded cursor-pointer
        ${isActive
                    ? "bg-[var(--accent-4)] text-[var(--accent-11)]"
                    : "text-[var(--gray-11)] hover:bg-[var(--gray-4)]"
                  }
      `}
              >
                <Home size={18} />
                <p>{t("dashboard.title")}</p>
              </Flex>
            )}
          </NavLink>

             <NavLink className="w-full" to="/health">
            {({ isActive }) => (
              <Flex
                align="center"
                gap="3"
                className={`
        w-full px-3 py-2 rounded cursor-pointer
        ${isActive
                    ? "bg-[var(--accent-4)] text-[var(--accent-11)]"
                    : "text-[var(--gray-11)] hover:bg-[var(--gray-4)]"
                  }
      `}
              >
                <HeartPlus size={18} />
                <p>{t("sidebar.health")}</p>
              </Flex>
            )}
          </NavLink>

 <NavLink
            to="/models"
          >
            {({ isActive }) => (
              <Flex
                align="center"
                gap="3"
                className={`
        w-full px-3 py-2 rounded cursor-pointer
        ${isActive
                    ? "bg-[var(--accent-4)] text-[var(--accent-11)]"
                    : "text-[var(--gray-11)] hover:bg-[var(--gray-4)]"
                  }
      `}
              >
                <Brain size={18} />
                <p>{t("sidebar.models")}</p>
              </Flex>
            )}
          </NavLink>

          <NavLink
            to="/sandbox"
          >
            {({ isActive }) => (
              <Flex
                align="center"
                gap="3"
                className={`
        w-full px-3 py-2 rounded cursor-pointer
        ${isActive
                    ? "bg-[var(--accent-4)] text-[var(--accent-11)]"
                    : "text-[var(--gray-11)] hover:bg-[var(--gray-4)]"
                  }
      `}
              >
                <Puzzle size={18} />
                <p>{t("sidebar.sandbox")}</p>
              </Flex>
            )}
          </NavLink>


          <NavLink
            to="/sandbox2"
          >
            {({ isActive }) => (
              <Flex
                align="center"
                gap="3"
                className={`
        w-full px-3 py-2 rounded cursor-pointer
        ${isActive
                    ? "bg-[var(--accent-4)] text-[var(--accent-11)]"
                    : "text-[var(--gray-11)] hover:bg-[var(--gray-4)]"
                  }
      `}
              >
                <FlaskConical size={18} />
                <p>{t("sidebar.sandbox")} 2</p>
              </Flex>
            )}
          </NavLink>

        </Flex>
      </aside>
    </motion.aside>
  );
}
