import { Box, Flex, Text } from '@chakra-ui/react'
import NftGallery from './components/NftGallery'
import ProgressBox from './components/ProgressBox'

import { useAccount } from 'wagmi';
import { useState } from 'react';

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

interface NftMetadata {
  description: string
  image: string
  name: string
}

const Dashboard = () => {
  //const address = useAccount().address;
  const address = "0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f"
  const apiKey = "9_w25dPpnMio1K3JY9FifDnL1U7rlaP2"
  var requestOptions = {
    method: 'GET',
    RequestRedirect: 'follow',
  };
  const baseURL = `https:/polygon-mumbai.g.alchemy.com/nft/v2/${apiKey}/getNFTs`;
  const ownerAddr = `${address}`;
  const withMetadata = "true";
  //data of all the user's nfts
  const [userNfts, setUserNfts] = useState<OwnedNfts>();
  const fetchURL = `${baseURL}?owner=${ownerAddr}&withMetadata=${withMetadata}`;
  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then((result: any) => setUserNfts(result))
    .catch((error: any) => console.log('error', error))
  
  //returns list of the user's nfts, index into this list to get more data
  //about each particular nft
  const ownedNfts = userNfts?.ownedNfts
  console.log(userNfts?.ownedNfts)

  //number of Different nft's/tokens user has
  const totalNumDiffTokens = userNfts?.ownedNfts.length
  console.log(userNfts?.ownedNfts)

  //get the token id number of an owned nft(by index)
  let idNumber = Number(userNfts?.ownedNfts[1].id.tokenId)
  console.log(Number(userNfts?.ownedNfts[1].id.tokenId))

  //token metadata URL of a specific token
  const metadataURL = userNfts?.ownedNfts[1].tokenUri.raw.replace("{id}",`${idNumber}`)
  console.log(userNfts?.ownedNfts[1].tokenUri.raw.replace("{id}", `${idNumber}`))
  
  const[nftMetadata, setNftMetadata] = useState<NftMetadata>()
  fetch(`${metadataURL}`, requestOptions)
    .then(response => response.json())
    .then((result: any) => setNftMetadata(result))
    .catch((error: any) => console.log('error', error))
  console.log(nftMetadata?.description)
  console.log(nftMetadata?.image)
  console.log(nftMetadata?.name)
  
  
  




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
