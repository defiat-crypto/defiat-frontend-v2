import { Button, DialogActions, Grid, Typography } from '@material-ui/core'
import { ForwardRounded } from '@material-ui/icons'
import React, { useCallback } from 'react'
import { Modal, ModalProps } from '../Modal'

interface DisclaimerModalProps extends ModalProps {
  onAccept: () => void
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ 
  isOpen,
  onDismiss,
  onAccept
}) => {

  const handleAccept = useCallback(() => {
    onAccept();
    onDismiss();
  }, [onAccept, onDismiss])

  return (
    <Modal isOpen={!!isOpen} onDismiss={onDismiss} fullWidth title="DeFiat Disclaimer" scroll="paper" restrict>
      <Grid container spacing={2} direction='column'>
        <Grid item xs={12}>
          <Typography variant="overline" color="textSecondary" align="center">
            Please read and accept the following Disclaimer to continue to DeFiat.net
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            DeFiat (the “Token”) is a utility token experiment using the ERC20 standard on the Ethereum Blockchain (The “Blockchain").
            The DeFiat website and White Paper (the “WP”) are for illustration only and do not make the Team liable for any of their content. 
            The DeFiat website may evolve over time, including but not limited to, a change of URL, change of content, adding or removing functionalities.
            THERE IS NO GUARANTEE THAT THE UTILITY OF THE TOKENS OR THE PROJECT DESCRIBED IN THE AVAILABLE INFORMATION (AS DEFINED BELOW) WILL BE DELIVERED. 
            REGARDLESS OF THE ACQUISITION METHOD, BY ACQUIRING THE TOKEN YOU ARE AGREEING TO HAVE NO RECOURSE, CLAIM, ACTION, JUDGEMENT OR REMEDY AGAINST 
            THE TEAM IF THE UTILITY OF THE TOKENS OR IF THE PROJECT DESCRIBED IN THE AVAILABLE INFORMATION IS NOT DELIVERED OR REALISED.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            The team (The “Team”) behind the design and deployment of the Token on the Blockchain does not intend to use the token to fundraise
            nor to launch an Initial Coin Offering. Nevertheless, the Token may be available on Decentralized Exchanges (“DEX”) due to the open
            nature of such marketplaces. The Team does not control nor manage any listing on any decentralized exchange (“DEX”). In the event of 
            a listing on a decentralized exchange, the Team shall not be held responsible for any implications on the token price (The “Price”).
            Due to the decentralized nature of DEX, in the event that you purchase Tokens on such DEX your purchase cannot be refunded or exchanged
            by the Team. REGARDLESS OF THE ACQUISITION METHOD, BY ACQUIRING THE TOKEN YOU ARE AGREEING TO HAVE NO RECOURSE, CLAIM, ACTION, JUDGEMENT
            OR REMEDY AGAINST THE TEAM REGARDING ANY EVOLUTIONS OF THE PRICE OR THE AVAILABILITY OF THE TOKENS ON ANY EXCHANGE OR MARKETPLACE. 
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            IF YOU ARE UNCERTAIN AS TO ANYTHING AVAILABLE OR YOU ARE NOT PREPARED TO INCUR FINANCIAL LOSSES, WE STRONGLY URGE YOU NOT TO PURCHASE ANY TOKENS.
            WE RECOMMEND YOU CONSULT LEGAL, FINANCIAL, TAX AND OTHER PROFESSIONAL ADVISORS OR EXPERTS FOR FURTHER GUIDANCE BEFORE PURCHASING AMOUNTS OF THE TOKEN.
          </Typography>
        </Grid>
      </Grid>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={handleAccept} endIcon={<ForwardRounded />}>
          I Understand, Continue to DeFiat.net
        </Button>
      </DialogActions>
    </Modal>
  )
}