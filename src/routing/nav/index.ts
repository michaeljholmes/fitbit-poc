import { ReactNode } from "react";

export interface Route {
  to: string;
  icon: ReactNode;
  text: string;
}

export interface NavBarProps {
  onLinkClick: () => void;
  routes: Route[];
  signOut: () => void;
}

export * from "./MobileNavBar";
