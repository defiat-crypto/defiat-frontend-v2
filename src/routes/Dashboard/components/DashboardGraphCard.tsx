import { makeStyles, useTheme } from '@material-ui/core'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Card } from '../../../components/Card'

const useStyles = makeStyles((theme) => ({
  card: {
    // [theme.breakpoints.up('lg')]: {

    // }
    // flex: '1'
    // maxHeight: '380px'height: '128px'
    [theme.breakpoints.up('md')]: {
      height: '432px'
    }
  },
  graph: {
    // [theme.breakpoints.up('lg')]: {

    // }
    // flex: '1'
    // maxHeight: '380px'height: '128px'
    [theme.breakpoints.up('md')]: {
      height: '380px'
    }
  }
}))

export const DashboardGraphCard = () => {
  const theme = useTheme()
  const classes = useStyles()

  const data =  (canvas:any) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,0,0,350);
    gradient.addColorStop(0, theme.palette.primary.light);
    gradient.addColorStop(1, theme.palette.background.paper);
    
    return {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: 'DFT Total Supply',
          data: [12, 19, 3, 5, 2, 3],
          fill: 'origin',
          backgroundColor: gradient,//theme.palette.primary.light,
          borderColor: theme.palette.primary.main,
          pointBackgroundColor: theme.palette.primary.dark,
        },
      ],
    }
  }
  
  const options = {
    // maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  const canvas = document.createElement('canvas');
  const chartData = data(canvas);

  return (
    <Card className={classes.card}>
      <Line data={chartData} options={options} />
    </Card>
  )
}
