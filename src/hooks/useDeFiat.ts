import { useContext } from "react";
import { DeFiatContext } from "../contexts/DeFiat";

export const useDeFiat = () => {
  const { dft } = useContext(DeFiatContext);

  return dft;
};
