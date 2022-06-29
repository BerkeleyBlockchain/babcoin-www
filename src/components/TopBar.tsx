import { Box } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const TopBar = (props: Props) => {
  return (
    <>
      <Box backgroundColor="#fecb33" height="84px" width="100%">
        TopBar
      </Box>
      <Outlet />
    </>
  )
}

export default TopBar
