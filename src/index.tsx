import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import { BrowserRouter } from 'react-router-dom'
import theme from 'theme'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { App } from './App'

import '@rainbow-me/rainbowkit/styles.css'
import './index.css'

const { chains, provider } = configureChains(
  [chain.polygon],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'B@BCoin Dashboard',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            // coolMode
            theme={darkTheme({
              accentColor: '#fecb33',
              accentColorForeground: 'black',
              overlayBlur: 'small',
            })}
          >
            <App />
          </RainbowKitProvider>
        </WagmiConfig>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
