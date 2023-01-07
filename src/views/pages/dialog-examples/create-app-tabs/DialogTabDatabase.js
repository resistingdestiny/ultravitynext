// ** React Imports
import { useState, useEffect } from 'react'
// ** MUI Imports

import TextField from '@mui/material/TextField'

// ** Web3 Imports

//Load web3 module
var Web3 = require('web3')

//Init web3 object
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) //No real RPC required as no requests done

//Init contract ABI parameters
const baseURL = 'https://ultravity.herokuapp.com/api/get_abi' // server
// const baseURL = 'http://127.0.0.1:5000/api/get_abi'; // local

const TabDatabase = props => {
  const contractAddress = props.contract
  const chain = props.chain
  const apiKey = props.api_key
  const [value, setValue] = useState('firebase')

  const handleChange = event => {
    setValue(event.target.value)
  }

  // Returns abi from ultravity api
  async function fetchContractABI(baseURL, contractAddress, chain, apiKey) {
    var url = baseURL + '?contract_address=' + contractAddress + '&chain=' + chain + '&api_key=' + apiKey
    console.log(url)
    const response = await fetch(url)
    var contractABI = await response.json()

    //check if error in contractABI keys
    if (contractABI.hasOwnProperty('error')) {
      console.log('Error: ' + contractABI.error)
      return 'Error'
    } else {
      contractABI = contractABI.abi
      return contractABI
    }
  }

  //Main function wrapper
  async function main() {
    //Get abi
    var contractABI = await fetchContractABI(baseURL, contractAddress, chain, apiKey)
    console.log(contractABI)

    //Etherscan currently blocks requests from ultravity server --> overwrite ABI with local copy
    contractABI = [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          { name: 'guy', type: 'address' },
          { name: 'wad', type: 'uint256' }
        ],
        name: 'approve',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          { name: 'src', type: 'address' },
          { name: 'dst', type: 'address' },
          { name: 'wad', type: 'uint256' }
        ],
        name: 'transferFrom',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        constant: false,
        inputs: [{ name: 'wad', type: 'uint256' }],
        name: 'withdraw',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: true,
        inputs: [{ name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          { name: 'dst', type: 'address' },
          { name: 'wad', type: 'uint256' }
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        constant: false,
        inputs: [],
        name: 'deposit',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
      },
      {
        constant: true,
        inputs: [
          { name: '', type: 'address' },
          { name: '', type: 'address' }
        ],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      { payable: true, stateMutability: 'payable', type: 'fallback' },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'src', type: 'address' },
          { indexed: true, name: 'guy', type: 'address' },
          { indexed: false, name: 'wad', type: 'uint256' }
        ],
        name: 'Approval',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'src', type: 'address' },
          { indexed: true, name: 'dst', type: 'address' },
          { indexed: false, name: 'wad', type: 'uint256' }
        ],
        name: 'Transfer',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'dst', type: 'address' },
          { indexed: false, name: 'wad', type: 'uint256' }
        ],
        name: 'Deposit',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'src', type: 'address' },
          { indexed: false, name: 'wad', type: 'uint256' }
        ],
        name: 'Withdrawal',
        type: 'event'
      }
    ]

    //Init contract object
    const contract = new web3.eth.Contract(contractABI, contractAddress)

    //Print all functions in contract - required for drop down menu on front end
    console.log(contract.methods)

    //Define function name and variables - on the front end users should select the function name
    //from a drop down and then add the arguments in the corresponding fields that build dynamically
    //Function names can be obtained from the contract ABI - see print example above
    const amount = 10 //web3.utils.toWei('1', 'ether'); possible to convert to other units here
    const functionName = 'withdraw'
    const functionArgs = [amount]
    //Encode function call - required as data argument for raw transaction
    const encodedFunctionCall = contract.methods[functionName](...functionArgs).encodeABI()
    console.log(encodedFunctionCall)

    //Build transaction object
    const from = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45' //user account
    const value = '10'
    const to = contractAddress
    const data = encodedFunctionCall
    const gas = 1000000
    // const gasPrice = '1000000000'; // 1 gwei // not required for ultravity api

    //Post the info below to the ultravity api as pass it under "transaction=" as in the example below
    // {"from":"0xd121f665d08be9cdf3d6767c94a6bd84288feff2","to":"0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
    // "value":"0x16345785d8a0000","data":"0xd0e30db0","gas":"0x6d3e"}
    const rawTransaction = {
      from: from,
      to: to,
      data: data,
      gas: gas,
      value: value
    }
    console.log(rawTransaction)
  }

  const handleClick = () => {
    main()
  }

  return (
    <div>
      <TextField fullWidth sx={{ mb: 4 }} label='Add Liquidity ETH' placeholder='materialize_database' />
      {/* <TextField fullWidth sx={{ mb: 4 }} label='Token (Address)' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='Token Amount Desired' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='Minimum Token mount' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='Minimum ETH amount' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='To Address' placeholder='materialize_database' />
      <TextField fullWidth sx={{ mb: 4 }} label='Deadline' placeholder='materialize_database' /> */}
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default TabDatabase
