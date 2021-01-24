import { makeStyles, useTheme } from '@material-ui/core'
import React, { useCallback } from 'react'
import { Line } from 'react-chartjs-2'
import { Card } from '../../../components/Card'
import { useDashboard } from '../../../hooks/useDashboard'

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
  const {events} = useDashboard()

  const data = useCallback((canvas:any) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,0,0,350);
    gradient.addColorStop(0, theme.palette.primary.light);
    gradient.addColorStop(1, theme.palette.background.paper);
    
    return {
      labels: events ? events.map((_, i) => i.toString()) : [],
      datasets: [
        {
          label: 'DFT Total Supply',
          data: events ? events : [],
          fill: 'origin',
          backgroundColor: gradient,//theme.palette.primary.light,
          borderColor: theme.palette.primary.main,
          pointBackgroundColor: theme.palette.primary.dark,
        },
      ],
    }
  }, [events, theme])
  
  const options = {
    // maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month',
          
        },
        ticks: {
          stepValue: 10,
          steps: 10,
          beginAtZero: false
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: false,
          min: 475000,
          steps: 10,
          stepValue: 5,
          max: 500000
        }
      }]
    }
  }

  const canvas = document.createElement('canvas');
  const chartData = data(canvas);

  return (
    <Card className={classes.card}>
      <Line data={chartData} options={options} />
    </Card>
  )
}
