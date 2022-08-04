import { useCallback, useState } from 'react'

import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useNavigate } from 'react-router-dom'

import useDatabase from 'contexts/database/useDatabase'

const Onboarding = () => {
  const { onCreateUser } = useDatabase()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = useCallback(async () => {
    onCreateUser(name, email)
    navigate('/dashboard')
  }, [email, name, navigate, onCreateUser])

  return (
    <Flex
      flexDirection="column"
      left="16px"
      position="absolute"
      right="16px"
      minHeight="calc(100vh - 84px)"
    >
      <Box height="108px" />
      <Text fontSize="50px" fontWeight="bold">
        Welcome aboard!
      </Text>
      <Box height="24px" />
      <Stack spacing="24px">
        <Input
          borderColor="#8D9093"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          borderColor="#8D9093"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Center>
          <ConnectButton label="Connect Wallet" />
        </Center>
      </Stack>
      <Spacer />
      <Button
        backgroundColor="white"
        borderRadius="12px"
        color="black"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Flex>
  )
}

export default Onboarding
