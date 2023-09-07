import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './battery.css';

function Battery() {
  const [inverterInfo, setInverterInfo] = useState({
    inverter_id: null,
    inverter_name: null,
    inverter_temperature: null,
    battery_info: {},
    solar_arrays: [],
    load_info: [],
  });

  useEffect(() => {
    const fetchInverterInfo = async () => {
      try {
        const response = await axios.get(
          'http://124.29.208.21:8081/api/inverters/7/inverter-info'
        );
        setInverterInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      fetchInverterInfo();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 250,
      style: {
        fontFamily: 'Arial, sans-serif',
      },
    },
    title: {
      text: null,
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          inside: true,
          format: '{point.y}',
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#fff',
            textOutline: 'none',
          },
        },
      },
    },
    series: [
      {
        name: '',
        data: [
          {
            name: 'Temperature',
            y: inverterInfo.battery_info.battery_temperature || 0,
          },
          {
            name: 'Voltage',
            y: inverterInfo.battery_info.battery_voltage || 0,
          },
          {
            name: 'State of Charge',
            y: inverterInfo.battery_info.battery_soc || 0,
          },
          {
            name: 'Current',
            y: inverterInfo.battery_info.battery_current || 0,
          },
          {
            name: 'Power',
            y: inverterInfo.battery_info.battery_power || 0,
          },
        ],
        color: '#007bff', // Blue color
      },
    ],
  };

  return (
    <div className="mt-5">
      <div className="rowsBattery">
        <div className="columnsBattery">
          <div className="cardsBattery">
            <h3 className="titleBattery">Battery Information</h3>
            <div className="infoBattery">
              <div>
                <span className="info-item-left-Battery">Temperature</span>
                <span className="info-item-right-Battery">
                  {inverterInfo.battery_info.battery_temperature || 0}
                  <span>&deg;C</span>
                </span>
              </div>
              <div>
                <span className="info-item-left-Battery">Voltage</span>
                <span className="info-item-right-Battery">
                  {inverterInfo.battery_info.battery_voltage || 0} V
                </span>
              </div>
              <div>
                <span className="info-item-left-Battery">State of Charge</span>
                <span className="info-item-right-Battery">
                  {inverterInfo.battery_info.battery_soc || 0} %
                </span>
              </div>
              <div>
                <span className="info-item-left-Battery">Current</span>
                <span className="info-item-right-Battery">
                  {inverterInfo.battery_info.battery_current || 0} A
                </span>
              </div>
              <div>
                <span className="info-item-left-Battery">Power</span>
                <span className="info-item-right-Battery">
                  {inverterInfo.battery_info.battery_power || 0} Watt
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chartContainer">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
}

export default Battery;
