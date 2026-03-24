import { Outlet } from "react-router-dom";
import Sidebar from "../../../app/layout/sidebar/Sidebar";
import Topbar from "../../../app/layout/Topbar";
import { motion, AnimatePresence } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import i18n from "../../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Dashboard() {

  const { i18n } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextLang, setNextLang] = useState<string | null>(null);

  const handleLanguageChange = () => {
    const newLang = i18n.language === "pl" ? "en" : "pl";
    setNextLang(newLang);
    setIsAnimating(true); // start fade-out
  };

  const handleAnimationComplete = () => {
    if (isAnimating && nextLang) {
      i18n.changeLanguage(nextLang); // zmiana języka dokładnie po fade-out
      setIsAnimating(false);
      setNextLang(null);
    }
  };
  const renderKey = isAnimating ? "fade-out" : i18n.language;
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar (desktop) */}
      <Sidebar isAnimating={isAnimating} />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Topbar
          onLanguageChange={handleLanguageChange}
          isAnimating={isAnimating}
        />

        <main className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={renderKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onAnimationComplete={handleAnimationComplete}
            >
              {!isAnimating && <Outlet />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
