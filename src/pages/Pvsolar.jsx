import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Pvsolar() {
  const [inverterInfo, setInverterInfo] = useState({
    inverter_id: null,
    inverter_name: null,
    inverter_temperature: null,
    battery_info: [],
    solar_arrays: [],
    load_info: [],
  });

  const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    const fetchInverterInfo = async () => {
      try {
        const response = await axios.get('http://124.29.208.21:8081/api/inverters/7/inverter-info');
        const data = response.data;

        // Prepare the data for the chart
        const chartData = data.solar_arrays.map(({ array_id, solar_power, voltage, current }) => ({
          name: array_id,
          solar_power,
          voltage,
          current,
        }));

        // Create the chart configuration
        const config = {
          chart: {
            type: 'bar',
          },
          title: {
            text: 'PV Solar Detail',
          },
          xAxis: {
            categories: chartData.map((dataPoint) => dataPoint.name),
          },
          yAxis: {
            title: {
              text: 'Values',
            },
          },
          series: [
            {
              name: 'Solar Power (watts)',
              data: chartData.map((dataPoint) => dataPoint.solar_power),
            },
            {
              name: 'Voltage (voltage)',
              data: chartData.map((dataPoint) => dataPoint.voltage),
            },
            {
              name: 'Current (amp)',
              data: chartData.map((dataPoint) => dataPoint.current),
            },
          ],
        };

        // Update the chart configuration
        setChartConfig(config);

        setInverterInfo(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchInverterInfo, 2000);

    return () => clearInterval(interval);
  }, []);

  const solarPv = ({ array_id, solar_power, voltage, current }) => (
    <div key={array_id} className='info'>
      <p>
        <span className='info-item-left'>PV Solar </span>
        <span className='info-item-right'>{array_id}</span>
      </p>
      <p>
        <span className='info-item-left'>Solar Power</span>
        <span className='info-item-right'>{solar_power} Watt</span>
      </p>
      <p>
        <span className='info-item-left'>Voltage</span>
        <span className='info-item-right'>{voltage} V</span>
      </p>
      <p>
        <span className='info-item-left'>Current</span>
        <span className='info-item-right'>{current} A</span>
      </p>
    </div>
  );

  return (
    <div className='mt-5'>
      <div className='rows'>
        <div className='columns'>
          <div className='cards'>
            <h3 className='title'>PV Solar Detail</h3>
            <div className='info'>{inverterInfo.solar_arrays.map(solarPv)}</div>
          </div>
        </div>
      </div>
      <div>
        {inverterInfo.solar_arrays.length > 0 && (
          <HighchartsReact highcharts={Highcharts} options={chartConfig} />
        )}
      </div>
    </div>
  );
}

export default Pvsolar;
