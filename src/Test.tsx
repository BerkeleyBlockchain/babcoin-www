import { useContractRead } from 'wagmi'
const contractABI = require("./contract-abi.json")


const Test = () => {
  const { refetch } = useContractRead(
    {
      addressOrName: 'BabCoinContractC',
      contractInterface: contractABI,
      functionName: 'balanceOf',
      args: [2],
      
    },
  )
    
  const handleClick = async () => {
    const res = refetch()
    console.log(`Balance: ${res}`)
  }

  return <button onClick={handleClick}>Balance Of</button>
  
}

export default Test