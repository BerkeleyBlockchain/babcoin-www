//returns the number of NFTs(identified by NFT ID, is second argument) the account has

import { useAccount, useContractRead, useContractReads } from 'wagmi'
const contractABI = require("./contract-abi.json")


const ReadNftData = () => {

const BabcoinContract = {
    addressOrName: '0x8a25DcB234b2d3F7d3A8A6bF0C592AdCaF20aAfb',
    contractInterface:  contractABI.abi,
  }

const {data, status} = useContractReads({
    contracts: [
      {
        //takes an address, and uint256 id as inputs
        ...BabcoinContract,
        functionName: 'balanceOf',
        args: ["0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f", 1],
      },
      {
        ...BabcoinContract,
        functionName: 'uri',
        args: [1],
      },
    ],
})
  if (data != undefined) {
    const searchRegExp = "{id}"

    //User's quantity of NFTs
    const quantity = data[0]
    console.log(`${quantity}`)

    //NFT metadata hosting link
    const uri = data[1].replace(searchRegExp, 1)
    console.log(uri)
    
  } else {
    console.log('error: undefined fetched data')
  }
  
  return <p></p>
}

export default ReadNftData
  





  

