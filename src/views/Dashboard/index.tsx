import { useMemo } from 'react'

import { Box, Flex, Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import useDatabase from 'contexts/database/useDatabase'
import NftGallery from './components/NftGallery'
import ProgressBox from './components/ProgressBox'

const Dashboard = () => {
  const { address } = useAccount()
  const { attendedEvents, requirements } = useDatabase()

  const attendedMap = useMemo(() => {
    const res: { [key in string]: number } = {}
    Object.values(attendedEvents).forEach((e) => {
      if (!res[e.type]) res[e.type] = 0
      res[e.type] = res[e.type] + 1
    })
    return res
  }, [attendedEvents])

  return (
    <Flex flexDirection="column" left="16px" position="absolute" right="16px">
      <Box height="44px" />
      <Text fontSize="50px" fontWeight="bold">
        Membership
      </Text>
      <Flex flexWrap="wrap" gap="12px">
        {requirements.map((requirement) => (
          <ProgressBox
            current={attendedMap[requirement.type]}
            key={requirement._id}
            max={requirement.amount}
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
