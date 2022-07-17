import { Flex, Box, Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

type Props = {}

const Onboarding = (props: Props) => {
  return (
    <Flex flexDirection="column" left="16px" position="absolute" right="16px">
      <Box height="44px" />
      <Text fontSize="50px" fontWeight="bold">
        What's your name?
      </Text>
      <Input placeholder='Name' />
      <ConnectButton label="Connect Wallet" />
    </Flex>
  )
}

export default Onboarding
