import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import NftGallery from './Dashboard/components/NftGallery'

const Peek: React.FC = () => {
  const { address } = useParams<{ address: string }>()
  const formattedAddress = address
    ? address.slice(0, 6) + '...' + address.slice(-4)
    : ''

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
        <Heading size="3xl">Peek</Heading>
        {address ? (
          <>
            <Text size="xl">Here are {formattedAddress}'s NFTs</Text>
            <NftGallery account={address} />
          </>
        ) : (
          <Text>No user with that address found</Text>
        )}
      </Stack>
    </Flex>
  )
}

export default Peek
