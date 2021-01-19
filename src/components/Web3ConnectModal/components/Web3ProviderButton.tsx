import { Button, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../Flex'

interface Web3ProviderButtonProps {
  image: string,
  providerName: string,
  onClick: () => void
}

export const Web3ProviderButton: React.FC<Web3ProviderButtonProps> = ({
  image,
  providerName,
  onClick
}) => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Flex>
      <Button
        variant="outlined"
        onClick={onClick}
        fullWidth
      >
        <Flex center column p={2}>
          <Flex>
            <img src={image} height={mobile ? "24px" : "48px"} width="auto" alt={providerName} />
          </Flex>
          <Flex mt={1}>
            <Typography variant="body1" align="center">
              {/* <b> */}
                {providerName}
              {/* </b> */}
            </Typography>
          </Flex>
        </Flex>
        {/* <Flex center>
          <Box mr={1}>
            <img src={image} height="24px" alt={providerName} />
          </Box>
          <Box>
            {providerName}
          </Box>
        </Flex> */}
      </Button>
    </Flex>
  )
}
