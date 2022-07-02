import { Flex } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit';

type Props = {}



const Home = (props: Props) => {
  return (
    <Flex
      flexDirection="column"
      left="16px"
      position="absolute"
      right="16px"
      top="84px"
    >
      Home
      <ConnectButton />
    </Flex>
  )
}

export default Home
