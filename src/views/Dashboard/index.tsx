import { Box, Flex, Text } from '@chakra-ui/react'
import NftGallery from './components/NftGallery'
import ProgressBox from './components/ProgressBox'

import { useCallback, useEffect, useState } from 'react'

interface OwnedNfts {
  //List of user's nfts with data(contract address, nft ID, balance of token, uri but is all nested)
  ownedNfts: Nfts[]
  totalCount: number
  blockHash: string
}
interface Nfts {
  contract: Address
  id: Id
  balance: string
  tokenUri: TokenUris
}
interface Address {
  address: string
}
interface Id {
  tokenId: string
}
interface TokenUris {
  raw: string
}

interface metadata {
  description: string
  image: string
  name: string
}

const Dashboard = () => {
  //const address = useAccount().address;
  const address = '0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f'
  const apiKey = '9_w25dPpnMio1K3JY9FifDnL1U7rlaP2'
  const baseURL = `https:/polygon-mumbai.g.alchemy.com/nft/v2/${apiKey}/getNFTs`
  const ownerAddr = `${address}`
  const withMetadata = 'true'

  //data of all the user's nfts
  const [userNfts, setUserNfts] = useState<OwnedNfts>()
  console.log('🚀 ~ Dashboard ~ userNfts', userNfts)
  const fetchURL = `${baseURL}?owner=${ownerAddr}&withMetadata=${withMetadata}`

  const handleFetchNfts = useCallback(async () => {
    const res = await fetch(fetchURL, {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch((error: any) => console.log('error', error))
    setUserNfts(res)
  }, [fetchURL])

  useEffect(() => {
    handleFetchNfts()
  }, [handleFetchNfts])

  //returns list of the user's nfts,
  //index into this list to get more data
  //about each particular nft
  const ownedNfts = userNfts?.ownedNfts
  // console.log(userNfts?.ownedNfts)

  //number of Different NFTs with unique user IDs the user has
  const totalNumDiffTokens = userNfts?.ownedNfts.length
  // console.log(userNfts?.ownedNfts)

  //Inputs, an index position from user list of nfts
  //Returns, the metadata url for that nft
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMetadataURL = useCallback(
    (index: number) =>
      userNfts?.ownedNfts[index].tokenUri.raw.replace(
        '{id}',
        `${Number(userNfts?.ownedNfts[index].id.tokenId)}`,
      ),
    [userNfts?.ownedNfts],
  )

  //Inputs, an index position from user list of nfts
  //Returns, the number of that specific nft the user has
  function getNumberOfNNfts(index: number) {
    return userNfts?.ownedNfts[index].balance
  }

  //Gets the metadata for a certain nft
  const [metadata, setMetadata] = useState<metadata>()

  const handleFetchMetadata = useCallback(async () => {
    const res = await fetch(`${getMetadataURL(2)}`, {
      method: 'GET',
      // RequestRedirect: 'follow',
    })
      .then((response) => response.json())
      .catch((error: any) => console.log('error', error))
    setMetadata(res)
  }, [getMetadataURL])

  useEffect(() => {
    handleFetchMetadata()
  }, [handleFetchMetadata])

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
        <ProgressBox current={11} max={20} title="Whitepaper Circles" />
        <ProgressBox current={3} max={10} title="Tabling" />
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
