// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import DialogAddCard from 'src/views/pages/dialog-examples/DialogAddCard'
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
// ** Demo Components Imports
import useFirebaseAuth from 'src/hooks/useFirebaseAuth.js'
import { updateItem, deleteItem, useItemsByOwner } from 'src/util/db'
import { useEffect } from 'react'

import AnalyticsCongratulations from 'src/views/dashboards/analytics/AnalyticsCongratulations'
import { useLatestItemByOwner } from 'src/util/db.js'
import CrmTable from 'src/views/dashboards/crm/CrmTable'
const AnalyticsDashboard = () => {
  const { authUser, loading, auth, signout } = useFirebaseAuth()
  authUser ? console.log(authUser.api_calls) : console.log('no user')
  const setRefresh = () => {}
  const { data: items, status: itemsStatus, error: itemsError } = useItemsByOwner(authUser?.uid)
  useEffect(() => {
    setRefresh()
  }, [useItemsByOwner(authUser?.uid)])
  let contract_data = []
  if (itemsStatus === 'success') {
    contract_data = items.map((item, index) => {
      return {
        id: item.id,
        created_at: item.created_at,
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
  const { data: latest, status: latestStatus, error: latestError } = useLatestItemByOwner(authUser?.uid)
  let firstItem = []
  let firstRadar = []
  let series = []
  if (latest && latest.length > 0) {
    const firstItem = latest.slice(0, 1)
    const firstRadar = firstItem[0][0].radar_chart
    console.log(firstRadar)
    series = [
      {
        name: 'Contract Data',
        data: [
          firstRadar.longevity,
          firstRadar.reliability,
          firstRadar.credibility,
          firstRadar.popularity,
          firstRadar.immutability
        ]
      }
    ]
  } else {
    console.log('no radar data')
  }
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    legend: {
      markers: { offsetX: -2 },
      itemMargin: { horizontal: 10 },
      labels: { colors: theme.palette.text.secondary }
    },
    plotOptions: {
      radar: {
        size: 100,
        polygons: {
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider
        }
      }
    },
    fill: {
      type: 'solid',
      color: ['#9400D3']
    },
    colors: ['#9400D3'],
    labels: ['Immutability', 'Reliability', 'Credibility', 'Longevity', 'Popularity'],
    markers: { size: 0 },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '14px',
          colors: [
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled
          ]
        }
      }
    },
    yaxis: { show: false },
    grid: { show: false }
  }
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={4}>
          <AnalyticsCongratulations user_id={authUser ? authUser.uid : 'missing'} signout={signout} />
        </Grid>
        <Grid item md={4} sm={3} xs={12}>
          <DialogAddCard setRefresh={setRefresh} user_id={authUser ? authUser.uid : 'missing'} />
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
          <Card>
            <CardHeader
              title='Last Contract'
              action={
                <OptionsMenu
                  options={['Last 28 Days', 'Last Month', 'Last Year']}
                  iconButtonProps={{ size: 'small', className: 'card-more-options' }}
                />
              }
            />
            <CardContent
              sx={{
                pt: { xs: `${theme.spacing(6)} !important`, md: `${theme.spacing(0)} !important` },
                pb: { xs: `${theme.spacing(8)} !important`, md: `${theme.spacing(5)} !important` }
              }}
            >
              <ReactApexcharts type='radar' height={278} series={series} options={options} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <CrmTable contract_data={contract_data} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
