// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const AnalyticsPerformance = props => {
  // ** Hook
  const theme = useTheme()
  console.log(props.radar_data)
  const series = [
    {
      name: 'Net Worth',
      data: [0, 1, 2, 3, 4]
    }
  ]

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
      /* gradient: {
        color: ['#9400D3'] */
      /* shade: 'dark',
        gradientToColors: [theme.palette.warning.main, theme.palette.primary.main],
        shadeIntensity: 1,
        type: 'vertical',
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100] }*/
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
  )
}

export default AnalyticsPerformance
