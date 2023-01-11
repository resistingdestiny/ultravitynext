// ** React Imports
import { useState, useEffect } from 'react'
// ** MUI Imports

import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CustomChip from 'src/@core/components/mui/chip'
import Box from '@mui/material/Box'

const TabDatabase = props => {
  const handleChange = event => {
    props.setFunctionName(event.target.value)
  }
  console.log(props.functionArgs)
  const options = Object.keys(props.contractMethods).map(key => ({
    value: key,
    label: key
  }))
  // Declare a state variable called "chipValues" with an initial value of an empty array
  const [chipValues, setChipValues] = useState([])
  // Declare a state variable called "showTextFields" with an initial value of an empty array
  const [showTextFields, setShowTextFields] = useState([])

  // Define an event handler that updates the value of "chipValues" and "showTextFields" when the custom chip is clicked
  const handleChipClick = chipValue => {
    // Add the chip value to the "chipValues" array
    setChipValues([...chipValues, chipValue])
    // Add a new value to the "showTextFields" array
    setShowTextFields([...showTextFields, true])
  }
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
        {/*  {Array.isArray(props.functionArgs)
          ? props.functionArgs.map((arg, index) => <TextField key={index} fullWidth sx={{ mb: 4 }} label={arg} />)
          : null} */}
        <TextField fullWidth sx={{ mb: 4 }} label='Add Liquidity ETH' />
        <TextField fullWidth sx={{ mb: 4 }} label='Token (Address)' />
        {/*  <TextField fullWidth sx={{ mb: 4 }} label='Token Amount Desired' />
        <TextField fullWidth sx={{ mb: 4 }} label='Minimum Token Amount' />
        <TextField fullWidth sx={{ mb: 4 }} label='Minimum ETH amount' /> */}
        <TextField fullWidth sx={{ mb: 4 }} label='To Address' value={props.contract} />
        {/* <TextField fullWidth sx={{ mb: 4 }} label='Deadline' /> */}
        {chipValues.map((chipValue, index) =>
          // Render the text field only if the corresponding value in the "showTextFields" array is true
          showTextFields[index] ? (
            <TextField key={index} fullWidth sx={{ mb: 4 }} label={chipValue} value={chipValue} />
          ) : null
        )}

        {/* Render the custom chips and pass them the "handleChipClick" event handler */}
        {Array.isArray(props.functionArgs)
          ? props.functionArgs.map((arg, index) => (
              <CustomChip
                key={arg}
                onClick={() => handleChipClick(arg)}
                size='large'
                skin='light'
                color='info'
                label={'+ ' + arg}
                sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
              />
            ))
          : null}
        {/* Render a text field for each value in the "chipValues" array */}
      </div>
    </div>
  )
}

export default TabDatabase
