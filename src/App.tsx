import TopBar from 'components/TopBar'
import ismobilejs from 'ismobilejs'
import { Route, Routes } from 'react-router-dom'

import Dashboard from 'views/Dashboard'
import Events from 'views/Event'
import Home from 'views/Home'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


export const App = () => {
  const isMobile = ismobilejs(window.navigator).any

  if (isMobile) {
    return (
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <Routes>
        <Route path="/" element={<TopBar />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<Events />} />
        </Route>
      </Routes>
      </RainbowKitProvider>
    </WagmiConfig>
      
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
