// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import AnalyticsPerformance from 'src/views/dashboards/analytics/AnalyticsPerformance'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogAddCard = () => {
  const [pending, setPending] = useState(false)
  const [formAlert, setFormAlert] = useState(null)

  const [contract, setContract] = useState('')
  const [chain, setChain] = useState('ethereum')
  const [api_key, setApiKey] = useState('CAwy8StUGEPWo4kzqYpA7W7vloj2')
  const [showProgress, setShowProgress] = useState(false)
  const [resJson, setResJson] = useState(false) // add this line
  const [chartData, setChartData] = useState([])

  // ** States
  const [show, setShow] = useState(false)
  const [focus, setFocus] = useState()
  const handleBlur = () => setFocus(undefined)

  const handleClose = () => {
    setShow(false)
    setFocus(undefined)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setPending(true)
    setShowProgress(true) // Show the CircularProgress component

    try {
      let res = await fetch(
        `https://ultravity.herokuapp.com/api/score?contract_address=${contract}&chain=${chain}&api_key=${api_key}`,
        {
          method: 'GET'
        }
      )
      let resJson = await res.json()
      setResJson(resJson) // update the resJson state here
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
        setShowProgress(false) // Hide the CircularProgress component
      } else {
        setFormAlert({
          type: 'error',
          message: 'Error adding contract'
        })
      }
      setShowProgress(false) // Hide the CircularProgress component
    } catch (err) {
      console.log(err)
      setPending(false)
      setShowProgress(false) // Hide the CircularProgress component
    }
  }

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', '& svg': { mb: 2 } }}>
        <Icon icon='mdi:credit-card-outline' fontSize='2rem' />
        <Typography variant='h6' sx={{ mb: 4 }}>
          Add New Contract
        </Typography>
        <Typography sx={{ mb: 3 }}>Quickly submit and scan a smart contract address</Typography>
        <Button variant='contained' onClick={() => setShow(true)}>
          Add
        </Button>
      </CardContent>
      <Dialog
        fullWidth
        open={show}
        maxWidth='sm'
        scroll='body'
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {!resJson ? 'Add New Contract' : 'View Contract'}
            </Typography>
            <Typography variant='body2'>
              {!resJson ? 'Submit a smart contract address for validation' : `Contract address: ${contract}`}
            </Typography>
          </Box>
          {!resJson ? (
            <Grid container spacing={6}>
              <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important` }}>
                <Grid container spacing={6}>
                  <Grid item xs={12} sx={{ mt: 7 }}>
                    <TextField
                      variant='outlined'
                      type='text'
                      name='Contract'
                      value={contract}
                      placeholder='Contract'
                      onChange={e => setContract(e.target.value)}
                      /*  inputRef={register({
                      required: 'Please enter a contract address',
                      minLength: {
                        value: 41,
                        message: 'Please enter a valid smart contract address'
                      },
                      maxLength: {
                        value: 43,
                        message: 'Please enter a valid smart contract address'
                      }
                    })} */
                      fullWidth
                      autoComplete='off'
                      label='Contract Address'
                      onBlur={handleBlur}
                      onFocus={e => setFocus(e.target.name)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <InputLabel id='demo-simple-select-outlined-label'>Chain</InputLabel>
                      <Select
                        label='Chain'
                        defaultValue=''
                        id='demo-simple-select-outlined'
                        labelId='demo-simple-select-outlined-label'
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Ethereum'}>Ethereum</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <AnalyticsPerformance />
          )}
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          {!resJson ? (
            <>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleClose}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogAddCard
