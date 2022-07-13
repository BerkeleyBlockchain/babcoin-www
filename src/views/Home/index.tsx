import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FiChevronDown } from 'react-icons/fi'

import EventRow from './components/EventRow'

const Home = () => {
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
          style={
            {
              // background: 'rgba(255, 255, 255, 0.2)',
              // borderRadius: '16px',
              // boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              // backdropFilter: 'blur(5px)',
              // border: '1px solid rgba(255, 255, 255, 0.3)',
            }
          }
        >
          {/* <Box height="0" /> */}
          {/* <Box paddingBottom="24px">
            <Heading fontSize={68}>Pull Up</Heading>
            <Heading fontSize={68}>Right Now</Heading>
          </Box> */}
          <Stack gap="12px">
            <EventRow
              location="SCET"
              name="Clubcesus #1"
              timestamp={1657629000000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
            <EventRow
              location="Osmosis Office"
              name="Rager #6.5"
              timestamp={1657715400000}
            />
          </Stack>
        </Flex>
      </Flex>
      <Box
        width="100%"
        mx="auto"
        style={{ position: 'fixed', bottom: 'env(safe-area-inset-bottom)' }}
      >
        <Stack alignItems="center" gap="6px">
          <ConnectButton accountStatus="address" showBalance />
          <Stack
            alignItems="center"
            direction="row"
            gap="2px"
            _hover={{ opacity: 0.7 }}
          >
            <Text as="span" size="sm">
              What's B@BCoin?
            </Text>
            <Icon as={FiChevronDown} />
          </Stack>
          <Box height="0" />
        </Stack>
      </Box>
    </>
  )
}

export default Home
