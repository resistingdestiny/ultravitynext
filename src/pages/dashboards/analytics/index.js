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
        <Grid item xs={12} md={8}>
          <AnalyticsCongratulations />
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
        {/* <Grid item xs={6} md={2}>
          <AnalyticsSessions />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsTotalTransactions />
        </Grid> */}
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsPerformance />
        </Grid>
        <Grid item xs={12} md={8}>
          <CrmTable />
        </Grid>

        {/* <Grid item xs={12} sm={6} md={4}>
          <AnalyticsProjectStatistics />
        </Grid> */}
        {/*  <Grid item xs={12} sm={6} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <AnalyticsTotalRevenue />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVertical
                stats='$13.4k'
                color='success'
                trendNumber='+38%'
                title='Total Sales'
                chipText='Last Six Month'
                icon={<Icon icon='mdi:currency-usd' />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVertical
                color='info'
                stats='142.8k'
                trendNumber='+62%'
                chipText='Last One Year'
                title='Total Impressions'
                icon={<Icon icon='mdi:link' />}
              />
            </Grid>
            <Grid item xs={6}>
              <AnalyticsOverview />
            </Grid>
          </Grid>
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <AnalyticsSalesCountry />
        </Grid> */}
        {/*  <Grid item xs={12} md={8}>
          <AnalyticsTopReferralSources />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsWeeklySales />
        </Grid> */}
        {/*    <Grid item xs={12} sm={6} md={4}>
          <AnalyticsVisitsByDay />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsActivityTimeline />
        </Grid> */}
        <Grid item md={4} sm={6} xs={12}>
          <DialogAddCard />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
