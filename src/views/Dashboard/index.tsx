import { Box, Button, Flex, Progress, Stack, Text } from '@chakra-ui/react'
import NftGallery from './components/NftGallery'

import { useAccount, useContractRead } from 'wagmi'
const contractABI = require("./contract-abi.json")
const account = useAccount();
import { useState, useEffect } from 'react';

//returns the number of NFTs(identified by NFT ID, is second argument) the account has
/*
const { data, status } = useContractRead(
  {
    addressOrName: '0x8a25DcB234b2d3F7d3A8A6bF0C592AdCaF20aAfb',
    contractInterface: contractABI.abi,
    functionName: 'balanceOf',
    args: [account, 1]
  },
)
*/



const Dashboard = () => {
  const account = '0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f'
    //useAccount();
  //const [userNfts, setUserNfts] = useState([])
  
  //Number of different NFTs possible
  const n = 4
  let nftCounts = []
  for (let i = 1; i < n; i++) {
    //returns the number of NFTs(identified by NFT ID, is second argument) the account has
    const { data, status } = useContractRead(
      {
        addressOrName: '0x8a25DcB234b2d3F7d3A8A6bF0C592AdCaF20aAfb',
        contractInterface: contractABI.abi,
        functionName: 'balanceOf',
        args: [account, i]
      },
    )
    nftCounts.push(data);
  }

  console.log(nftCounts)

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
