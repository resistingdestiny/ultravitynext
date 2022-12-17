// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import ViewContract from 'src/views/dashboards/analytics/ViewContract'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogViewCard = props => {
  const [contract, setContract] = useState('')
  const [chain, setChain] = useState('ethereum')
  const [chartData, setChartData] = useState([])

  // ** States
  const [show, setShow] = useState(true)

  const handleClose = () => {
    setShow(false)
  }
  console.log(props.rowData.row.longevity)
  useEffect(() => {
    setChartData([
      props.rowData.row.longevity,
      props.rowData.row.reliability,
      props.rowData.row.credibility,
      props.rowData.row.popularity,
      props.rowData.row.immutability
    ])
  }, [])
  console.log(chartData)
  return (
    <Card>
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
              View Contract
            </Typography>
            <Typography variant='body2'>Contract address: {props.rowData.id.substr(0, 42)}</Typography>
          </Box>

          <ViewContract chartData={chartData} />
          <Typography variant='body2'>{props.rowData.row.recommendation}</Typography>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export { DialogViewCard }
