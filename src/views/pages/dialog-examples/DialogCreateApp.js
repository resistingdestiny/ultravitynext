// ** React Imports
import { useState, forwardRef } from 'react'

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

  const [contract, setContract] = useState('')
  const [chain, setChain] = useState('ethereum')
  const api_key = props.user_id
  // ** States
  const [show, setShow] = useState(false)
  const [activeTab, setActiveTab] = useState('detailsTab')
  const { authUser, loading, auth, signout } = useFirebaseAuth()

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const [formAlert, setFormAlert] = useState({ type: '', message: '' })
  const [pending, setPending] = useState(false)

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
              if (activeTab !== 'submitTab') {
                setActiveTab(nextTab)
              } else {
                handleClose()
              }
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
              setActiveTab('submitTab')
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
                  chain={chain}
                  setChain={setChain}
                />
                {renderTabFooter()}
              </TabPanel>

              <TabPanel value='DatabaseTab' sx={{ flexGrow: 1 }}>
                <DialogTabDatabase contract={contract} chain={chain} api_key={api_key} />
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
