import { Box, Button, Center, Flex, Input, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom'

const Onboarding = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nextClicked, setNextClicked] = useState(false)
  const { address } = useAccount()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const response = await fetch(
      'https://babcoin-backend.herokuapp.com/v1/user/newUser',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          address: address,
        }),
      },
    )
    const data = await response.json()
    console.log(data)
    navigate('/dashboard')
  }

  return (
    <div>
      {nextClicked ? (
        <Flex
          flexDirection="column"
          left="16px"
          position="absolute"
          right="16px"
        >
          <Box height="44px" />
          <Text fontSize="50px" fontWeight="bold">
            What's your email?
          </Text>
          <Box height="24px" />
          <Input
            borderColor="#8D9093"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Box height="24px" />
          <Center>
            <ConnectButton label="Connect Wallet" />
          </Center>
          <Box height="24px" />
          {/* NOTE: the submit button looks greyed out after clicking next - perhaps the state is saved from the previous click? */}
          <Button
            backgroundColor="white"
            borderRadius="12px"
            color="black"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Flex>
      ) : (
        <Flex
          flexDirection="column"
          left="16px"
          position="absolute"
          right="16px"
        >
          <Box height="44px" />
          <Text fontSize="50px" fontWeight="bold">
            What's your name?
          </Text>
          <Box height="24px" />
          <Input
            borderColor="#8D9093"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Box height="24px" />
          <Center>
            <ConnectButton label="Connect Wallet" />
          </Center>
          <Box height="24px" />
          <Button
            backgroundColor="white"
            borderRadius="12px"
            color="black"
            onClick={() => setNextClicked(true)}
          >
            Next
          </Button>
        </Flex>
      )}
    </div>
  )
}

export default Onboarding
