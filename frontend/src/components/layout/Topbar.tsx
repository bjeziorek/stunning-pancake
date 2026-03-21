
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Topbar() {

  const { t, i18n } = useTranslation();

 const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "pl" ? "en" : "pl");
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="font-semibold text-gray-800 dark:text-gray-200">
        {t("dashboard.title")}
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
              {i18n.language.toUpperCase()}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          side="bottom"
          align="end"
          className="rounded-md bg-white dark:bg-gray-800 shadow-lg p-2"
        >
          <DropdownMenu.Item asChild>
            <motion.button
              onClick={() => toggleLanguage()}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              {t("topbar.switch")}
            </motion.button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
  );
}
