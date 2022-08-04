import { Icon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FiHome } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import useDatabase from 'contexts/database/useDatabase'

const Event: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { events, onAttendEvent } = useDatabase()

  if (!id) return null

  const event = events[id]

  const date = new Date(event.startTimestamp)
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
      <Box height="108px" />
      <Stack spacing="12px">
        <Heading size="3xl">{event.name}</Heading>
        <Text color="#7C7C7C" fontWeight="semibold">
          {`${dateString} | ${timeString} ${pm ? 'pm' : 'am'} | ${'Update'}`}
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sem
          condimentum, tincidunt erat vitae, auctor mauris.
        </Text>
      </Stack>
      <Spacer />

      <Flex gap="16px">
        <IconButton
          aria-label=""
          icon={<Icon as={FiHome} />}
          onClick={() => navigate('/')}
        />
        <Button
          backgroundColor="white"
          borderRadius="12px"
          color="black"
          flex={1}
          onClick={() => onAttendEvent(id?.toString())}
        >
          Mint
        </Button>
      </Flex>
      <Box height="16px" />
    </Flex>
  )
}

export default Event
