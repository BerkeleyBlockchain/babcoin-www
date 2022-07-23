//returns the number of NFTs(identified by NFT ID, is second argument) the account has
import { useAccount, useContractRead } from 'wagmi'
const contractABI = require("./contract-abi.json")

const CheckUserNftCount = () => {
    
    const { data, status } = useContractRead(
      {
        addressOrName: '0x8a25DcB234b2d3F7d3A8A6bF0C592AdCaF20aAfb',
        contractInterface: contractABI.abi,
        functionName: 'balanceOf',
        args: ["0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f", 1]
      },
    )
     console.log(`${data}`)
     return <p></p>
}

export default CheckUserNftCount
  

