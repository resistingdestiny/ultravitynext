// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import DialogAddCard from 'src/views/pages/dialog-examples/DialogAddCard'
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports

import AnalyticsPerformance from 'src/views/dashboards/analytics/AnalyticsPerformance'

import AnalyticsCongratulations from 'src/views/dashboards/analytics/AnalyticsCongratulations'

import CrmTable from 'src/views/dashboards/crm/CrmTable'

const AnalyticsDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={4}>
          <AnalyticsCongratulations />
        </Grid>
        <Grid item md={4} sm={3} xs={12}>
          <DialogAddCard />
        </Grid>
        <Grid item xs={6} md={2}>
          <CardStatisticsVertical
            stats='5'
            color='primary'
            title='Scored'
            chipText='So Far'
            icon={<Icon icon='mdi:cart-plus' />}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <CardStatisticsVertical
            stats='10'
            color='primary'
            title='Credits'
            chipText='Remaining'
            icon={<Icon icon='mdi:cart-plus' />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsPerformance />
        </Grid>
        <Grid item xs={12} md={8}>
          <CrmTable />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
