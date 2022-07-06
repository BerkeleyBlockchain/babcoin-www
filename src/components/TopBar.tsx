import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './TopBar.css'
import { GiHamburgerMenu } from 'react-icons/gi'



type Props = {}

const TopBar = (props: Props) => {
  const [nav, setNav] = useState(false)
  const handleNav = () => setNav(!nav)

  return (
    <>
      <Box>
        <div className = "background">
          <div className= {nav ? 'semiCircle' : 'nothing'}>
            <ul className = {nav ? 'Text': 'nothing'}>
              Home
              Dashboard
              Admin
              Requirements
            </ul>
          </div>


          <div className = "exitButton" onClick={handleNav}>
              {!nav ? 'nothing' : (<button className="button">x</button>)}
          </div>
         
          
          <div className="hamburger" onClick={handleNav}> 
                {!nav ? (<GiHamburgerMenu className='icon' />) : 'nothing'}
          </div>
          

          
          
        </div>
      </Box>
      <Outlet />
    </>
  )
}

export default TopBar
