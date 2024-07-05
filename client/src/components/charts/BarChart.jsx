import React from 'react'
import { Bar } from 'react-chartjs-2'

const BarChartz = ({chartData}) => {
  const options= {
    scales: {
      x: {
        stacked:true,
      },
      y:{
        stacked:true,
      }
    }
  }
  return (
    <div>
      <Bar data={chartData}   />
    </div>
  )
}

export default BarChartz