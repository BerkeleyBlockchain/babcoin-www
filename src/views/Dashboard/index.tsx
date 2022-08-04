import { Box, Flex, Progress, Stack, Text } from '@chakra-ui/react'

import useDatabase from 'contexts/database/useDatabase'
import { useAccount } from 'wagmi'
import NftGallery from './components/NftGallery'
import ProgressBox from './components/ProgressBox'

const Dashboard = () => {
  const { address } = useAccount()
  const { attendedEvents, events } = useDatabase()

  const attendedEventsNames: string[] = []
  // for (let i = 0; i < attendedEvents.length; i++) {
  //   for (let j = 0; j < events.length; j++) {
  //     if (attendedEvents[i]['_id'] === events[j]['_id']) {
  //       attendedEventsNames.push(events[j]['name'])
  //     }
  //   }
  // }

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
      <NftGallery
        account={'0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f' || address}
      />
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
