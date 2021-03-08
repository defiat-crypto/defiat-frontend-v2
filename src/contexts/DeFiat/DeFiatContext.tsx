import React from "react";
import DeFiat from "../../defiat";

export interface IDeFiatContext {
  dft?: DeFiat;
}

export const DeFiatContext = React.createContext<IDeFiatContext>({
  dft: undefined,
});
