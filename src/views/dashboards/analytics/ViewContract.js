// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const ViewContract = props => {
  const series = [
    {
      name: 'Net Worth',
      data: props.chartData
    }
  ]

  // ** Hook
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
    labels: ['Popularity', 'Credibility', 'Reliability', 'Longevity', 'Immutability'],
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

export default ViewContract
