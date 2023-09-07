import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import './battery.css';

function InverterSetting() {

    var option;
    const [inverterInfo,setInverterInfo] = useState({
      battery_settings:[],charging:[],ac_charging:[],battery_discharging:[],feedin_grid:[],
    });
    useEffect(() => {
      const fetchInverterInfo = async () => {
        try {
          const response = await axios.get("http://124.29.208.21:8081/api/inverter/7/settings");
          setInverterInfo(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      };
      const interval =setInterval(()=>{
        fetchInverterInfo();
        // solarPv();
      },2000)
      return () => clearInterval(interval)
      
    }, []);
  return (
    <div className="mt-5">
    <div class="rowsBattery">
  <div class="columnsBattery">
    <div class="cardsBattery">
      <h3 className='titleBattery'>Battery Setting</h3>
      <div className='infoBattery'>
      <div><span className='info-item-left-Battery'>Type</span><span className='info-item-right-Battery'>{inverterInfo.battery_settings.battery_type}</span></div>
      <div><span className='info-item-left-Battery'>Floating charge Voltage</span><span className='info-item-right-Battery'>{inverterInfo.battery_settings.floating_charge_voltage}</span></div>
      <div><span className='info-item-left-Battery'>Bulk charging voltage Voltage</span><span className='info-item-right-Battery'>{inverterInfo.battery_settings.bulk_charging_voltage} V</span></div>
      <div><span className='info-item-left-Battery'>Capacity</span><span className='info-item-right-Battery'>{inverterInfo.battery_settings.capacity_AH}</span></div>
      </div>
    </div>
    <div class="cardsBattery">
      <h3 className='titleBattery'>Charging</h3>
      <div className='infoBattery'>
      <div><span className='info-item-left-Battery'>Charging enabled</span><span className='info-item-right-Battery'>{inverterInfo.charging.charging_enabled}</span></div>
      <div><span className='info-item-left-Battery'>Charging current</span><span className='info-item-right-Battery'>{inverterInfo.charging.charging_current}</span></div>
      <div><span className='info-item-left-Battery'>PV Energy supply priority</span><span className='info-item-right-Battery'>{inverterInfo.charging.pv_energy_supply_priority}</span></div>
      </div>
    </div>
    <div class="cardsBattery">
      <h3 className='titleBattery'>AC Charging</h3>
      <div className='infoBattery'>
      <div><span className='info-item-left-Battery'>AC Charging enabled</span><span className='info-item-right-Battery'>{inverterInfo.ac_charging.ac_charging_enabled}</span></div>
      <div><span className='info-item-left-Battery'>AC Charging current</span><span className='info-item-right-Battery'>{inverterInfo.ac_charging.ac_charging_current}</span></div>
      <div><span className='info-item-left-Battery'>AC Charging start 1</span><span className='info-item-right-Battery'>{inverterInfo.ac_charging.ac_charging_start_1}</span></div>
      <div><span className='info-item-left-Battery'>AC Charging end 1</span><span className='info-item-right-Battery'>{inverterInfo.ac_charging.ac_charging_end_1}</span></div>
      <div><span className='info-item-left-Battery'>AC Charging end 2</span><span className='info-item-right-Battery'>{inverterInfo.ac_charging.ac_charging_start_2}</span></div>
      <div><span className='info-item-left-Battery'>AC Charging start 2</span><span className='info-item-right-Battery'>{inverterInfo.ac_charging.ac_charging_end_2}</span></div>
      </div>
    </div>
  </div>
  <div class="columnsBattery">

    <div class="cardsBattery">
      <h3 className='titleBattery'>Battery Discharging</h3>
      <div className='infoBattery'>
      <div><span className='info-item-left-Battery'>Max_battery_discharging_current</span><span className='info-item-right-Battery'>{inverterInfo.battery_discharging.max_battery_discharging_current}</span></div>
      <div><span className='info-item-left-Battery'>Battery_cutoff_voltage_grid_available</span><span className='info-item-right-Battery'>{inverterInfo.battery_discharging.battery_cutoff_voltage_grid_available}</span></div>
      <div><span className='info-item-left-Battery'>Battery_re_discharging_voltage_grid_available</span><span className='info-item-right-Battery'>{inverterInfo.battery_discharging.battery_re_discharging_voltage_grid_available}</span></div>
      <div><span className='info-item-left-Battery'>Battery_cutoff_voltage_grid_not_available</span><span className='info-item-right-Battery'>{inverterInfo.battery_discharging.battery_cutoff_voltage_grid_not_available}</span></div>
      <div><span className='info-item-left-Battery'>Battery_re_discharging_voltage_grid_not_available</span><span className='info-item-right-Battery'>{inverterInfo.battery_discharging.battery_re_discharging_voltage_grid_not_available}</span></div>
      <div><span className='info-item-left-Battery'>Allow_battery_to_discharge_when_pv_available</span><span className='info-item-right-Battery'>{inverterInfo.battery_discharging.allow_battery_to_discharge_when_pv_available}</span></div>
      <div><span className='info-item-left-Battery'>Allow_battery_to_discharge_when_pv_not_available</span><span className='info-item-right-Battery'>{inverterInfo.battery_discharging.allow_battery_to_discharge_when_pv_not_available}</span></div>
      </div>
    </div>
    <div class="cardsBattery">
      <h3 className='titleBattery'>Feedin Grid</h3>
      <div className='infoBattery'>
      <div><span className='info-item-left-Battery'>Feed_in_enabled</span><span className='info-item-right-Battery'>{inverterInfo.feedin_grid.feed_in_enabled}</span></div>
      <div><span className='info-item-left-Battery'>Allow_battery_to_feed_in_pv_available</span><span className='info-item-right-Battery'>{inverterInfo.feedin_grid.allow_battery_to_feed_in_pv_available}</span></div>
      <div><span className='info-item-left-Battery'>Allow_battery_to_feed_in_pv_not_available</span><span className='info-item-right-Battery'>{inverterInfo.feedin_grid.allow_battery_to_feed_in_pv_not_available}</span></div>
      <div><span className='info-item-left-Battery'>Min_grid_connect_voltage</span><span className='info-item-right-Battery'>{inverterInfo.feedin_grid.min_grid_connect_voltage}</span></div>
      <div><span className='info-item-left-Battery'>Max_grid_connect_voltage</span><span className='info-item-right-Battery'>{inverterInfo.feedin_grid.max_grid_connect_voltage}</span></div>
      <div><span className='info-item-left-Battery'>Min_grid_connect_frequency</span><span className='info-item-right-Battery'>{inverterInfo.feedin_grid.min_grid_connect_frequency}</span></div>
      <div><span className='info-item-left-Battery'>Max_grid_connect_frequency</span><span className='info-item-right-Battery'>{inverterInfo.feedin_grid.max_grid_connect_frequency}</span></div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default InverterSetting;