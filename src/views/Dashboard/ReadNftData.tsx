//returns the number of NFTs(identified by NFT ID, is second argument) the account has

import { useAccount, useContractRead, useContractReads } from 'wagmi'
const contractABI = require("./contract-abi.json")
const address = useAccount()

const BabcoinContract = {
    addressOrName: '0x8a25DcB234b2d3F7d3A8A6bF0C592AdCaF20aAfb',
    contractInterface:  contractABI.abi,
  }

const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        //takes an address, and uint256 id as inputs
        ...BabcoinContract,
        functionName: 'balanceOf',
        args: [address, 1],
      },
      {
        ...BabcoinContract,
        functionName: 'uri',
        args: [1],
      },
    ],
    onSuccess(data) {
      console.log('Success', data)
    },
    onError(error) {
      console.log('Error', error)
    },
  })



  

