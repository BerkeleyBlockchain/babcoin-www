import { useEffect } from 'react'

import { Box, Flex, Stack } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import useDatabase from 'contexts/database/useDatabase'
import EventRow from './components/EventRow'

const Home = () => {
  const { events, onFetchAttendedEvents } = useDatabase()

  useEffect(() => {
    onFetchAttendedEvents()
  }, [onFetchAttendedEvents])

  return (
    <>
      <Flex
        flexDirection="column"
        left="16px"
        position="absolute"
        right="16px"
        top="84px"
        minHeight="calc(100vh - 84px)"
      >
        <Flex
          flexDirection="column"
          height="calc(100vh - 84px - 92px - 16px)"
          width="100%"
          overflow="auto"
          justifyContent="space-between"
        >
          <Stack gap="12px">
            {Object.values(events).map((event, id) => (
              <EventRow
                location="SCET"
                name={event['name']}
                timestamp={event.startTimestamp}
                id={event._id}
                key={id}
              />
            ))}
          </Stack>
        </Flex>
      </Flex>
      <Box
        width="100%"
        mx="auto"
        style={{ position: 'fixed', bottom: 'env(safe-area-inset-bottom)' }}
      >
        <Stack alignItems="center" gap="6px">
          <Stack alignItems="center" direction="row">
            <ConnectButton accountStatus="address" showBalance />
            {/* <Icon as={jwt ? FiCheckCircle : FiAlertCircle} /> */}
          </Stack>
          {/* <Stack
            alignItems="center"
            direction="row"
            gap="2px"
            _hover={{ opacity: 0.7 }}
          >
            <Text as="span" size="sm">
              What's B@BCoin?
            </Text>
            <Icon as={FiChevronDown} />
          </Stack> */}
          <Box height="0" />
        </Stack>
      </Box>
    </>
  )
}

export default Home
