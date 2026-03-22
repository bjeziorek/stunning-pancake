
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { Languages, Palette } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";


interface TopbarProps {
  onLanguageChange: () => void;
  isAnimating: boolean;
}

export default function Topbar({ onLanguageChange, isAnimating }: TopbarProps) {



  const { t, i18n } = useTranslation();
  const [showThemeInfo, setShowThemeInfo] = useState(false);


  const handleClick = () => {
    onLanguageChange(); // <-- NIE zmieniamy języka tutaj
  };

  // const toggleLanguage = () => {
  //   i18n.changeLanguage(i18n.language === "pl" ? "en" : "pl");
  // };

  return (
    <motion.header
     className="
    h-14 flex items-center justify-between px-4
    bg-[var(--color-panel)]
    text-[var(--gray-12)]
    border-b border-[var(--gray-6)]
  "
      animate={{ opacity: isAnimating ? 0 : 1 }}
      transition={{ duration: 0.25 }}
    >
      <header >
      
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost">
             <Languages/> {i18n.language.toUpperCase()}
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            side="bottom"
            align="end"
            className="rounded-md bg-white dark:bg-gray-800 shadow-lg p-2"
          >
            <DropdownMenu.Item asChild>

              <motion.button
                onClick={handleClick}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                {t("topbar.switch")}
              </motion.button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        
      </header>
      <button
        onClick={() => setShowThemeInfo(true)}
        className="p-2 rounded hover:bg-[var(--gray-4)]"
      >
        <Palette size={18} />
      </button>
      {showThemeInfo && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={() => setShowThemeInfo(false)}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-[var(--color-panel)] text-[var(--gray-12)] border border-[var(--gray-6)] rounded-lg p-6 shadow-xl max-w-sm w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-semibold mb-3">
        Zmiana motywu
      </h2>

      <p className="text-[var(--gray-11)] mb-4 leading-relaxed">
        Panel ustawień motywu Radix Themes otwiera się skrótem klawiaturowym
        <span className="font-bold text-[var(--accent-11)]"> T </span>.
      </p>

      <button
        onClick={() => setShowThemeInfo(false)}
        className="mt-2 px-4 py-2 rounded bg-[var(--accent-9)] text-white hover:bg-[var(--accent-10)]"
      >
        OK
      </button>
    </motion.div>
  </motion.div>
)}

    </motion.header>
  );
}
