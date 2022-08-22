import TopBar from 'components/TopBar'
import ismobilejs from 'ismobilejs'
import { Outlet, Route, Routes } from 'react-router-dom'

import Dashboard from 'views/Dashboard'
import Event from 'views/Event'
import Home from 'views/Home'
import Peek from 'views/Peek'
import Onboarding from 'views/Onboarding'

import '@rainbow-me/rainbowkit/styles.css'

export const App = () => {
  const isMobile = ismobilejs(window.navigator).any

  if (isMobile) {
    return (
      <Routes>
        <Route path="/" element={<TopBar />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<Outlet />}>
            <Route path=":id" element={<Event />} />
          </Route>
          <Route path="peek" element={<Outlet />}>
            <Route path=":address" element={<Peek />} />
          </Route>
          <Route path="onboarding" element={<Onboarding />} />
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
