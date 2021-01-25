import React, { useCallback, useEffect, useState } from 'react'
import { Card } from '../../../components/Card'
import { Flex } from '../../../components/Flex'
import secondBrand from '../../../assets/img/secondBrand1320.png'
import { Button, Collapse, Grid, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { ArrowDropDownRounded, ForwardRounded, LaunchRounded } from '@material-ui/icons'
import second256 from '../../../assets/img/second256.png'
import rug256 from '../../../assets/img/rug256.png'
import { useModal } from '../../../hooks/useModal'
import { RuggedTokenModal } from './RuggedTokenModal'
import Links from '../../../constants/links'
import { useSecond } from '../../../hooks/useSecond'
import Rugs, { RugToken } from '../../../constants/rugs'
import { useWallet } from 'use-wallet'
import { getBalance, getFullDisplayBalance, getTotalSupply } from '../../../utils'
import { provider } from 'web3-core'
import { BigNumber } from '../../../defiat'

const useStyles = makeStyles((theme) => ({
  arrow: {
    transform: 'rotate(90deg)',
    color: theme.palette.primary.dark,
    fontSize: '2rem',
    // marginLeft: 'auto'
  },
  image: {
    height: 'auto',
    [theme.breakpoints.up('lg')]: {
      width: '512px'
    },
    [theme.breakpoints.down('md')]: {
      width: '192px'
    }
  }
}))

interface RecyclerData {
  ruggedBalance:BigNumber;
  ruggedSupply:BigNumber;
  swapRate:BigNumber;
}

export const RecyclerCard = () => {
  const classes = useStyles()
  const {
    account,
    chainId,
    ethereum
  }: {account:string, chainId:number, ethereum:provider} = useWallet()
  const {data, fetchSwapRate} = useSecond()
  const [onPresent] = useModal(<RuggedTokenModal onSelect={(id) => setSelected(Rugs.Tokens[chainId][id])} />)

  const [open, setOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<RugToken>()
  const [recyclerData, setRecyclerData] = useState<RecyclerData>()

  const fetchSwapData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(selected.address, account, ethereum),
      getTotalSupply(selected.address, ethereum)
    ])

    const swapRate = await fetchSwapRate(selected.address, values[0].toString())

    setRecyclerData({
      ruggedBalance: values[0],
      ruggedSupply: values[1],
      swapRate
    })
  }, [account, ethereum, selected, fetchSwapRate])

  useEffect(() => {
    if (!!selected) {
      fetchSwapData()
    }
  }, [selected, fetchSwapData])

  return (
    <Card>
      <Flex column>
        <Flex center mb={1}>
          <img src={secondBrand} className={classes.image} alt="second-chance" />
        </Flex>
        <TextField 
          value={recyclerData ? getFullDisplayBalance(recyclerData.ruggedBalance) : undefined}
          type="number"
          placeholder="Deposit Rugs"
          variant="outlined"
          fullWidth
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={rug256} height="48px" width="auto" alt="second-logo" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button endIcon={<ArrowDropDownRounded />} onClick={onPresent}>
                  {!selected ? "Select" : selected.symbol}
                </Button>
              </InputAdornment>
            ),
          }} 
        />
        <Collapse in={open}>
          {/* <Flex my={1}> */}
            <TextField 
              value={data ? getFullDisplayBalance(data.ethFee) : undefined}
              type="number"
              placeholder="Current Swap Fee (ETH)"
              variant="outlined"
              fullWidth
              disabled
            />
            <TextField 
              value={recyclerData ? getFullDisplayBalance(recyclerData.ruggedSupply, selected.decimals) : undefined}
              type="number"
              placeholder="Rugged Total Supply"
              variant="outlined"
              fullWidth
              disabled
            />
            <TextField 
              value={recyclerData ? getFullDisplayBalance(recyclerData.ruggedBalance.dividedBy(recyclerData.ruggedSupply)) : undefined}
              type="number"
              placeholder="% Total Supply Owned * 100"
              variant="outlined"
              fullWidth
              disabled
            />
            <TextField 
              value={data ? getFullDisplayBalance(data.tokenBalance) : undefined}
              type="number"
              placeholder="DeFiat Multiplier (earned by holding DFT)"
              variant="outlined"
              fullWidth
              disabled
            />
          {/* </Flex> */}
        </Collapse>
        <Flex my={1}>
          <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Flex center>
                <ForwardRounded className={classes.arrow} />
              </Flex>
            </Grid>
            <Grid item xs={4}>
              <Flex justify='flex-end'>
                {!open ? (
                  <Button onClick={() => setOpen(!open)}>See More</Button>
                ) : (
                  <Button onClick={() => setOpen(!open)}>See Less</Button>
                )}
              </Flex>
            </Grid>
          </Grid>
        </Flex>
        <TextField
          fullWidth
          value={recyclerData ? getFullDisplayBalance(recyclerData.swapRate) : undefined}
          // onChange={(e) => setDepositInput(e.target.value)}
          type="number"
          placeholder="Receive 2ND"
          variant="outlined"
          disabled={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={second256} height="48px" width="auto" alt="second-logo" />
              </InputAdornment>
            ),
          }}
        />
        <Flex mt={2} mb={1}>
          {true ? (
            <Button 
              fullWidth
              disabled={!recyclerData || !recyclerData.swapRate || recyclerData.swapRate.eq(0)}
              onClick={() => {}}
              variant="contained"
              color="primary"
            >
              Approve
            </Button>
          ) : (
            <Button 
              fullWidth
              onClick={() => {}}
              variant="contained"
              color="primary">
              Swap for 2ND
            </Button>
          )}
        </Flex>
        <Button 
          fullWidth 
          variant="contained" 
          endIcon={<LaunchRounded />}
          href={Links.uniswapSecond}
        >
          Trade 2ND
        </Button>
      </Flex>
    </Card>
  )
}
