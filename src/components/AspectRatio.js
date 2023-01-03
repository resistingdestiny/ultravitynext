import React from 'react'
import Box from '@mui/material/Box'

function AspectRatio(props) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 0,
        pb: (1 / props.ratio) * 100 + '%'
      }}
    >
      <Box
        sx={{
          // Fill parent aspect ratio
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default AspectRatio
