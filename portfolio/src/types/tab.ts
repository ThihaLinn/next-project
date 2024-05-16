import { ReactNode } from "react";

export interface Tab {
  id: number;
  name: string;
  icon: React.JSX.Element;
  status: boolean;
  link: string;
}
