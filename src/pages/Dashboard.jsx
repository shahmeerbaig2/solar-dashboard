import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { DASHBOARD_ROUTE } from "../APIGateway";
// import { GoPrimitiveDot } from 'react-icons/go';
// import { Stacked, Button, SparkLine } from '../components';
// import {  SparklineAreaData } from '../data/dummy';
// import { useStateContext } from '../contexts/ContextProvider';
// import Highchart from './Highchart';
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import './dashboard.css'


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
// import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
// import ViewWeekIcon from '@mui/icons-material/ViewWeek';
// import SolarPowerIcon from '@mui/icons-material/SolarPower';
// import './dashboard.css';

// import { DASHBOARD_ROUTE } from '../APIGateway';

function Dashboard() {
  const [inverterData, setInverterData] = useState({
    id: null,
    grid_power: null,
    battery_soc: null,
    solar_power: null,
  });

  const [chartOptions, setChartOptions] = useState({
    title: {
      text: 'Power Values',
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Power (Watts)',
      },
    },
    series: [
      {
        name: 'Grid Power',
        data: [],
      },
      {
        name: 'Load Power',
        data: [],
      },
      {
        name: 'Solar Power',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchInverterData = async () => {
      try {
        const response = await axios.get(DASHBOARD_ROUTE);
        setInverterData(response.data);
        const { grid_power, load_power, solar_power } = response.data;

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          xAxis: {
            categories: [...prevOptions.xAxis.categories, new Date().toLocaleTimeString()],
          },
          series: [
            {
              ...prevOptions.series[0],
              data: [...prevOptions.series[0].data, grid_power],
            },
            {
              ...prevOptions.series[1],
              data: [...prevOptions.series[1].data, load_power],
            },
            {
              ...prevOptions.series[2],
              data: [...prevOptions.series[2].data, solar_power],
            },
          ],
        }));

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      fetchInverterData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5">
      <div className="row">
        <div className="column">
          <div className="card">
            <h3 className="title">Battery Status</h3>
            <p className="icon">
              <BatteryCharging80Icon />
            </p>
            <p className="title">{inverterData.battery_soc}%</p>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <h3 className="title">Inverter Status</h3>
            <p className="icon">
              <PivotTableChartIcon />
            </p>
            <p className="title">{inverterData.battery_soc}%</p>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <h3 className="title">Grid Status</h3>
            <p className="icon">
              <ViewWeekIcon />
            </p>
            <p className="title">{inverterData.grid_power} Watts</p>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <h3 className="title">PV Solar</h3>
            <p className="icon">
              <SolarPowerIcon />
            </p>
            <p className="title">{inverterData.solar_power} Watts</p>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
}

export default Dashboard;
