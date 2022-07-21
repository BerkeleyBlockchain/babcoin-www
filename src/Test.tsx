import { useContractRead } from 'wagmi'
const contractABI = require("./contract-abi.json")


const Test = () => {
  const { data, status} = useContractRead(
    {
      addressOrName: 'BabCoinContract',
      contractInterface: contractABI.abi,
      functionName: 'balanceOf',
      args: ['0x8a25DcB234b2d3F7d3A8A6bF0C592AdCaF20aAfb', 1],
      
    },
  )

    
  const handleClick = async () => {
    console.log(`Balance: ${data}`)
    console.log(contractABI.abi)
    console.log(status)
  }

  return <button onClick={handleClick}>Balance Of</button>
  
}

export default Test