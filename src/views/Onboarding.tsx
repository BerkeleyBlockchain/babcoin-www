import { Box, Button, Center, Flex, Input, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Onboarding = () => {
  return (
    <Flex flexDirection="column" left="16px" position="absolute" right="16px">
      <Box height="44px" />
      <Text fontSize="50px" fontWeight="bold">
        What's your name?
      </Text>
      <Box height="24px" />
      <Input borderColor="#8D9093" placeholder="Name" />
      <Box height="24px" />
      <Center>
        <ConnectButton label="Connect Wallet" />
      </Center>
      <Box height="24px" />
      <Button backgroundColor="white" borderRadius="12px" color="black">
        Next
      </Button>
    </Flex>
  )
}

export default Onboarding
