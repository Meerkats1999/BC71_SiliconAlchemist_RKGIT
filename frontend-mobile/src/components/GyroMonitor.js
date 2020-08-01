import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import {VictoryArea, VictoryAxis, VictoryChart, VictoryTheme} from "victory-native";
import {accelerometer} from "react-native-sensors";
import {sendGyroData} from "../API";


export default class GyroMonitor extends React.Component {
  state ={
    data:[1,2,3]
  }
  componentDidMount() {
    accelerometer.subscribe(({x, y, z, timestamp}) => {
        this.pushData(Math.sqrt(x * x + y * y + z * z) - 9);
      }
    );
  }
  pushData = (value)=>{
    const data = this.state.data;
    data.push(value);
    data.shift();
    this.setState({data});
  }

  render() {
    return (
      <VictoryChart
        // theme={VictoryTheme.material}
        width={Dimensions.get('window').width}
        height={150}
      >
        <VictoryArea data={this.state.data}     style={{ data: { fill: "grey" } }}
        />
        <VictoryAxis style={{
          axis: {stroke: "transparent"},
          ticks: {stroke: "transparent"},
          tickLabels: { fill:"transparent"}
        }}/>

      </VictoryChart>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    width: Dimensions.get('window').width,
  },
});
