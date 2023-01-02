// ** React Imports
import { useState, useEffect, forwardRef } from 'react'
import { useItem } from 'src/util/db'
import { useQueryClient } from 'react-query'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import ViewContract from 'src/views/dashboards/analytics/ViewContract'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { updateItem } from 'src/util/db'
// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import useFirebaseAuth from 'src/hooks/useFirebaseAuth.js'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogViewCard = props => {
  const { authUser, loading, auth, signout } = useFirebaseAuth()

  const [nickname, setNickname] = useState(props.rowData.row.name)
  const [contract, setContract] = useState('')
  const [report, setReport] = useState('')
  const [name, setName] = useState('')
  const [chain, setChain] = useState('ethereum')
  const [chartData, setChartData] = useState([])
  const [makeReport, setMakeReport] = useState(false)
  const [buttonText, setButtonText] = useState('Add')
  const [showHistory, setShowHistory] = useState(false)
  const handleAdd = () => {
    updateItem(props.rowData.id, { name: nickname })
    setButtonText('Added')
  }
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  // ** States
  const [show, setShow] = useState(props.showDialogViewCard)
  const handleHistory = () => {
    setShowHistory(true)
  }
  const queryClient = useQueryClient()
  const invalidateOwnerItems = owner => {
    queryClient.invalidateQueries(['items', { owner }])
    queryClient.invalidateQueries(['latestItemByOwner', { owner }])
  }

  const handleClose = () => {
    setShow(false)
    props.setShowDialogViewCard(false)
    invalidateOwnerItems(authUser?.uid)
  }
  const handleReport = () => {
    if (makeReport) {
      setShow(false)
      setMakeReport(false)
    } else {
      setMakeReport(true)
    }
  }

  const { data: itemHistory, status: itemHistoryStatus, error: itemsHistoryError } = useItem(props.rowData.id)
  console.log(typeof itemHistory)
  useEffect(() => {
    setChartData([
      props.rowData.row.longevity,
      props.rowData.row.reliability,
      props.rowData.row.credibility,
      props.rowData.row.popularity,
      props.rowData.row.immutability
    ])
  }, [])
  return (
    <Card>
      <Dialog
        fullWidth
        open={props.showDialogViewCard}
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
              {makeReport ? 'Report Contract' : showHistory ? 'View History' : 'View Contract'}
            </Typography>
          </Box>
          {!makeReport && !showHistory && (
            <Box>
              <ViewContract chartData={chartData} />
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell variant='head'></TableCell>
                      <TableCell variant='head'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell>
                        <TextField size='small' value={nickname} onChange={event => setNickname(event.target.value)} />
                        <Button variant='outlined' color='secondary' onClick={handleAdd}>
                          {props.rowData.row.name ? 'Update' : buttonText}
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>Score</TableCell>
                      <TableCell>{props.rowData.row.score}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                      <TableCell>{props.rowData.row.recommendation}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
                      <TableCell>{props.rowData.id.substr(0, 42)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant='body2'></Typography>
            </Box>
          )}
          {showHistory && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Score</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>

                {Object.keys(itemHistory).map(
                  (historyItem, index) =>
                    typeof itemHistory[historyItem].total_score === 'number' && (
                      <TableBody>
                        <TableRow key={index}>
                          <TableCell>{itemHistory[historyItem].total_score}</TableCell>
                          <TableCell>
                            {dateFormatter.format(new Date(itemHistory[historyItem].timestamp * 1000))}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )
                )}

                {/* <TableBody>{itemHistory[0].total_score}</TableBody> */}
              </Table>
            </TableContainer>
          )}

          {makeReport && !showHistory && (
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important` }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ mt: 7 }}>
                      <TextField
                        variant='outlined'
                        type='text'
                        name='Contract'
                        value={contract}
                        disabled={true}
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
                        label={props.rowData.id.substr(0, 42)}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 7 }}>
                      <TextField
                        variant='outlined'
                        type='text'
                        name='Report'
                        multiline
                        placeholder='Comment'
                        onChange={e => setReport(e.target.value)}
                        fullWidth
                        autoComplete='off'
                        label='Report comment'
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='outlined' color='primary' onClick={handleHistory}>
            History
          </Button>
          <Button variant='outlined' color='primary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='outlined' color='error' onClick={handleReport}>
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export { DialogViewCard }
