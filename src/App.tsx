import TopBar from 'components/TopBar'
import ismobilejs from 'ismobilejs'
import { Route, Routes } from 'react-router-dom'

import Dashboard from 'views/Dashboard'
import Events from 'views/Event'
import Home from 'views/Home'

import '@rainbow-me/rainbowkit/styles.css'

export const App = () => {
  const isMobile = ismobilejs(window.navigator).any

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
