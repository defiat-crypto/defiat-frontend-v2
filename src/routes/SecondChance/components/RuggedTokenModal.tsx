import { Box, Button, InputAdornment, TextField, useTheme } from '@material-ui/core'
import { Cancel, SearchRounded } from '@material-ui/icons'
import React from 'react'
import { Flex } from '../../../components/Flex'
import { Modal, ModalProps } from '../../../components/Modal'
import { RuggedTokenRow } from './RuggedTokenRow'

export const RuggedTokenModal: React.FC<ModalProps> = ({ 
  isOpen,
  onDismiss 
}) => {
  // const { account, connect } = useWallet()
  const theme = useTheme()

  return (
    <Modal isOpen={!!isOpen} onDismiss={onDismiss} title="2ND Rugged Token List" scroll="paper">
      <Flex mb={2} column>
        <TextField
          // value={depositInput}
          // onChange={(e) => setDepositInput(e.target.value)}
          type="text"
          placeholder="Search Rugged Tokens"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Cancel 
                  onClick={() => console.log}
                  style={{ padding: 0, color: theme.palette.grey[600] }}
                />
              </InputAdornment>
            ),
          }}
        />
        <Box mt={2} minHeight="300px">
          <RuggedTokenRow symbol="HOHO" name="SantaDAO" balance="0" />
        </Box>
      </Flex>
    </Modal>
  )
}
