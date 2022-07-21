import { useContractRead } from 'wagmi'
const contractABI = require("./contract-abi.json")


const Test = () => {
  const { data, status} = useContractRead(
    {
      addressOrName: 'BabCoinContract',
      contractInterface: contractABI.abi,
      functionName: 'balanceOf',
      args: ['0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f', 1],
      
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