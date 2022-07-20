import TopBar from 'components/TopBar'
import ismobilejs from 'ismobilejs'
import { Route, Routes } from 'react-router-dom'

import Dashboard from 'views/Dashboard'
import Events from 'views/Event'
import Home from 'views/Home'

import '@rainbow-me/rainbowkit/styles.css'

import { useContractReads } from 'wagmi'
import { Button } from '@chakra-ui/react'


const contractABI = require("./contract-abi.json");
const mintNftContract = {
  //test contract
  //addressOrName: '0x8a25DcB234b2d3F7d3A8A6bF0C592AdCaF20aAfb',
  addressOrName: '0xcbAC32Cc56c8f6c9ac127B304AF8bC5A631CE922',
  contractInterface: contractABI,
  watch: true,
  
}

export const App = () => {
  const isMobile = ismobilejs(window.navigator).any
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        //takes an address, and uint256 id as inputs
        ...mintNftContract,
        functionName: 'balanceOf',
        args: [2],
      },
      {
        //takes address[] accounts, uint256[] ids as inputs
        ...mintNftContract,
        functionName: 'balanceOfBatch',
        args: [2],
      },
      //Idk what this does + feel like we dont need this
      {
        ...mintNftContract,
        functionName: 'supportsInterface',
        args: [1],
      },
      //Idk what this is either + feel like we dont need this
      {
        ...mintNftContract,
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

  if (isMobile) {
    return (
      <Routes>
        <Route path="/" element={<TopBar />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<Events />} />
        </Route>
      </Routes>
    )
  }
  const balance = mintNftContract.balanceOf(0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f, 1)
  
  return (
   
    <a
      href="https://www.browserstack.com/guide/view-mobile-version-of-website-on-chrome"
      target="_blank"
      rel="noreferrer"
    >
      switch to mobile mode! (and refresh)
    </a>
  )
}
