import { Box, Center, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FiChevronDown } from 'react-icons/fi'

import EventRow from './components/EventRow'

const Home = () => {
  return (
    <Flex
      bottom={0}
      flexDirection="column"
      left="36px"
      position="absolute"
      right="16px"
      top="84px"
      minHeight="calc(100vh - 84px)"
    >
      <Flex flexDirection="column" height="100%" justifyContent="space-between">
        <Box height="0" />
        <Box>
          <Box paddingBottom="24px">
            <Heading fontSize={68}>Pull Up</Heading>
            <Heading fontSize={68}>Right Now</Heading>
          </Box>
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
          </Stack>
        </Box>
        <Center>
          <Stack alignItems="center" gap="6px">
            <ConnectButton label="Connect Wallet to Check In" />
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
        </Center>
      </Flex>
    </Flex>
  )
}

export default Home
