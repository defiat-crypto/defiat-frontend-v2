import React from 'react'
import { Card } from '../../../components/Card'
import { Flex } from '../../../components/Flex'
import secondBrand from '../../../assets/img/secondBrand1320.png'
import { Button, Grid, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { ArrowDropDownRounded, ForwardRounded, LaunchRounded } from '@material-ui/icons'
import second256 from '../../../assets/img/second256.png'
import rug256 from '../../../assets/img/rug256.png'
import { useModal } from '../../../hooks/useModal'
import { RuggedTokenModal } from './RuggedTokenModal'


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

export const RecyclerCard = () => {
  const classes = useStyles()
  const [onPresent] = useModal(<RuggedTokenModal />)

  return (
    <Card>
      <Flex column>
        <Flex center mb={1}>
          <img src={secondBrand} className={classes.image} alt="second-chance" />
        </Flex>
        <TextField 
          // value={depositInput}
          // onChange={(e) => setDepositInput(e.target.value)}
          type="number"
          // label="Receive 2ND"
          placeholder="Deposit Rugs"
          variant="outlined"
          // margin="dense" 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={rug256} height="48px" width="auto" alt="second-logo" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button endIcon={<ArrowDropDownRounded />} onClick={onPresent}>Select</Button>
              </InputAdornment>
            ),
          }}
          fullWidth 
        />
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
                <Button>See More</Button>
              </Flex>
            </Grid>
          </Grid>
        </Flex>
        <TextField 
          // value={depositInput}
          // onChange={(e) => setDepositInput(e.target.value)}
          type="number"
          // label="Receive 2ND"
          placeholder="Receive 2ND"
          variant="outlined"
          // margin="dense" 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={second256} height="48px" width="auto" alt="second-logo" />
              </InputAdornment>
            ),
          }}
          fullWidth 
        />
        <Flex mt={2} mb={1}>
          <Button fullWidth onClick={() => {}} variant="contained" color="primary">
            Approve
          </Button>
        </Flex>
        <Button fullWidth onClick={() => {}} variant="contained" endIcon={<LaunchRounded />}>
          Trade 2ND
        </Button>
      </Flex>
    </Card>
  )
}
