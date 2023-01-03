// ** React Imports
import { useState, forwardRef } from 'react'
import Alert from '@mui/material/Alert'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
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
import ViewContract from 'src/views/dashboards/analytics/ViewContract'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import { useQueryClient } from 'react-query'

import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { updateItem } from 'src/util/db'
import { useForm } from 'react-hook-form'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})
import useFirebaseAuth from 'src/hooks/useFirebaseAuth.js'
const DialogAddCard = props => {
  const [buttonText, setButtonText] = useState('Add')
  const { authUser, loading, auth, signout } = useFirebaseAuth()
  const { register } = useForm()
  const queryClient = useQueryClient()

  const invalidateOwnerItems = owner => {
    queryClient.invalidateQueries(['items', { owner }])
    queryClient.invalidateQueries(['latestItemByOwner', { owner }])
  }
  const [pending, setPending] = useState(false)
  const [name, setName] = useState('')
  const [contract, setContract] = useState('')
  const [chain, setChain] = useState('ethereum')
  const api_key = props.user_id
  const [showProgress, setShowProgress] = useState(false)
  const [resJson, setResJson] = useState(false) // add this line
  const [chartData, setChartData] = useState([])
  const [formAlert, setFormAlert] = useState({ type: '', message: '' })
  const [nickname, setNickname] = useState(`${contract}_${chain}_${api_key}`)
  const handleAdd = () => {
    invalidateOwnerItems(authUser?.uid)
    console.log(`${contract}_${chain}_${api_key}`)
    updateItem(`${contract}_${chain}_${api_key}`, { name: nickname })
    setButtonText('Added')
    setFormAlert({
      type: 'success',
      message: 'Name added successfully'
    })
  }
  // ** States
  const [show, setShow] = useState(false)
  const [focus, setFocus] = useState()
  const handleBlur = () => setFocus(undefined)

  const handleClose = () => {
    setShow(false)
    setFocus(undefined)
    setResJson(false)
    invalidateOwnerItems(authUser?.uid)
  }

  const handleSubmit = async e => {
    setFormAlert({
      type: 'pending',
      message: 'Building your smart contract report...'
    })
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
            {formAlert.type === 'pending' ? <Alert severity='info'>{formAlert.message}</Alert> : null}
            {formAlert.type === 'success' ? <Alert severity='success'>{formAlert.message}</Alert> : null}
            {formAlert.type === 'error' ? <Alert severity='error'>{formAlert.message}</Alert> : null}
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {!resJson ? 'Add New Contract' : 'View Contract'}
            </Typography>
            <Typography variant='body2'>{!resJson ? 'Submit a smart contract address for validation' : ` `}</Typography>
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
                      /* inputRef={register({
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
                        <TableCell>{resJson.score.total_score}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Recommendation</TableCell>
                        <TableCell>{resJson.score.recommendation}</TableCell>
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
