import React, {Component} from 'react';
import PieChart from 'react-minimal-pie-chart';
import {signalSize, signalColors} from '../constants'


const chart = ({light = 'rgy'}) => {
  let data = Array.from(light.toLowerCase());
  data = data.map(signal => {
    return {
      color: signalColors[signal],
      title: "",
      value: 1 / data.length
    }
  })

  return (
    <div className="chart">
      <PieChart
        animate={false}
        animationDuration={500}
        animationEasing="ease-out"
        cx={50}
        cy={50}
        data={data}
        label={false}
        labelPosition={50}
        lengthAngle={360}
        lineWidth={100}
        onClick={undefined}
        onMouseOut={undefined}
        onMouseOver={undefined}
        paddingAngle={0}
        radius={50}
        ratio={1}
        rounded={false}
        startAngle={0}
        style={{
          height: signalSize,
          width: signalSize
        }}
      />

    </div>
  )
}


export default chart;