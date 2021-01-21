import React from 'react'
import { Card } from '../../../components/Card'
import { Flex } from '../../../components/Flex'
import sanctuary256 from '../../../assets/img/sanctuary256.png'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { Value } from './Value'
import { LaunchRounded } from '@material-ui/icons'
import { useModal } from '../../../hooks/useModal'
import { SanctuaryPoolModal } from './SanctuaryPoolModal'

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.light
  }
}))

export const SanctuaryPoolCard = () => {
  const classes = useStyles()
  const [onPresent] = useModal(<SanctuaryPoolModal />)
  
  return (
    <Card>
      <Flex column>
        <Flex center>
          <img src={sanctuary256} alt='sanctuary' height="96px" />
        </Flex>
        <Typography variant="h5" align="center" color="primary">Rug Sanctuary</Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">Stake 2ND/ETH UNI-V2, Earn 2ND</Typography>
        <Flex column>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Value value={'1000.00'} name='Pending Rewards' endSymbol="2ND" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Value value={'1000.00'} name='Staked Balance' endSymbol="2ND/ETH" />
              </Grid>
            </Grid>
          </Grid>
          <Flex mb={1}>
            <Grid container spacing={1} style={{maxHeight: '100%'}}>
              <Grid item xs={12} md={6}>
                <Button fullWidth variant="contained" onClick={() => {}} color="primary">
                  Claim Rewards
                </Button>
                
              </Grid>
              <Grid item xs={12} md={6}>
                <Button fullWidth variant="contained" onClick={onPresent} className={classes.button}>
                  Stake / Unstake
                </Button>
              </Grid>
            </Grid>
          </Flex>
          <Flex>
            <Button fullWidth variant="contained" endIcon={<LaunchRounded />} onClick={() => {}}>
              Add 2ND/ETH Liquidity
            </Button>
          </Flex>
        </Flex> 
      </Flex>
    </Card>
  )
}
