import React from 'react'

export const Modal = () => {
  return (
    <Modal 
      modalClassName="modal-black"
      isOpen={isOpen} 
      size="md"
      toggle={handleToggle} 
    >
      <ModalHeader
        close={<button className="close" onClick={handleToggle}>&times;</button>}
      >
        <span className="text-primary display-4">{stakeAction} {stakingState.stakedSymbol}</span>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-between align-items-center">
          <p>{stakeAction === "Stake" ? "Available Balance:" : "Staked Balance:"}</p>
          <b>{stakeAction === "Stake" ? stakingState.tokenBalance : stakingState.stakedBalance} {stakingState.stakedSymbol}</b>
        </div>
        <Row>
          <Col sm="8">
            <Input
              type="number"
              value={stakeAmountInput}
              onChange={(e) => setStakeAmountInput(e.target.value)}
              placeholder="Enter an amount..."
              disabled={isStaking}
            />
          </Col>
          <Col sm="4">
            <Button 
              className="m-0 w-100" 
              color="primary"
              onClick={() => handleMax()}
              disabled={isStaking}
            >
              MAX
            </Button>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className="pt-2 justify-content-between">
        <Button
          className="m-0 w-100"
          color="info"
          disabled={isStaking || isClaiming || (stakeAction === "Stake" ? shouldDisableButton(web3.utils.fromWei(stakingState.longTokenBalance)) : shouldDisableButton(web3.utils.fromWei(userMetrics.stake)))}
          onClick={stakeAction === "Stake" ? () => stakeToken() : () => unStakeToken()}  
        >
          {stakeAction === "Stake" ? (
            <>
              {isStaking ? "Staking..." : `Stake ${stakingState.stakedSymbol}`}
            </>
          ) : (
            <>
              {isStaking ? "Unstaking..." : `Unstake ${stakingState.stakedSymbol}`}
            </>
          )}&nbsp;
        </Button>
      </ModalFooter>
    </Modal>
  )
}
