// ** React Imports
import { useState } from 'react'
import Alert from '@mui/material/Alert'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'

const TabDetails = props => {
  const [value, setValue] = useState('ecommerce')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        {props.formAlert.type === 'pending' ? <Alert severity='info'>{props.formAlert.message}</Alert> : null}
      </Box>
      <TextField
        fullWidth
        sx={{ mb: 4 }}
        label='Contract Address'
        value={props.contract}
        placeholder='Contract Address'
        onChange={e => props.setContract(e.target.value)}
      />
      <Typography variant='h6' sx={{ mb: 4 }}>
        Chain
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Box
          onClick={() => props.setChain('ethereum')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='mdi:ethereum' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>Ethereum</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Highest Accuracy
              </Typography>
            </div>
          </Box>
          <Radio value='ethereum' onChange={handleChange} checked={value === 'ethereum'} />
        </Box>
        <Box
          onClick={() => props.setChain('polygon')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='mdi:database-cog' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>Polygon</Typography>
            </div>
          </Box>
          <Radio value='polygon' onChange={handleChange} checked={value === 'polygon'} />
        </Box>
        <Box
          onClick={() => props.setChain('bsc')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='error' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='mdi:database-cog' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>Binance Smart Chain</Typography>
            </div>
          </Box>
          <Radio value='bsc' onChange={handleChange} checked={value === 'bsc'} />
        </Box>
      </Box>
    </div>
  )
}

export default TabDetails
