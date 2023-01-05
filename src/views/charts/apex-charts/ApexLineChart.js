// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import moment from 'moment'

// ** Icon Imports

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const ApexLineChart = props => {
  const series = [
    {
      data: []
    }
  ]
  const itemHistory = props.itemHistory
  Object.keys(itemHistory).map((historyItem, index) => {
    if (typeof itemHistory[historyItem].total_score === 'number') {
      series[0].data.push(itemHistory[historyItem].total_score)
    }
  })

  // ...

  /*  if (items && items.length > 0) {
    series = items.map((item, index) => {
      return {
        data: [items[items].total_score]
      }
    })
  } */

  // ** Hook
  console.log(series)
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    colors: ['#9400D3'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#9400D3'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data) {
        return `<div class='bar-chart'>
          <span style="color: black;" >${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
        </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: Object.keys(itemHistory).map(historyItem =>
        moment(itemHistory[historyItem].timestamp * 1000).format('MM/DD/YYYY HH:mm:ss')
      )
    }
  }

  return (
    <Card>
      <CardContent>
        <ReactApexcharts type='line' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexLineChart
