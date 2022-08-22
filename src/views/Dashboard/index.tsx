import { Box, Flex, Text } from '@chakra-ui/react'

import useDatabase from 'contexts/database/useDatabase'
import { useAccount } from 'wagmi'
import NftGallery from './components/NftGallery'
import ProgressBox from './components/ProgressBox'

const Dashboard = () => {
  const { address } = useAccount()
  // TODO: need attended events
  const {} = useDatabase()
  const { requirements } = useDatabase()

  return (
    <Flex flexDirection="column" left="16px" position="absolute" right="16px">
      <Box height="44px" />
      <Text fontSize="50px" fontWeight="bold">
        Membership
      </Text>
      <Flex flexWrap="wrap" gap="12px">
        {requirements.map((requirement) => (
          <ProgressBox
            current={3}
            key={requirement._id}
            max={10}
            title={requirement.type}
          />
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
