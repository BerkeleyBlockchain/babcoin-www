import { Box, Flex, Progress, Stack, Text } from '@chakra-ui/react'
import NftGallery from './components/NftGallery'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import ProgressBox from './components/ProgressBox'

const Dashboard = () => {
  const address = useAccount().address
  const [attendedEvents, setAttendedEvents] = useState([])
  const [allEvents, setAllEvents] = useState([])

  // Get the events that the user has attended
  useEffect(() => {
    fetch(
      'https://babcoin-backend.herokuapp.com/v1/user/events?address=' + address,
      {
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setAttendedEvents(data)
      })
  }, [address])

  // Get all events that have occurred so far
  useEffect(() => {
    fetch('https://babcoin-backend.herokuapp.com/v1/event/', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data)
      })
  }, [])

  // Takes all the attended events and returns the events that this user has attended
  const attendedEventsNames: string[] = []
  for (let i = 0; i < attendedEvents.length; i++) {
    for (let j = 0; j < allEvents.length; j++) {
      if (attendedEvents[i]['_id'] === allEvents[j]['_id']) {
        attendedEventsNames.push(allEvents[j]['name'])
      }
    }
  }

  return (
    <Flex
      flexDirection="column"
      left="16px"
      position="absolute"
      right="16px"
      sx={
        {
          // 'max-width': '100%',
          // 'overflow-x': 'hidden',
        }
      }
    >
      <Box height="44px" />
      <Text fontSize="50px" fontWeight="bold">
        Membership
      </Text>
      <Stack gap={15}>
        {/* TODO(chris): Verify that this event map is populated (valid events are shown) */}
        {attendedEventsNames.map((event, id) => (
          <div>
            <Text fontSize="sm" mb={2} textAlign="left">
              {event}
            </Text>
            <Progress
              colorScheme="merkleMango"
              value={100}
              borderRadius={7.5}
            />
          </div>
        ))}
      </Stack>
      <Flex flexWrap="wrap" gap="12px">
        {attendedEventsNames.map((event, id) => (
          <ProgressBox current={3} max={10} title={event} />
        ))}
      </Flex>
      <Box height="72px" />
      <Text fontSize="50px" fontWeight="bold">
        Attendance
      </Text>
      <NftGallery />
      {/* <Box height="44px" />
      <Stack
        align="center"
        backgroundColor="black"
        direction={{ base: 'column-reverse', md: 'row' }}
        justify="space-between"
        mb="24px"
      >
        <Text fontSize="sm" color="subtle">
          Made with ❤️ by {'B@B'}
        </Text>
      </Stack> */}
    </Flex>
  )
}

export default Dashboard
