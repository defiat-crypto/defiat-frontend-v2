import { Typography } from "@material-ui/core";
import { Web3ConnectView } from "../../../components/Web3ConnectView";
import { SanctuaryPoolCard } from "./components/SanctuaryPoolCard";
import { SecondWrapper } from "../SecondWrapper";

export const SecondPool = () => {
  return (
    <Web3ConnectView>
      <SecondWrapper
        children={[
          <SanctuaryPoolCard key={0} />,
          <Typography key={1} variant="body1" align="center">
            * 10% Unstaking Fee, which is added as liquidity to Uniswap
          </Typography>,
        ]}
      />
    </Web3ConnectView>
  );
};
