import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { RugToken } from "constants/rugs";
import { BigNumber } from "../../../../defiat";
import { useSecond } from "hooks/useSecond";
import { getDisplayBalance } from "utils";

interface RuggedTokenRowProps {
  token: RugToken;
  onSelect: (id: number) => void;
}

export const RuggedTokenRow: React.FC<RuggedTokenRowProps> = ({
  token,
  onSelect,
}) => {
  const { account } = useWallet();
  const { fetchTokenData } = useSecond();
  const [balance, setBalance] = useState<BigNumber>();

  const getData = useCallback(async () => {
    const data = await fetchTokenData(token.address);

    setBalance(data.tokenBalance);
  }, [token, fetchTokenData]);

  useEffect(() => {
    if (!!token && !!account) {
      getData();
    }
  }, [token, getData, account]);

  return (
    <ListItem button divider onClick={() => onSelect(token.id)}>
      <ListItemText primary={token.symbol} secondary={token.name} />
      <ListItemSecondaryAction>
        <Typography variant="body1" align="right">
          {balance ? getDisplayBalance(balance, token.decimals) : "0.00"}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
