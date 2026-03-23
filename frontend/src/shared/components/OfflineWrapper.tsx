import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGatewayPing } from "../../app/hooks/useGatewayPing";

type OfflineWrapperProps = {
    children: React.ReactNode;
};

export const OfflineWrapper: React.FC<OfflineWrapperProps> = ({ children }) => {
    const { online } = useGatewayPing();
  const [visible, setVisible] = useState(!online);
  const [tilt, setTilt] = useState<number>(0);

  // if (!online) {
  //     const randomTilt = (Math.random() * 6 - 3).toFixed(2); // -3° do +3°
  //     setTilt(Number(randomTilt));
  //   }
  
useEffect(() => {
    setVisible(!online);

    if (!online) {
      const randomTilt = Math.random() * 6 - 3; // -3° to +3°
      setTilt(randomTilt);
    }
  }, [online]);

  return (
    <div className="m-10">
    <AnimatePresence>
      {!online && (
        <motion.div
          initial={{ height: 0, opacity: 0, scale: 0.8 }}
          animate={{ height: "auto", opacity: 1, scale: 1, rotate: tilt }}
          exit={{ height: 0, opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className="overflow-hidden"
           style={{ transformOrigin: "top left" }}
        >
          <div className="p-4 border border-dashed border-gray-400 rounded-lg">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
};