import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGatewayPing } from "../../hooks/useGatewayPing";

type OfflineWrapperProps = {
    children: React.ReactNode;
};

export const OfflineWrapper: React.FC<OfflineWrapperProps> = ({ children }) => {
    const { online } = useGatewayPing();

    // if (online) {
    //     return null;
    // }

  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          initial={{ height: 0, opacity: 0, scale: 0.8 }}
          animate={{ height: "auto", opacity: 1, scale: 1 }}
          exit={{ height: 0, opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className="overflow-hidden"
        >
          <div className="p-4 border border-dashed border-gray-400 rounded-lg">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};