import { useCallback, useMemo } from 'react'
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
  Spinner,
} from '@chakra-ui/react'
import { FiHome } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import useDatabase from 'contexts/database/useDatabase'
import useUser from 'contexts/user/useUser'

const Event = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { events, attendedEvents, onFetchAttendedEvents } = useDatabase()
  const { onAttendEvent } = useUser()

  const attended = useMemo(() => {
    if (!attendedEvents.length) return
    return (
      attendedEvents.filter((record) => record._id.toString() === id).length > 0
    )
  }, [attendedEvents, id])

  const handleAttendEvent = useCallback(
    (id: string) => {
      onAttendEvent(id)
      onFetchAttendedEvents()
    },
    [onAttendEvent, onFetchAttendedEvents],
  )

  if (!id) return null

  const event = events[id]

  if (!event) {
    if (Object.keys(events).length > 0) {
      navigate('/')
    }
    return <Spinner />
  }

  const date = new Date(event.startTimestamp)
  const dateString = `${date.getMonth() + 1}/${date.getDate()}`
  const timeString = `${
    date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  }:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
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
          {`${dateString} | ${timeString} ${pm ? 'pm' : 'am'} | ${
            event.location ? event.location : null
          }`}
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
          onClick={() => handleAttendEvent(id)}
          isDisabled={attended}
        >
          {!attended ? 'Attend' : 'Already Attended'}
        </Button>
      </Flex>
      <Box height="16px" />
    </Flex>
  )
}

export default Event
