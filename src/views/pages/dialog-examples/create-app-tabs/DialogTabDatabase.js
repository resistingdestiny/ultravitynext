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

const TabDatabase = () => {
  const [value, setValue] = useState('firebase')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <TextField fullWidth sx={{ mb: 4 }} label='Add Liquidity ETH' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='Token (Address)' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='Token Amount Desired' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='Minimum Token mount' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='Minimum ETH amount' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='To Address' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='Deadline' placeholder='materialize_database' />
    </div>
  )
}

export default TabDatabase
