import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { LaunchRounded } from "@material-ui/icons";
import { Flex } from "components/Flex";
import { ValueCard } from "components/ValueCard";
import addresses from "constants/addresses";
import { useVault } from "hooks/useVault";
import logo192 from "assets/img/logo192.png";
import { useWallet } from "use-wallet";
import { formatAddress, getDisplayBalance, getEtherscanAddress } from "utils";
import { DataGrid, GridCellParams, GridValueFormatterParams } from "@material-ui/data-grid";
import { BigNumber } from "defiat";
import { getEtherscanTransaction } from "utils/address";


const useStyles = makeStyles((theme) => ({
    grid: {
        height: "400px",
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.background.paper
    },
}));


export const VaultSummary = () => {
    const { data } = useVault();
    const { chainId } = useWallet();

    const columns = [
        { field: 'timestamp', headerName: 'Date', flex: 1, sortable: false, filterable: false, },
        {
            field: 'amount', headerName: 'Amount DFT', flex: 1, sortable: false, type: 'number',
            valueFormatter: (params: GridValueFormatterParams) =>
                getDisplayBalance(new BigNumber(params.value.toString()))
        },
        { field: 'direction', headerName: 'Direction', flex: 1, sortable: false },
        { field: 'eventType', headerName: 'Action', flex: 1, sortable: false, },
        {
            field: 'transactionHash', headerName: 'Transaction', flex: 1, sortable: false, filterable: false,
            renderCell: (params: GridCellParams) => (
                <Button
                    href={getEtherscanTransaction(chainId, params.value.toString())}
                    color="primary"
                    target="_blank"
                    style={{ marginLeft: 16 }}
                >
                    <LaunchRounded />
                </Button>
            )
        }
    ];

    const classes = useStyles();

    return (
        <Flex center direction="column">
            <Button
                variant="text"
                color="primary"
                endIcon={<LaunchRounded />}
                href={getEtherscanAddress(chainId, addresses.Vault[chainId])}
                target="_blank"
            >
                {formatAddress(addresses.Vault[chainId])}
            </Button>
            <Box pb={2}>
                <Typography variant="h4" align="center">
                    $<b>{data ? data.totalValueLocked : "0.00"}</b>
                </Typography>
                <Typography variant="subtitle2" align="center">
                    Total Value in the Vault
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <ValueCard
                        value={data ? data.tokenPrice : "0.00"}
                        startSymbol="$"
                        name="DFT Price"
                        icon={logo192}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <ValueCard
                        value={data ? getDisplayBalance(data.bondedRewards) : "0.00"}
                        endSymbol="DFT"
                        name="Bonded Rewards Left"
                        icon={logo192}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <ValueCard
                        value={data ? getDisplayBalance(data.balanceChange) : "0.00"}
                        endSymbol="DFT"
                        name="Vault Balance Change last 24h"
                        icon={logo192}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <ValueCard
                        value={data ? getDisplayBalance(data.pendingRewards) : "0.00"}
                        endSymbol="DFT"
                        name="Total Pending Rewards"
                        icon={logo192}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DataGrid rows={data?.getIncomingRewardsVault ?? []} columns={columns} className={classes.grid} pageSize={50} />
                </Grid>
            </Grid>

        </Flex>
    );
};