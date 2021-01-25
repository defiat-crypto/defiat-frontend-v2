import { Button, InputAdornment, TextField, Typography, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { Flex } from '../../../../components/Flex'
import { Modal, ModalProps } from '../../../../components/Modal'
import { BigNumber } from '../../../../defiat'
import { usePool } from '../../../../hooks/usePool'
import { getDisplayBalance, getFullDisplayBalance } from '../../../../utils'

export const SanctuaryPoolModal: React.FC<ModalProps> = ({ 
  isOpen,
  onDismiss 
}) => {
  const theme = useTheme()
  const {data, deposit, withdraw} = usePool()

  const [depositInput, setDepositInput] = useState<string>()
  const [withdrawInput, setWithdrawInput] = useState<string>()

  return (
    <Modal isOpen={!!isOpen} onDismiss={onDismiss} title="Stake / Unstake 2ND/ETH UNI-V2 LP">
      <Flex mb={2} column>
        <Flex align="flex-end" justify='space-between' mb={1}>
          <Typography variant="h5">
            Wallet Balance
          </Typography>
          <Flex align="flex-end">
            <Typography variant="h5" align="right"><b>{data ? getDisplayBalance(data.tokenBalance) : '0.00'}</b></Typography>
            <Typography variant="body1" align="right">&nbsp;2ND/ETH</Typography>
          </Flex>
        </Flex>
        <TextField 
          value={depositInput}
          onChange={(e) => setDepositInput(e.target.value)}
          type="number"
          placeholder="Stake 2ND/ETH UNI-V2"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={() => setDepositInput(getFullDisplayBalance(data.tokenBalance))}
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
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={() => deposit(depositInput)}
            disabled={!data || data.tokenBalance.eq(0) || !depositInput || new BigNumber(depositInput).eq(0)}
          >
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
            <Typography variant="h5" align="right"><b>{data ? getDisplayBalance(data.stakedBalance): '0.00'}</b></Typography>
            <Typography variant="body1" align="right">&nbsp;2ND/ETH</Typography>
          </Flex>
        </Flex>
        <TextField 
          value={withdrawInput}
          onChange={(e) => setWithdrawInput(e.target.value)}
          type="number"
          placeholder="Unstake 2ND/ETH UNI-V2"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={() => setWithdrawInput(getFullDisplayBalance(data.stakedBalance))}
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
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={() => withdraw(withdrawInput)}
            disabled={!data || data.stakedBalance.eq(0) || !withdrawInput || new BigNumber(withdrawInput).eq(0)}
          >
            Unstake 2ND/ETH UNI-V2
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}
