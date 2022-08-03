import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import useDatabase from 'contexts/database/useDatabase'
import { useNavigate } from 'react-router-dom'

type Props = {
  location: string
  name: string
  id?: string
  timestamp?: number
}

const Event: React.FC<Props> = ({
  location,
  name,
  id = '312',
  timestamp = 1657628971211,
}) => {
  const { onMint } = useDatabase()
  const navigate = useNavigate()

  const date = new Date(timestamp)
  const dateString = `${date.getMonth() + 1}/${date.getDate()}`
  const timeString = `${date.getHours()}:${date.getMinutes()}`
  const pm = date.getHours() >= 12

  return (
    <Flex
      flexDirection="column"
      left="16px"
      position="absolute"
      right="16px"
      minHeight="calc(100vh - 84px)"
    >
      <Button
        colorScheme="gray"
        leftIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        variant="outline"
        width="108px"
      >
        Home
      </Button>
      <Box height="108px" />
      <Stack spacing="12px">
        <Heading size="3xl">Club Census #1</Heading>
        <Text color="#7C7C7C" fontWeight="semibold">
          {`${dateString} | ${timeString} ${pm ? 'pm' : 'am'} | ${location}`}
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sem
          condimentum, tincidunt erat vitae, auctor mauris.
        </Text>
      </Stack>
      <Spacer />

      <Button
        backgroundColor="white"
        borderRadius="12px"
        color="black"
        onClick={() => onMint(id)}
        width="100%"
      >
        Mint
      </Button>
      <Box height="6px" />
    </Flex>
  )
}

export default Event
