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
import useFirebaseAuth from 'src/hooks/useFirebaseAuth.js'
import { updateItem, deleteItem, useItemsByOwner } from 'src/util/db'
import AnalyticsPerformance from 'src/views/dashboards/analytics/AnalyticsPerformance'

import AnalyticsCongratulations from 'src/views/dashboards/analytics/AnalyticsCongratulations'
import { useLatestItemByOwner } from 'src/util/db.js'
import CrmTable from 'src/views/dashboards/crm/CrmTable'
const AnalyticsDashboard = () => {
  /* 
  const radar_data = useLatestItemByOwner(authUser ? authUser.uid : 'missing')
  if (radar_data && radar_data.length > 0) {
    console.log(radar_data)
  }
 */

  const { authUser, loading, auth, signout } = useFirebaseAuth()
  authUser ? console.log(authUser.api_calls) : console.log('no user')
  const { data: items, status: itemsStatus, error: itemsError } = useItemsByOwner(authUser?.uid)
  let contract_data = []
  if (itemsStatus === 'success') {
    contract_data = items.map((item, index) => {
      return {
        id: item.id,
        name: item.id.substr(0, 20).concat('...'),
        score: item[0].total_score, //item[item.length - 2].recent_contract.score.total_score
        longevity: item[0].radar_chart.longevity,
        immutability: item[0].radar_chart.immutability,
        popularity: item[0].radar_chart.popularity,
        reliability: item[0].radar_chart.reliability,
        credibility: item[0].radar_chart.credibility,
        recommendation: item[0].recommendation
      }
    })
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={4}>
          <AnalyticsCongratulations user_id={authUser ? authUser.uid : 'missing'} signout={signout} />
        </Grid>
        <Grid item md={4} sm={3} xs={12}>
          <DialogAddCard user_id={authUser ? authUser.uid : 'missing'} />
        </Grid>
        <Grid item xs={6} md={2}>
          <CardStatisticsVertical
            stats='N/A'
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
          <CrmTable contract_data={contract_data} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
