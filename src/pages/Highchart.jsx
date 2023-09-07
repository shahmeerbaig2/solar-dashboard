import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import { DASHBOARD_ROUTE } from "../APIGateway";

highchartsMore(Highcharts);
solidGauge(Highcharts);

function HighchartPage() {
  const [inverterData, setInverterData] = useState({
    id: null,
    grid_power: null,
    battery: null,
    load_power: null,
    battery_power: null,
    solar_power: null,
  });

  useEffect(() => {
    const fetchInverterData = async () => {
      try {
        const response = await axios.get(DASHBOARD_ROUTE);
        setInverterData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInverterData();
  }, []);

  const gaugeContainerStyle = {
    width: "150px",
    height: "150px",
  };

  const dialChartOptions = {
    chart: {
      type: "solidgauge",
    },
    title: {
      text: "Solar Production",
    },
    // ...other options...
    series: [
      {
        name: "Value",
        data: [parseFloat(inverterData.solar_power) || 0],
        // ...other series options...
      },
    ],
  };

  const dialChartOptions1 = {
    chart: {
      type: "solidgauge",
    },
    title: {
      text: "Grid Power",
    },
    // ...other options...
    series: [
      {
        name: "Value",
        data: [parseFloat(inverterData.grid_power) || 0],
        // ...other series options...
      },
    ],
  };

  const dialChartOptions2 = {
    chart: {
      type: "solidgauge",
    },
    title: {
      text: "Load Power",
    },
    // ...other options...
    series: [
      {
        name: "Value",
        data: [parseFloat(inverterData.load_power) || 0],
        // ...other series options...
      },
    ],
  };

  const dialChartOptions3 = {
    chart: {
      type: "solidgauge",
    },
    title: {
      text: "Battery Power",
    },
    // ...other options...
    series: [
      {
        name: "Value",
        data: [parseFloat(inverterData.battery_power) || 0],
        // ...other series options...
      },
    ],
  };

  return (
    <div className="highchart-page">
      <h1>Highchart Page</h1>
      <div className="gauge-container" style={gaugeContainerStyle}>
        <HighchartsReact highcharts={Highcharts} options={dialChartOptions} />
      </div>
      <div className="gauge-container" style={gaugeContainerStyle}>
        <HighchartsReact highcharts={Highcharts} options={dialChartOptions1} />
      </div>
      <div className="gauge-container" style={gaugeContainerStyle}>
        <HighchartsReact highcharts={Highcharts} options={dialChartOptions2} />
      </div>
      <div className="gauge-container" style={gaugeContainerStyle}>
        <HighchartsReact highcharts={Highcharts} options={dialChartOptions3} />
      </div>
    </div>
  );
}




export default HighchartPage;
