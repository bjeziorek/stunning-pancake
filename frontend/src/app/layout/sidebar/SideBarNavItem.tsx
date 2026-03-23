import { NavLink } from "react-router-dom";
import { Flex } from "@radix-ui/themes";
import React from "react";

type SidebarNavItemProps = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  to,
  label,
  icon,
}) => {
  return (
    <NavLink className="w-full" to={to}>
      {({ isActive }) => (
        <Flex
          align="center"
          gap="3"
          className={`
            w-full px-3 py-2 rounded cursor-pointer transition-colors
            ${
              isActive
                ? "bg-[var(--accent-4)] text-[var(--accent-11)]"
                : "text-[var(--gray-11)] hover:bg-[var(--gray-4)]"
            }
          `}
        >
          {icon}
          <p>{label}</p>
        </Flex>
      )}
    </NavLink>
  );
};
