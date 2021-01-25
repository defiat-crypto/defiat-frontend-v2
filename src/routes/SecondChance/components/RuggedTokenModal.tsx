import { Box, InputAdornment, List, TextField, useTheme } from '@material-ui/core'
import { Cancel, SearchRounded } from '@material-ui/icons'
import React, { useCallback, useState } from 'react'
import { useWallet } from 'use-wallet'
import { Flex } from '../../../components/Flex'
import { Modal, ModalProps } from '../../../components/Modal'
import Rugs from '../../../constants/rugs'
import { RuggedTokenRow } from './RuggedTokenRow'

interface RuggedTokenModalProps extends ModalProps {
  onSelect: (id:number) => void;
}

export const RuggedTokenModal: React.FC<RuggedTokenModalProps> = ({ 
  isOpen,
  onDismiss,
  onSelect
}) => {
  const {chainId} = useWallet()
  const [query, setQuery] = useState<string>()
  const theme = useTheme()

  const handleSelect = useCallback((id:number) => {
    onSelect(id)
    onDismiss()
  }, [onSelect, onDismiss])

  return (
    <Modal isOpen={!!isOpen} onDismiss={onDismiss} title="2ND Rugged Token List" scroll="paper">
      <Flex mb={2} column>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
                  onClick={() => setQuery('')}
                  style={{ padding: 0, color: theme.palette.grey[600] }}
                />
              </InputAdornment>
            ),
          }}
        />
        <Box mt={2} maxHeight="300px">
          <List>
          {Rugs.Tokens[chainId].map((token, i) => (
            <RuggedTokenRow key={i} token={token} onSelect={(i) => handleSelect(i)} />
          ))}
          </List>
        </Box>
      </Flex>
    </Modal>
  )
}
