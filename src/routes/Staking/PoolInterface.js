import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip
} from 'reactstrap'
import { Loading } from 'components/Loading'
import { TooltipMessage } from 'components/TooltipMessage'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import IERC20 from 'contracts/_ERC20.json'
import DeFiat_Farming from 'contracts/DeFiat_Farming_v15.json'
import DeFiat_FarmingExt from 'contracts/DeFiat_EXTFarming_V2.json'
import { MdInfoOutline } from 'react-icons/md'

export const PoolInterface = ({
  accounts,
  web3,
  network,
  isExtendedPool
}) => {
  const { contractId } = useParams();
  const contractAbi = isExtendedPool ? DeFiat_FarmingExt.abi : DeFiat_Farming.abi;
  const networkPools = isExtendedPool ? network.extendedPools : network.pools;
  const poolContent = networkPools.filter((x) => x.poolAddress === contractId)[0];

  const [isLoading, setLoading] = useState(true);
  const [blockNumber, setBlockNumber] = useState(0);
  const [lastTransaction, setLastTransaction] = useState(-1);

  // Inputs
  const [stakeAmountInput, setStakeAmountInput] = useState('');
  const [showApproveButton, setShowApproveButton] = useState(true);
  const [isApproving, setApproving] = useState(false);
  const [isStaking, setStaking] = useState(false);
  const [isClaiming, setClaiming] = useState(false);
  
  // Modal
  const [isOpen, setOpen] = useState(false);
  const [stakeAction, setStakeAction] = useState('');

  // contract items
  const [farmingContract, setFarmingContract] = useState({});
  const [rewardContract, setRewardContract] = useState({});
  const [tokenContract, setTokenContract] = useState({});
  const [userMetrics, setUserMetrics] = useState({})

  const [stakingState, setStakingState] = useState({
    isPoolClosed: false,
    rewardSymbol: "",
    rewardDecimals: 18,
    stakedSymbol: "",
    stakedDecimals: 18,
    longTokenBalance: 0,
    tokenBalance: 0,
    stakedBalance: 0,
    stakingAllowance: 0,
    availableRewards: 0,
    totalPoolRewards: 0,
    totalPoolStaked: 0,
    currentPoolFee: 0,
    myBoost: 0,
  })

  // tooltip
  const [tooltip1Open, setTooltip1Open] = useState(false);
  const [tooltip2Open, setTooltip2Open] = useState(false);

  const toggle1 = () => setTooltip1Open(!tooltip1Open);
  const toggle2 = () => setTooltip2Open(!tooltip2Open);

  useEffect(() => {
    loadData();
    const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
      if (!error) {
        setBlockNumber(result.number);
        loadData();

        return;
      }
  
      console.error(error);
    })

    return () => subscription.unsubscribe();
  }, [])

  const loadData = async () => {
    const farmContract = new web3.eth.Contract(contractAbi, contractId);
    const poolMetrics = await farmContract.methods.poolMetrics().call();
    const tknContract = new web3.eth.Contract(IERC20.abi, poolMetrics.stakedToken);
    const rwdContract = new web3.eth.Contract(IERC20.abi, poolMetrics.rewardToken);
    isLoading && setFarmingContract(farmContract);
    isLoading && setTokenContract(tknContract);
    isLoading && setRewardContract(rwdContract);

    // Implement edge cases for decimal amounts that are different than 18
    // stakedContract.methods.decimals().call(),
    const requests = [
      tknContract.methods.symbol().call(),
      tknContract.methods.decimals().call(),
      rwdContract.methods.symbol().call(),
      rwdContract.methods.decimals().call(),
      tknContract.methods.balanceOf(accounts[0]).call(),
      tknContract.methods.allowance(accounts[0], contractId).call(),
      farmContract.methods.userMetrics(accounts[0]).call(),
      farmContract.methods.myRewards(accounts[0]).call(),
      farmContract.methods.myStake(accounts[0]).call(),
      web3.eth.getBlockNumber()
    ];

    if (isExtendedPool) {
      requests.push(farmContract.methods.viewDftBoost(accounts[0]).call())
    }
    const values = await Promise.all(requests);
    
    const stakedSymbol = values[0];
    const stakedDecimals = values[1];
    const rewardSymbol = values[2];
    const rewardDecimals = values[3];
    const longTokenBalance = values[4];
    const stakingAllowance = values[5];
    const userMetrics = values[6];
    const myRewards = values[7];
    const myStake = values[8];
    const currentBlock = values[9];

    setBlockNumber(currentBlock);
    setUserMetrics(userMetrics);
    setStakingState({
      ...stakingState,
      isPoolClosed: new Date().getTime() > +poolMetrics.closingTime * 1000,
      stakedSymbol,
      stakedDecimals,
      rewardSymbol,
      rewardDecimals,
      stakingAllowance,
      longTokenBalance,
      tokenBalance: parseValue(longTokenBalance, stakedDecimals),
      stakedBalance: parseValue(myStake, stakedDecimals),
      availableRewards: parseValue(myRewards, rewardDecimals),
      totalPoolStaked: parseMinValue(poolMetrics.staked),
      myBoost: !isExtendedPool ? 0 : values[10]
    });

    if (showApproveButton && stakingAllowance > 0) setShowApproveButton(false);
    isLoading && setLoading(false);
  }

  const getBoost = async () => {
    if (farmingContract) {
      const boost = await farmingContract.methods.myBoost(accounts[0]).call()
      return boost;
    }
    return 0
  }

  const parseValue = (value, decimals) => {
    const wei = value / (10**decimals);
    return ((+wei * 100) / 100).toFixed(4);
  }

  const parseMinValue = (value) => {
    const wei = web3.utils.fromWei(value);
    return (Math.floor(+wei * 100) / 100).toFixed(4);
  }

  const approveStaking = async () => {
    setApproving(true);
    const totalSupply = await tokenContract.methods.totalSupply().call();
    tokenContract.methods.approve(contractId, totalSupply).send({from: accounts[0]})
      .then((data) => {
        toast.success(<TooltipMessage title='✅ Success' message={`Successfully approved ${stakingState.stakedSymbol}-${stakingState.rewardSymbol} staking.`} txn={data.transactionHash} />);
        setShowApproveButton(false);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(<TooltipMessage title="⛔️ Error" message="Encountered an error, could not approve staking." />);
      })
      .finally(() => {
        setApproving(false);
      });
  }

  const stakeToken = async () => {
    if (checkAntiSpam()) return;
    setStaking(true);
    //console.log(stakingState.stakedBalance, stakingState.totalPoolStaked)
    if (stakeAction === 'Stake' && stakingState.stakedBalance > (stakingState.totalPoolStaked * 0.20)) {
      toast.warning(<TooltipMessage title="🐳 Whale Alert!" message="Your current stake is >= 20% of the total pool. You may not stake more until your staked balance falls below 20%." />)
      setStaking(false);
      return;
    }
    const tokens = web3.utils.toWei(stakeAmountInput.toString(), 'ether');
    const stakeAmount = web3.utils.toBN(tokens);
    console.log(tokens, stakeAmount)
    farmingContract.methods.stake(stakeAmount).send({from: accounts[0]})
      .then((data) => {
        toast.success(<TooltipMessage title="✅ Success" message={`Successfully staked ${stakeAmountInput} ${stakingState.stakedSymbol}.`} txn={data.transactionHash} />)
        setLastTransaction(data.blockNumber);
      })
      .catch((err) => {
        // console.log(err)
        toast.error(<TooltipMessage title="⛔️ Error" message="Encountered an error, could not stake tokens." />)
      })
      .finally(() => {
        setOpen(false);
        setStakeAmountInput('');
        setStaking(false);
      });
  }

  const unStakeToken = async () => {
    if (checkAntiSpam()) return;
    setStaking(true);
    const tokens = web3.utils.toWei(stakeAmountInput.toString(), 'ether');
    const unstakeAmount = web3.utils.toBN(tokens);
    farmingContract.methods.unStake(unstakeAmount).send({from: accounts[0]})
      .then((data) => {
        //console.log(data)
        toast.success(<TooltipMessage title="✅ Success" message={`Successfully unstaked ${stakeAmountInput} ${stakingState.stakedSymbol}.`} txn={data.transactionHash} />);
        setLastTransaction(data.blockNumber);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(<TooltipMessage title="⛔️ Error" message="Encountered an error, could not unstake tokens." />)
      })
      .finally(() => {
        setOpen(false);
        setStaking(false);
        setStakeAmountInput('');
      });
  }

  // take reward
  const takeRewards = () => {
    if (checkAntiSpam()) return;
    setClaiming(true);
    farmingContract.methods.takeRewards().send({from: accounts[0]})
      .then((data) => {
        toast.success(<TooltipMessage title="✅ Success" message={`Successfully claimed ${stakingState.rewardSymbol} rewards.`} txn={data.transactionHash} />);
        setLastTransaction(data.blockNumber);
      })
      .catch((err) => {
        // console.log(err)
        toast.error(<TooltipMessage title="⛔️ Error" message="Encountered an error, could not claim rewards." />)
      })
      .finally(() => {
        setClaiming(false);
      });
  }

  const checkAntiSpam = () => {
    if (blockNumber === lastTransaction) {
      toast.warn(<TooltipMessage title="🤖 AntiSpam Alert!" message="You just interacted with this pool! Wait 1 block to perform this action and try again." />)
      return true;
    }
    return false;
  }

  const handleStake = () => {
    setStakeAction('Stake');
    setOpen(true);
  }

  const handleUnstake = () => {
    setStakeAction('Unstake');
    setOpen(true);
  }

  const handleMax = () => {
    if (stakeAction === 'Stake') {
      setStakeAmountInput(web3.utils.fromWei(stakingState.longTokenBalance));
    } else {
      setStakeAmountInput(web3.utils.fromWei(userMetrics.stake));
    }
  }

  const handleToggle = () => {
    if (isOpen) {
      setStakeAmountInput('')
    }
    setOpen(!isOpen);
  }

  // determine if the initial amount is within bounds
  const shouldDisableButton = (maxBound) => {
    if (stakeAmountInput.includes('.') && stakeAmountInput.split(".")[1].length > 18) {
      return true
    }
    if (isNaN(stakeAmountInput) || +stakeAmountInput <= 0 || +stakeAmountInput > maxBound) {
      return true;
    }
    return false;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container
          className={isExtendedPool ? "xmm-border-box" : undefined}
        >
          <div className="d-flex justify-content-start" style={{overflow:'hidden'}}>
            <Link to={isExtendedPool ? "/dashboard/partners/" : "/dashboard/staking"}>
              <Button
                className="btn-link"
                color="success"
                size="sm"
              >
                <i className="tim-icons icon-minimal-left" />
              </Button>
              <p className="category text-success d-inline">
                Go Back
              </p>
            </Link>
          </div>

          <div className="p-2 mb-4">
            {isExtendedPool && <img 
                src={require('assets/img/boost-logo.png')}
                className="floating"
                style={{
                  height: "40px",
                  position: "absolute",
                  width: "auto"
                }}
              />
            }
            <img src={poolContent.poolLogo} width="100" height="auto" alt="defiat" />
          </div>
          
          <h1 className="text-primary mb-2">
            {poolContent.poolTitle}
          </h1>
          <p className="text-tertiary mb-2">
            {poolContent.poolSubtitle}
            
          </p>
          {isExtendedPool && (
            <p className="text-secondary mb-2">
              <b>Farming Boost: {stakingState.myBoost}%</b>
            </p>
          )}  
          {/* <div className="d-flex justify-content-center mb-4">
            <Input className="m-0 text-right" onChange={(e) =>{}} value={contractId} style={{width: "330px"}} />
          </div> */}
          

          <Row className="justify-content-center">
            <Col lg="5" className="d-flex">
              <Card className="shadow">
                <CardBody className="text-left">
                  <Tooltip placement="left" isOpen={tooltip1Open} target={`tooltip-1`} toggle={toggle1}>
                    This is the total amount of {stakingState.rewardSymbol} that you have earned through staking.
                  </Tooltip>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-end">
                      <h2 className="mb-0">{stakingState.availableRewards}</h2>
                      <p className='mb-0'>&nbsp;{stakingState.rewardSymbol}</p>
                    </div>
                    <MdInfoOutline className={`text-primary h3 mb-0`} id={`tooltip-1`} />
                  </div>
                  <small className="text-muted">Available Rewards</small>
                  <hr className="line-primary w-100" />
                  <Button 
                    color="info" 
                    className="w-100"
                    onClick={() => takeRewards()}
                    disabled={isClaiming || isStaking || +stakingState.availableRewards === 0}
                  >
                    {isClaiming ? "Claiming Rewards..." : "Claim Rewards"}
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col lg="5" className="d-flex">
              <Card className="shadow">
                <CardBody className="text-left">
                  <Tooltip placement="left" isOpen={tooltip2Open} target={`tooltip-2`} toggle={toggle2}>
                    This is the total amount of {stakingState.stakedSymbol} that you have staked into this pool. You must approve the staking contract before you can stake.
                    Anti-Whale gates are in effect: if you have more than 20% of the total pool, you may not stake more until your % falls below the threshold.
                  </Tooltip>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-end">
                      <h2 className="mb-0">{stakingState.stakedBalance}</h2>
                      <p className='mb-0'>&nbsp;{stakingState.stakedSymbol}</p>
                    </div>
                    <MdInfoOutline className={`text-primary h3 mb-0`} id={`tooltip-2`} />
                  </div>
                  <small className="text-muted">Staked Balance</small>
                  <hr className="line-primary w-100" />
                  {showApproveButton ? (
                    <Button
                      className="w-100"
                      color="info"
                      onClick={() => approveStaking()}
                      disabled={isApproving}
                    >
                      {isApproving ? "Approving..." : `Approve ${stakingState.stakedSymbol} Staking`}
                    </Button>
                  ) : (
                    <Row>
                      {!stakingState.isPoolClosed && (
                        <Col>
                          <Button
                            className="w-100"
                            color="info"
                            onClick={() => handleStake()}
                          >
                            Stake
                          </Button>
                        </Col>
                      )}
                      
                      <Col>
                        <Button
                        className="w-100"
                          color="info"
                          onClick={() => handleUnstake()}
                        >
                          Unstake
                        </Button>
                      </Col>
                    </Row>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button 
              color="primary"
              target="_blank"
              href={poolContent.isLiquidityToken ? `https://app.uniswap.org/#/add/${poolContent.basePool}/ETH` : `https://app.uniswap.org/#/swap?inputCurrency=${poolContent.basePool}`}
            >
              Get {stakingState.stakedSymbol} on Uniswap
            </Button>
          </div>
          {isExtendedPool && (
            <p className="text-tertiary my-2">
              <b>* Farming Boost is a staking multiplier earned by staking in the DFT Dungeon
                 <br/>
                 You can earn up to 200% Boost by staking 100 DFT.
              </b>
            </p>
          )}

          
        </Container>
      )}
    </>
  )
}