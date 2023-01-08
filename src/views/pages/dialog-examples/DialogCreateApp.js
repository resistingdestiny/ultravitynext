// ** React Imports
import { useState, forwardRef } from 'react'
//Load web3 module
var Web3 = require('web3')
// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ViewContract from 'src/views/dashboards/analytics/ViewContract'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import { useQueryClient } from 'react-query'
import useFirebaseAuth from 'src/hooks/useFirebaseAuth.js'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TableCell from '@mui/material/TableCell'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Tab Content Imports
import DialogTabDetails from 'src/views/pages/dialog-examples/create-app-tabs/DialogTabDetails'
import DialogTabDatabase from 'src/views/pages/dialog-examples/create-app-tabs/DialogTabDatabase'
//Init web3 object
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) //No real RPC required as no requests done

//Init contract ABI parameters
const baseURL = 'https://ultravity.herokuapp.com/api/get_abi' // server
// const baseURL = 'http://127.0.0.1:5000/api/get_abi'; // local
const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const TabLabel = props => {
  const { icon, title, subtitle, active } = props

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3.5,
            ...(active ? { color: 'common.white', backgroundColor: 'primary.main' } : { color: 'text.primary' })
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='body2'>{title}</Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled', textTransform: 'none' }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}
const tabsArr = ['detailsTab', 'DatabaseTab', 'submitTab']

const DialogCreateApp = props => {
  const [chartData, setChartData] = useState([])
  const [resJson, setResJson] = useState(false) // add this line
  const [contractMethods, setContractMethods] = useState('')
  const [contract, setContract] = useState('')
  const [chain, setChain] = useState('ethereum')
  const [functionName, setFunctionName] = useState('withdraw')
  const [FunctionArgs, setFunctionArgs] = useState('amount')

  const api_key = props.user_id

  const contractAddress = contract
  const apiKey = api_key
  // ** States
  const [show, setShow] = useState(false)
  const [activeTab, setActiveTab] = useState('detailsTab')
  const { authUser, loading, auth, signout } = useFirebaseAuth()

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const [formAlert, setFormAlert] = useState({ type: '', message: '' })
  const [pending, setPending] = useState(false)

  //Web3 stuff

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
    setContractMethods(contract.methods)
    const functionABI = contractABI.find(abi => abi.name === functionName)
    const functionArgs = functionABI.inputs.map(arg => arg.name)
    setFunctionArgs(functionArgs)
    console.log(functionArgs)

    //Define function name and variables - on the front end users should select the function name
    //from a drop down and then add the arguments in the corresponding fields that build dynamically
    //Function names can be obtained from the contract ABI - see print example above
    const amount = 10 //web3.utils.toWei('1', 'ether'); possible to convert to other units here

    //Encode function call - required as data argument for raw transaction
    const encodedFunctionCall = contract.methods[functionName](...amount).encodeABI()
    console.log(encodedFunctionCall)

    //Build transaction object
    const from = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45' //user account
    const value = '10'
    const to = contract
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
  //////////////// end of web3
  const { direction } = settings
  const queryClient = useQueryClient()
  const invalidateOwnerItems = owner => {
    queryClient.invalidateQueries(['items', { owner }])
    queryClient.invalidateQueries(['latestItemByOwner', { owner }])
  }
  const handleClose = () => {
    setShow(false)
    setActiveTab('detailsTab')
    invalidateOwnerItems(authUser?.uid)
    setContractMethods('')
    setContract('')
  }

  const handleAdvanced = () => {
    main()
    setActiveTab('DatabaseTab')
  }

  const handleSubmit = async e => {
    setFormAlert({
      type: 'pending',
      message: 'Building your smart contract report...'
    })

    try {
      let res = await fetch(
        `https://ultravity.herokuapp.com/api/score?contract_address=${contract}&chain=${chain}&api_key=${api_key}`,
        {
          method: 'GET'
        }
      )
      let resJson = await res.json()
      setResJson(resJson) // update the resJson state here
      setPending(true)

      setChartData([
        resJson.score.radar_chart.immutability,
        resJson.score.radar_chart.credibility,
        resJson.score.radar_chart.reliability,
        resJson.score.radar_chart.longevity,
        resJson.score.radar_chart.immutability
      ])

      console.log(resJson)
      if (res.status === 200) {
        setFormAlert({
          type: 'success',
          message: 'Contract added successfully'
        })
        setActiveTab('submitTab')
      } else {
        setFormAlert({
          type: 'error',
          message: 'Error adding contract'
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const nextArrow = direction === 'ltr' ? 'mdi:arrow-right' : 'mdi:arrow-left'
  const previousArrow = direction === 'ltr' ? 'mdi:arrow-left' : 'mdi:arrow-right'

  const renderTabFooter = () => {
    const prevTab = tabsArr[tabsArr.indexOf(activeTab) - 1]
    const nextTab = tabsArr[tabsArr.indexOf(activeTab) + 1]

    return (
      <Box sx={{ mt: 8.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {activeTab !== 'detailsTab' && (
          <Button
            variant='outlined'
            color='secondary'
            disabled={activeTab === 'detailsTab'}
            onClick={() => setActiveTab(prevTab)}
            startIcon={<Icon icon={previousArrow} />}
          >
            Previous
          </Button>
        )}
        {activeTab == 'detailsTab' && (
          <Button
            variant='contained'
            color='primary'
            endIcon={<Icon icon={activeTab === 'submitTab' ? 'mdi:check' : nextArrow} />}
            onClick={() => {
              handleAdvanced()
            }}
          >
            Advanced Settings
          </Button>
        )}
        <Button
          variant='contained'
          color={activeTab === 'submitTab' ? 'success' : 'success'}
          endIcon={<Icon icon={activeTab === 'submitTab' ? 'mdi:check' : nextArrow} />}
          onClick={() => {
            if (activeTab == 'detailsTab') {
              handleSubmit()
            }
            if (activeTab == 'DatabaseTab') {
              setActiveTab(nextTab)
            }
          }}
        >
          {activeTab === 'detailsTab' ? 'Quick Submit' : 'Submit'}
        </Button>
      </Box>
    )
  }

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', '& svg': { mb: 2 } }}>
        <Icon icon='mdi:cube-outline' fontSize='2rem' />
        <Typography variant='h6' sx={{ mb: 4 }}>
          Advanced Contracts
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Provide detailed transaction information to get advanced risk modelling and simulation.{' '}
        </Typography>
        <Button variant='contained' onClick={() => setShow(true)}>
          Show
        </Button>
      </CardContent>
      <Dialog
        fullWidth
        open={show}
        scroll='body'
        maxWidth='md'
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pr: { xs: 5, sm: 12 },
            pl: { xs: 4, sm: 11 },
            pt: { xs: 8, sm: 12.5 },
            pb: { xs: 5, sm: 12.5 }
          }}
        >
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {' '}
              Advanced Add{' '}
            </Typography>
            <Typography variant='body2'>
              Provide additional transaction data to get advanced functionalities.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <TabContext value={activeTab}>
              <TabList
                orientation='vertical'
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  border: 0,
                  minWidth: 200,
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTabs-flexContainer': {
                    alignItems: 'flex-start',
                    '& .MuiTab-root': {
                      width: '100%',
                      alignItems: 'flex-start'
                    }
                  }
                }}
              >
                <Tab
                  disableRipple
                  value='detailsTab'
                  label={
                    <TabLabel
                      title='Contract Information'
                      subtitle='Basic Details'
                      icon={<Icon icon='mdi:clipboard-outline' />}
                      active={activeTab === 'detailsTab'}
                    />
                  }
                />

                <Tab
                  disableRipple
                  value='DatabaseTab'
                  label={
                    <TabLabel
                      title='Advanced (Optional)'
                      active={activeTab === 'DatabaseTab'}
                      subtitle='Advanced Details'
                      icon={<Icon icon='mdi:chart-donut' />}
                    />
                  }
                />

                <Tab
                  disableRipple
                  value='submitTab'
                  label={
                    <TabLabel
                      title='View Results'
                      subtitle='Report'
                      icon={<Icon icon='mdi:check' />}
                      active={activeTab === 'submitTab'}
                    />
                  }
                />
              </TabList>
              <TabPanel value='detailsTab' sx={{ flexGrow: 1 }}>
                <DialogTabDetails
                  formAlert={formAlert}
                  contract={contract}
                  setContract={setContract}
                  setFunctionName={setFunctionName}
                  functionName={functionName}
                  chain={chain}
                  setChain={setChain}
                />
                {renderTabFooter()}
              </TabPanel>

              <TabPanel value='DatabaseTab' sx={{ flexGrow: 1 }}>
                <DialogTabDatabase
                  contractMethods={contractMethods}
                  setFunctionName={setFunctionName}
                  functionName={functionName}
                  contract={contract}
                  chain={chain}
                  api_key={api_key}
                  functionArgs={FunctionArgs}
                />
                {renderTabFooter()}
              </TabPanel>

              <TabPanel value='submitTab' sx={{ flexGrow: 1 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>View Results</Typography>
                  <Typography variant='body2'>Report results here</Typography>
                </Box>
                <Grid>
                  <ViewContract chartData={chartData} />

                  <Box>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell variant='head'></TableCell>
                            <TableCell variant='head'></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/*  <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                size='small'
                                value={nickname}
                                onChange={event => setNickname(event.target.value)}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Button variant='outlined' color='secondary' onClick={handleAdd}>
                                {resJson.id ? 'Update' : buttonText}
                              </Button>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow> */}

                          <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Score</TableCell>
                            <TableCell>{resJson.score?.total_score}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Recommendation</TableCell>
                            <TableCell>{resJson.score?.recommendation}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Chain</TableCell>
                            <TableCell>{chain}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
                            <TableCell>{contract}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Typography variant='body2'></Typography>
                  </Box>
                </Grid>
                {renderTabFooter()}
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogCreateApp
