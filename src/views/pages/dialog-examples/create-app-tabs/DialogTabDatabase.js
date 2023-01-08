// ** React Imports
import { useState, useEffect } from 'react'
// ** MUI Imports

import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const TabDatabase = props => {
  const handleChange = event => {
    props.setFunctionName(event.target.value)
  }
  console.log(props.functionArgs)
  const options = Object.keys(props.contractMethods).map(key => ({
    value: key,
    label: key
  }))

  return (
    <div>
      <TextField fullWidth sx={{ mb: 4 }} label='Wallet Address' placeholder='' />

      {/*
     
    
      
      */}
      <div>
        {/* convert contractMethods to a string and display it */}
        <Select onChange={handleChange} value={props.functionName} sx={{ mb: 4 }}>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {Array.isArray(props.functionArgs)
          ? props.functionArgs.map(arg => <TextField fullWidth sx={{ mb: 4 }} label={arg} />)
          : null}
        <TextField fullWidth sx={{ mb: 4 }} label='Add Liquidity ETH' />
        <TextField fullWidth sx={{ mb: 4 }} label='Token (Address)' />
        <TextField fullWidth sx={{ mb: 4 }} label='Token Amount Desired' />
        <TextField fullWidth sx={{ mb: 4 }} label='Minimum Token Amount' />
        <TextField fullWidth sx={{ mb: 4 }} label='Minimum ETH amount' />
        <TextField fullWidth sx={{ mb: 4 }} label='To Address' value={props.contract} />
        <TextField fullWidth sx={{ mb: 4 }} label='Deadline' />
      </div>
    </div>
  )
}

export default TabDatabase
