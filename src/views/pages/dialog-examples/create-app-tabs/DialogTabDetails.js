// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'

const TabDetails = () => {
  const [value, setValue] = useState('ecommerce')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <TextField fullWidth sx={{ mb: 4 }} label='Contract Address' placeholder='Materialize Admin' />
      <Typography variant='h6' sx={{ mb: 4 }}>
        Chain
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Box
          onClick={() => setValue('crm')}
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
          <Radio value='crm' onChange={handleChange} checked={value === 'crm'} />
        </Box>
        <Box
          onClick={() => setValue('ecommerce')}
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
          <Radio value='ecommerce' onChange={handleChange} checked={value === 'ecommerce'} />
        </Box>
        <Box
          onClick={() => setValue('learning')}
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
          <Radio value='learning' onChange={handleChange} checked={value === 'learning'} />
        </Box>
      </Box>
    </div>
  )
}

export default TabDetails
