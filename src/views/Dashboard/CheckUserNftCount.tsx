//returns the number of NFTs(identified by NFT ID, is second argument) the account has
import { useAccount, useContractRead } from 'wagmi'
const contractABI = require("./contract-abi.json")

interface CheckUserNftCountProps {
    acc: string;
    id: number;
}

const CheckUserNftCount = (props: CheckUserNftCountProps) => {
    const account = useAccount();
    
    const { data, status } = useContractRead(
      {
        addressOrName: '0x8a25DcB234b2d3F7d3A8A6bF0C592AdCaF20aAfb',
        contractInterface: contractABI.abi,
        functionName: 'balanceOf',
        args: [props.acc, props.id]
      },
    )
     console.log(`${data}`)
     return <p></p>
}

export default CheckUserNftCount
  

