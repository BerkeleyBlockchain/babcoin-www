import TopBar from 'components/TopBar'
import ismobilejs from 'ismobilejs'
import { Route, Routes } from 'react-router-dom'

import Dashboard from 'views/Dashboard'
import Events from 'views/Event'
import Home from 'views/Home'

import '@rainbow-me/rainbowkit/styles.css'

import { useContractReads } from 'wagmi'


const contractABI = require("../contract-abi.json");
const mintNftContract = {
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
