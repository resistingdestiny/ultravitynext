// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
const TabConnections = props => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title='API Documentation' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>Documentation for how to use the API here.</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='API Key List & Access' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              An API key is a simple encrypted string that identifies an application without any principal. They are
              useful for accessing public data anonymously, and are used to associate API requests with your project for
              quota and billing.
            </Typography>
            <Box sx={{ p: 4, borderRadius: 1, backgroundColor: 'action.hover', '&:not(:last-child)': { mb: 4 } }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ mr: 4 }}>
                  Current API Key
                </Typography>
                <CustomChip
                  size='small'
                  skin='light'
                  color='primary'
                  label='Full Access'
                  sx={{ textTransform: 'uppercase' }}
                />
              </Box>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 3, color: 'text.secondary', fontWeight: 600 }}>{props.user?.uid}</Typography>
                <Box component='span' sx={{ display: 'flex', cursor: 'pointer', color: 'text.secondary' }}>
                  <Icon icon='mdi:content-copy' fontSize='1rem' />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabConnections
