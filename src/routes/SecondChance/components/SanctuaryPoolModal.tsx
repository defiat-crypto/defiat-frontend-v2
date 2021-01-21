import { Button, InputAdornment, TextField, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import { useWallet } from 'use-wallet'
import { Flex } from '../../../components/Flex'
import { Modal, ModalProps } from '../../../components/Modal'

export const SanctuaryPoolModal: React.FC<ModalProps> = ({ 
  isOpen,
  onDismiss 
}) => {
  const { account, connect } = useWallet()
  const theme = useTheme()

  return (
    <Modal isOpen={!!isOpen} onDismiss={onDismiss} title="Stake / Unstake 2ND/ETH UNI-V2 LP">
      <Flex mb={2} column>
        <Flex align="flex-end" justify='space-between' mb={1}>
          <Typography variant="h5">
            Wallet Balance
          </Typography>
          <Flex align="flex-end">
            <Typography variant="h5" align="right"><b>1000.00</b></Typography>
            <Typography variant="body1" align="right">&nbsp;2ND/ETH</Typography>
          </Flex>
        </Flex>
        <TextField 
          // value={depositInput}
          // onChange={(e) => setDepositInput(e.target.value)}
          type="number"
          placeholder="Stake 2ND/ETH UNI-V2"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  // onClick={() => handleMax(true)}
                  style={{ padding: 0, backgroundColor: theme.palette.primary.light }}
                  variant="contained"
                >
                  <b>MAX</b>
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <Flex mt={1}>
          <Button variant="contained" color="primary" fullWidth>
            Stake 2ND/ETH UNI-V2
          </Button>
        </Flex>
      </Flex>
      
      <Flex mb={2} column>
        <Flex align="flex-end" justify='space-between' mb={1}>
          <Typography variant="h5">
            Staked Balance
          </Typography>
          <Flex align="flex-end">
            <Typography variant="h5" align="right"><b>1000.00</b></Typography>
            <Typography variant="body1" align="right">&nbsp;2ND/ETH</Typography>
          </Flex>
        </Flex>
        <TextField 
          // value={depositInput}
          // onChange={(e) => setDepositInput(e.target.value)}
          type="number"
          placeholder="Unstake 2ND/ETH UNI-V2"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  // onClick={() => handleMax(true)}
                  style={{ padding: 0, backgroundColor: theme.palette.primary.light }}
                  variant="contained"
                  
                >
                  <b>MAX</b>
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <Flex mt={1}>
          <Button variant="contained" color="primary" fullWidth>
            Unstake 2ND/ETH UNI-V2
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}
