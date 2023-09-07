


import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Configurations.css'
import { Button } from "@mui/material";

function Configurations() {
  const [text, setText] = useState({});
  const [model, setModel] = useState({});
  const [batteryText,setBatteryText] = useState("Use Inverter Values");

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axios.get("http://124.29.208.21:8081/api/inverters/7/inverter-info");
        setModel(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchModel();
  }, []);
  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        const response = await axios.get("http://124.29.208.21:8081/api/wifi/connected");
        setText(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNetworks();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };
  
  return (
<div class="rowConfig">

  <div class="columnConfig">
    <div class="cardConfig">
      <h3 className="titleConfig">INVERTER</h3>
      <div className='infoConfig'>
      <div><span className='info-item-left-config'>Model</span><span className='info-item-right-config'>{model.inverter_name}</span></div>
      <div><span className='info-item-left-config'>USB Port</span><span className='info-item-right-config'>{2}</span></div>
      <div><span className='info-item-left-config'>Status</span><span className='info-item-right-config'>Connected</span></div>
      </div>
    </div>
    <div class="cardConfig">
      <h3 className="titleConfig">Battery</h3>
      <div className='infoConfig'>
      <div><span className='info-item-left-config'>Battery</span><span className='info-item-right-config'>{batteryText}</span></div>
      <div><Button className='info-item-right-config'>Advanced</Button><Button className='info-item-right-config'>Disconnect</Button></div>
      </div>
    </div>
    <div class="cardConfig">
      <h3 className="titleConfig">System</h3>
      <div className='infoConfig'>
      <div><span className='info-item-left-config'>Language</span><span className='info-item-right-config'>English</span></div>
      <div><span className='info-item-left-config'>Time Zone</span><span className='info-item-right-config'>UTC +5 ISLAMABAD, PAKISTAN</span></div>
      <div><Button className='info-item-right-config btn'>Reboot</Button></div>
      </div>
    </div>
  </div>
  <div class="columnConfig">
    <div class="cardConfig">
      <h3 className="titleConfig">WIFI CONFIGURATION</h3>
      <div className='infoConfig'>
      <div><span className='info-item-left-config'>Country</span><span className='info-item-right-config'>Pakistan</span></div>
      </div>
    </div>

    <div class="cardConfig">
      <h3 className="titleConfig">SSID</h3>
      <div className='infoConfig'>
      <div><span className='info-item-left-config'>Connected Network</span><span className='info-item-right-config'>{text.connected}</span></div>
      <div><span className='info-item-left-config'>Password</span><span className='info-item-right-config'>......</span></div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Configurations;