"use client";
import React, { PropsWithChildren } from "react";
import Drawer from "./Drawer";
import { usePathname } from "next/navigation";

interface PageLayoutProps extends PropsWithChildren {
  title?: string;
}
const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  ...rest
}: PageLayoutProps) => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/forget-pass" ||
      pathname === "/pass-reset" ? (
        children
      ) : (
        <Drawer {...rest}>{children}</Drawer>
      )}
    </>
  );
};

export default PageLayout;
