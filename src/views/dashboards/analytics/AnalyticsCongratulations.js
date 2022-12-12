// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import useFirebaseAuth from 'src/hooks/useFirebaseAuth.js'
import Firebase from 'src/configs/firebase'

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 250,
    position: 'static'
  }
}))

const AnalyticsCongratulations = props => {
  // ** Hook
  const theme = useTheme()
  const { authUser, loading } = useFirebaseAuth()
  const user_id = props.user_id
  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' sx={{ mb: 4.5 }}>
              Welcome{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                Benedict
              </Box>
              ! 🎉
            </Typography>
            <Typography variant='body2'></Typography>
            <Typography sx={{ mb: 4.5 }} variant='body2'>
              Check your smart contracts, live safer.
            </Typography>
            <Typography sx={{ mb: 4.5 }} variant='body2'>
              Your API key is{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {user_id}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AnalyticsCongratulations
