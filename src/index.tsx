import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  DisclaimerComponent,
} from '@rainbow-me/rainbowkit'
import { BrowserRouter } from 'react-router-dom'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { App } from './App'
import theme from './theme'

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



const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{' '}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{' '}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
)



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
            appInfo={{
              appName: 'B@BCoin Dashboard',
              learnMoreUrl: 'https://blockchain.berkeley.edu/',
            }}
            chains={chains}
            // coolMode
            theme={darkTheme({
              accentColor: 'white',
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
