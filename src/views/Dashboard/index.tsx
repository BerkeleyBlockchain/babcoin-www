import { Box, Button, Flex, Progress, Stack, Text } from '@chakra-ui/react'

import NftGallery from './components/NftGallery'
import { useAccount, useContractRead } from 'wagmi'



const Dashboard = () => {
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
      <Button />
      <Stack gap={15}>
        <div>
          <Text fontSize="sm" mb={2} textAlign="left">
            Clubcensus
          </Text>
          <Progress colorScheme="merkleMango" value={80} borderRadius={7.5} />
        </div>
        <div>
          <Text fontSize="sm" mb={2} textAlign="left">
            Clubcensus 2
          </Text>
          <Progress colorScheme="merkleMango" value={50} borderRadius={7.5} />
        </div>
        <div>
          <Text fontSize="sm" mb={2} textAlign="left">
            Clubcensus 3
          </Text>
          <Progress colorScheme="merkleMango" value={30} borderRadius={7.5} />
        </div>
      </Stack>
      <Box height="72px" />
      <Text fontSize="50px" fontWeight="bold">
        Attendance
      </Text>
      <NftGallery />
      <Box height="44px" />
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
      </Stack>
    </Flex>
  )
}

export default Dashboard
