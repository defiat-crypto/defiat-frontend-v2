import { DeFiat } from "./DeFiat";

export const getDeFiatAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.DefiatAddress;
};

export const getDeFiatLpAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.DefiatLpAddress;
};

export const getPointsAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.PointsAddress;
};

export const getPointsLpAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.PointsLpAddress;
};

export const getSecondAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.SecondAddress;
};

export const getSecondLpAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.SecondLpAddress;
};

export const getTetherAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.TetherAddress;
};

export const getCircleAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.CircleAddress;
};

export const getCircleLpAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.CircleLpAddress;
};

export const getRugSanctuaryAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.RugSanctuaryAddress;
};

export const getAnyStakeAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.AnyStakeAddress;
};

export const getAnyStakeV2Address = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.AnyStakeV2Address;
};

export const getRegulatorAddress = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.RegulatorAddress;
};

export const getVaultV2Address = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.VaultV2Address;
};

export const getDeFiatContract = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.DeFiat;
};

export const getPointsContract = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.Points;
};

export const getGovernanceContract = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.Governance;
};

export const getSecondContract = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.Second;
};

export const getRugSanctuaryContract = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.RugSanctuary;
};

export const getOracle = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.Oracle;
};

export const getAnyStakeContract = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.AnyStake;
};

export const getAnyStakeV2Contract = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.AnyStakeV2;
};

export const getRegulatorContract = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.Regulator;
};

export const getVaultContract = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.Vault;
};

export const getVaultV2Contract = (DeFiat?: DeFiat) => {
  return DeFiat && DeFiat.contracts && DeFiat.contracts.VaultV2;
};
