// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TabConnections = () => {
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
    </Grid>
  )
}

export default TabConnections
