import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button, Flex, Spinner, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { Languages, Palette, Plug, Unplug } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGatewayPing } from "../hooks/useGatewayPing";
import { useGatewayConnection } from "../hooks/useGatewayConnection";


interface TopbarProps {
  onLanguageChange: () => void;
  isAnimating: boolean;
}

export default function Topbar({ onLanguageChange, isAnimating }: TopbarProps) {
  const { online } = useGatewayPing();
  const { enabled, setEnabled } = useGatewayConnection()

  const { t, i18n } = useTranslation();
  const [showThemeInfo, setShowThemeInfo] = useState(false);

  const handleClick = () => {
    onLanguageChange();
  };

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
        <Flex gap="4" align="center" >
          <Button onClick={() => setEnabled(!enabled)} variant="ghost">
            {enabled ? (<Unplug />) : (<Plug />)}
            {enabled ? (<Text>{t('topbar.disconnect')}</Text>) : (<Text>{t('topbar.connect')}</Text>)}
          </Button>

<Flex gap="2" align="center">
          {enabled ? (
            online ? (
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "green" }} />
            ) : (
              <Spinner size="2" />
            )
          ) : (
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "red" }} />
          )}
             {enabled ? (
            online ? (
              <Text>{t("topbar.online")}</Text>
            ) : (
              <Text>{t("topbar.connecting")}</Text>
            )
          ) : (
           <Text>{t("topbar.offline")}</Text>
          )}
          </Flex>
        </Flex>
      </header>

      <Flex gap="4" align="center">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost">
              {i18n.language.toUpperCase()}
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
                {i18n.language.toUpperCase() === "PL" ? "EN" : "PL"}
              </motion.button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Button
        variant="ghost"
          onClick={() => setShowThemeInfo(true)}
          className="p-2 rounded hover:bg-[var(--gray-4)]"
        >
          <Palette size={20} />
        </Button>
      </Flex>

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
