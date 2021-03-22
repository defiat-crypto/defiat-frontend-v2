import { Box, Button, Typography } from "@material-ui/core";
import { LaunchRounded } from "@material-ui/icons";
import { Flex } from "components/Flex";
import { Header } from "components/Header";
import { Pools } from "constants/pools";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useWallet } from "use-wallet";
import { formatAddress, getEtherscanAddress } from "utils";

export const PoolHeader = () => {
  const { chainId } = useWallet();
  const { pid } = useParams<{ pid: string }>();
  const { logo, name, symbol, address } = Pools[chainId][pid];

  return (
    <Flex center column>
      <Box m={2}>
        <img src={logo} alt={symbol} height="192px" width="auto" />
      </Box>
      <Typography variant="h5" align="center" gutterBottom>
        {symbol}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {name}
      </Typography>
      <Button
        variant="text"
        color="primary"
        endIcon={<LaunchRounded />}
        href={getEtherscanAddress(chainId, address)}
        target="_blank"
      >
        {formatAddress(address)}
      </Button>
    </Flex>
  );
};
