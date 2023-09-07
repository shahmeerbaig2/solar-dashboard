import React from 'react';
// import { Header } from '../components';
import { useState,useEffect } from 'react';
import axios from "axios";
import './inverter.css';

const solarPv = ({array_id,solar_power,voltage,current}) => (
  <div key={array_id} class='info'>
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
  )

function Inverter() {

  const [inverterInfo,setInverterInfo] = useState({
    inverter_id:null,
    inverter_name:null,
    inverter_temperature:null,
    battery_info:[],solar_arrays:[],
    load_info:[],

  });
  const [inverterData,setInverterData] = useState({
  })
  useEffect(() => {
    const fetchInverterInfo = async () => {
      try {
        const response = await axios.get("http://124.29.208.21:8081/api/inverters/7/inverter-info");
        setInverterInfo(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    const fetchInverterData = async () => {
      try {
        const response = await axios.get("http://124.29.208.21:8081/api/7/inverter-data");
        setInverterData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    const interval =setInterval(()=>{
      fetchInverterInfo();
      fetchInverterData();
    },2000)
    return () => clearInterval(interval)
    
  }, []);
  return (
    <div className="mt-5">
    <div class="rows">
  <div class="columns">
    <div class="cards">
      <h3 className='title'>PV Solar Detail</h3>
      <div className='info'>
      <div>{inverterInfo.solar_arrays.map(solarPv)}</div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="cards">
      <h3 className='title'>Grid Detail</h3>
      <div className='info'>
      <div><span className='info-item-left'>Power</span><span className='info-item-right'>{inverterInfo.grid_power}</span></div>
      {/* <div><span className='info-item-left'>Temperature</span><span className='info-item-right'>0<span>&deg;C</span></span></div>
      <div><span className='info-item-left'>AC Output Power</span><span className='info-item-right'>0 Watt</span></div>
      <div><span className='info-item-left'>AC Output Voltage</span><span className='info-item-right'>0 V</span></div>
      <div><span className='info-item-left'>AC Output Frequency</span><span className='info-item-right'>0 Hz</span></div> */}
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="cards">
      <h3 className='title'>Inverter Detail</h3>
      <div className='info'>
      <div><span className='info-item-left'>Name</span><span className='info-item-right'>{inverterInfo.inverter_name}</span></div>
      <div><span className='info-item-left'>Temperature</span><span className='info-item-right'>{inverterInfo.inverter_temperature}<span>&deg;C</span></span></div>
      {/* <div><span className='info-item-left'>AC Output Power</span><span className='info-item-right'> Watt</span></div>
      <div><span className='info-item-left'>AC Output Voltage</span><span className='info-item-right'>0 V</span></div>
      <div><span className='info-item-left'>AC Output Frequency</span><span className='info-item-right'>0 Hz</span></div> */}
      </div>
    </div>
  </div>
  
  <div class="columns">
    <div class="cards">
      <h3 className='title'>Load</h3>
      <div className='info'>
      <div><span className='info-item-left'>Heavy Load Power</span><span className='info-item-right'>{inverterInfo.load_info.heavy_load_power} Watts</span></div>
      <div><span className='info-item-left'>Essential Load Power</span><span className='info-item-right'>{inverterInfo.load_info.essential_load_power} Watts</span></div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Inverter;
