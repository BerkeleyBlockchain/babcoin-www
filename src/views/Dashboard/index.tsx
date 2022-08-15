import { Box, Flex, Progress, Stack, Text } from '@chakra-ui/react'

import useDatabase from 'contexts/database/useDatabase'
import { useCallback } from 'react'
import { useAccount } from 'wagmi'
import NftGallery from './components/NftGallery'
import ProgressBox from './components/ProgressBox'

const Dashboard = () => {
  const { address } = useAccount()
  const { attendedEvents, events } = useDatabase()
  const { allEvents } = useDatabase()

  const { onFetchAllEvents } = useDatabase()
  const handleFetchAllEvents = useCallback(async () => {
    onFetchAllEvents()
  }, [])


  function filterAllEvents(allEvents: string | any[]): Map<string, number> {
    const result = new Map<string, number>()
    for (let i = 0; i < allEvents.length; i++) {
      if (result.has(allEvents[i].type)) {
        let x = result.get(allEvents[i].type)
        if (x) {
          result.set(allEvents[i].type, x + 1)
        }
      } else {
        result.set(allEvents[i].type, 1)
      }
    }
    return result
  }

  const allEventMap: Map<string, number> = filterAllEvents(allEvents)
  const allEventNames = allEventMap.keys
  console.log(allEventNames)

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
      <Flex flexWrap="wrap" gap="12px">
        <ProgressBox current={3} max={10} title="Clubcensus" />
        <ProgressBox current={3} max={5} title="Dept Meetings" />
        <ProgressBox current={12} max={15} title="Socials" />
      </Flex>
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
    </Flex>
  )
}

export default Dashboard
