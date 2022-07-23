import { useContractRead } from 'wagmi'
const contractABI = require("./contract-abi.json")


const Test = () => {
  const {data, status} = useContractRead(
    {
      addressOrName: '0x8a25DcB234b2d3F7d3A8A6bF0C592AdCaF20aAfb',
      contractInterface: contractABI.abi,
      functionName: 'balanceOf',
      args: [ '0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f', 4]
      
    },
  )
    
    console.log(`${data}`)
  
    console.log(status)
  

  return <button>Balance Of</button>
  
}

export default Test