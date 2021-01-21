import { Box, Typography, IconButton, makeStyles, Divider} from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { Flex } from '../Flex';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    // position: 'absolute',
    // right: theme.spacing(1),
    // top: theme.spacing(1)
    fontSize: '1.5rem',
    marginLeft: theme.spacing(1)
  },
  title: {
    margin: 0,
    padding: 0
  },
  modal: {
    [theme.breakpoints.up('md')]: {
      zIndex: 10000,
    },
  }
}))

export interface ModalProps { //extends DialogProps {
  isOpen?: boolean
  onDismiss?: () => void
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg',
  fullWidth?: boolean
  scroll?: 'paper' | 'body'
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onDismiss,
  title,
  maxWidth,
  fullWidth,
  scroll,
  children,
  // ...props
}) => {
  const classes = useStyles()

  return (
    <Dialog 
      open={!!isOpen} 
      onClose={onDismiss} 
      maxWidth={maxWidth || 'md'} 
      fullWidth={!!fullWidth}
      scroll={scroll || undefined}
      classes={{root:classes.modal}}
      // {...props}
      
    >
      <Box p={2}>
        {!!title && (
          <Flex column>
            <Flex justify="space-between" align="center" m={1} marginBottom={2}>
              <Typography variant="h5" align="left" className={classes.title}><b>{title}</b></Typography>
              <IconButton 
                aria-label="close" 
                onClick={onDismiss} 
                className={classes.closeButton}
              >
                <CloseIcon />
              </IconButton>
            </Flex>
            <Divider />
          </Flex>
        )}
        
        <Box mt={2}>
          {children}
        </Box>
      </Box>
    </Dialog>
  )
}
