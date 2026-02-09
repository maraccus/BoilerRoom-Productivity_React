/// <reference types="vite/client" />

// Lägg till detta blocket för ?react-imports
declare module "*.svg?react" {
  import { FC } from "react";
  const Component: FC<React.SVGProps<SVGSVGElement>>;
  export default Component;
}
