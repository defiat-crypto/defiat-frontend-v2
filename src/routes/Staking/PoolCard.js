import React, { useState, useEffect } from 'react'
import { 
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
    Container,
  Collapse
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Uni_Price from 'contracts/Uni_Price.json'
import Uni_V2 from 'contracts/IUniswapV2Pair.json'
import ERC20 from 'contracts/_ERC20.json'

export const PoolCard = ({
  web3,
  accounts,
  network,
  poolMetrics,
  poolLogo,
  poolTitle,
  poolSubtitle,
  poolAddress,
  rewardAddress,
  stakedAddress,
  rewardSymbol,
  stakedSymbol,
  isLiquidityToken,
  isExtendedPool
}) => {
  //console.log(poolMetrics)
  const history = useHistory();
  const [poolApr, setPoolApr] = useState((0).toFixed(2));
  const isPoolOpen = new Date().getTime() > +poolMetrics.startTime * 1000;
  const isPoolClosed = new Date().getTime() > +poolMetrics.closingTime * 1000;

  const totalStaked = (poolMetrics.staked / 1e18).toFixed(2) + " " + stakedSymbol; // make this modular
  const poolOpen = new Date(+poolMetrics.startTime * 1000).toLocaleDateString()
  const poolClose = new Date(+poolMetrics.closingTime * 1000).toLocaleDateString()
 const poolFee = (+poolMetrics.stakingFee / 10).toFixed(2) + "%";

    const [isOpen, setOpen] = useState(false);
    function toggle() {
        setOpen(!isOpen);
        return;
    }

  useEffect(() => {
    const getAPR = async () => {
      const APR =  await apr();
      setPoolApr(APR);
    }
    getAPR();
  }, [poolMetrics])

  const apr = async () => {
    // use the price oracle to figure out the price of each token in eth
    const oracle = new web3.eth.Contract(Uni_Price.abi, network["price"]);
    let stakedInEth = poolMetrics.staked / 1e18;
    let rewardsInEth = poolMetrics.rewards / 1e18;
    if (!isLiquidityToken) {
      // if it is just a token, we can use the uniswap price oracle
      const tokenInfo = await Promise.all([
        oracle.methods.getTokenInfo(stakedAddress).call(),
        oracle.methods.getTokenInfo(rewardAddress).call()
      ]);
      stakedInEth *= (tokenInfo[0].tokensPerETH / 1e18);
      rewardsInEth *= (tokenInfo[1].tokensPerETH / 1e18);
    } else {
      // otherwise we need to do some additional math
      const uni_v2 = new web3.eth.Contract(Uni_V2.abi, stakedAddress);
      const uni_v2_erc = new web3.eth.Contract(ERC20.abi, stakedAddress);

      // get the token addresses and get the UNIV2 total supply
      const tokens = await Promise.all([
        uni_v2.methods.token0().call(),
        uni_v2.methods.token1().call(),
        uni_v2.methods.getReserves().call(),
        uni_v2_erc.methods.totalSupply().call()
      ]);
      
      // change this if we do pair that dont require weth component
      const nonWethIndex = tokens[0] !== network["weth"] ? 0 : 1;
      const wethIndex = tokens[0] === network["weth"] ? 0 : 1;
      const reserves = [tokens[2].reserve0 / 1e18, tokens[2].reserve1 / 1e18];
      const totalSupply = tokens[3] / 1e18;

      // get the price 
      const tokenInfo = await Promise.all([
        oracle.methods.getTokenInfo(tokens[nonWethIndex]).call(),
        oracle.methods.getTokenInfo(rewardAddress).call()
      ]);

      stakedInEth *= (((tokenInfo[0].tokensPerETH / 1e18) * reserves[nonWethIndex]) + reserves[wethIndex]) / totalSupply;
      rewardsInEth *= (tokenInfo[1].tokensPerETH / 1e18);
    }

    

    // calculate time remaining (ms) and convert to hours
    const timeRemainingInHours = ((+poolMetrics.closingTime * 1000) - new Date().getTime()) / 3600000;
    // rewards remaining per hour
    const rewardsPerHour = rewardsInEth / timeRemainingInHours;
    
    // rewards distributed per hour per 1 staked token
    const rewardsPerHourPerToken = rewardsPerHour / stakedInEth;
    // annual simple rate 
    const tokensPerYear = rewardsPerHourPerToken * 24 * 365;
    // convert to percentage
    const rate = tokensPerYear * 100;

    //console.log(poolMetrics, rewardsPerHourPerToken * (rewardsInEth / 2160), rate)
    return rate.toFixed(2);
  }

  const handleLink = () => {
    if (isExtendedPool) {
      history.push(`/dashboard/partners/${poolAddress}`);
    } else {
      history.push(`/dashboard/staking/${poolAddress}`);
    }
  }

  return (
    <>
      <Card className="shadow">
          <CardBody onClick={toggle}  className="anyStakeCard">
          <img className="mb-2 img-fluid" src={poolLogo} alt="" style={{height: 100, width: "auto"}} />
          <CardTitle className="text-primary"><b>{poolTitle}</b></CardTitle>
          <CardSubtitle className="text-tertiary">{poolSubtitle}</CardSubtitle>
          {isPoolClosed && <h3 className="mb-1">Pool is Closed</h3>}
                  <Collapse isOpen={isOpen}><div className="mt-2 mb-2">
            {!isPoolClosed && <DisplayRow title="Total Staked:" value={totalStaked} /> }
            {/* <DisplayRow title="Pool Rewards:" value={totalRewards} /> */}
            
            <DisplayRow title="Pool Opens:" value={poolOpen} />
            <DisplayRow title="Pool Closes:" value={poolClose} />
            
            <DisplayRow title="Entry Fee:" value={poolFee} />
            
                      {!isPoolClosed && <DisplayRow title="APR:" value={poolApr + "%"} />}
                  </div></Collapse>
          <Button 
            className="w-100"
            color="primary" 
            disabled={!isPoolOpen || poolMetrics.rewards === 0}
            onClick={() => handleLink()}
          >
            Go To Pool
          </Button>
        </CardBody>
      </Card>
    </>
  )
}

const DisplayRow = ({
  title,
  value
}) => {
  return (
    <Container className="text-primary">
      <Row>
        <Col className="text-left">{title}</Col>
        <Col className="text-right"><b>{value}</b></Col>
      </Row>
    </Container>
  )
}