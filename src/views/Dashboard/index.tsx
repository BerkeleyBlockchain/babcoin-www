import { Box, Flex, Text } from '@chakra-ui/react'
import NftGallery from './components/NftGallery'
import ProgressBox from './components/ProgressBox'

import { useAccount } from 'wagmi';
import { useState } from 'react';


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
  const withMetadata = "false";

  //data of all the user's nfts
  const [userNfts, setUserNfts] = useState([]);

  //the users nfts without the metadata
  const fetchURL = `${baseURL}?owner=${ownerAddr}&withMetadata=${withMetadata}`;
  fetch(fetchURL, requestOptions)
    .then((response: { json: () => any; }) => response.json())
    .then((response: any) => JSON.stringify(response, null, 2))
    .then((result: any) => setUserNfts(result))
    .catch((error: any) => console.log('error', error))

  console.log(userNfts)



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
