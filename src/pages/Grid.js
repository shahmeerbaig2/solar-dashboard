import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Grid.css';
import { GRID_ROUTE } from './APIGateway';

function Grid({ inverterId }) {
  const [grid, setGrid] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch inverter grid data from backend
    axios.get(GRID_ROUTE,{inverterId})
      .then(response => {
        setGrid(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [inverterId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Update inverter grid data in backend
    axios.put(GRID_ROUTE,{inverterId},grid)
      .then(response => {
        setGrid(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGrid({ ...grid, [name]: value });
  };

  return (
    <div className="grid-container">
      <h2>Grid</h2>
      <table className="grid-table">
        <tbody>
          <tr>
            <td>Grid Type:</td>
            <td>{grid.gridType}</td>
          </tr>
          <tr>
            <td>Grid Voltage High:</td>
            <td>{grid.gridVoltageHigh}</td>
          </tr>
          <tr>
            <td>Grid Voltage Low:</td>
            <td>{grid.gridVoltageLow}</td>
          </tr>
          <tr>
            <td>Grid Frequency:</td>
            <td>{grid.gridFrequency}</td>
          </tr>
          <tr>
            <td>Grid Frequency High:</td>
            <td>{grid.gridFrequencyHigh}</td>
          </tr>
          <tr>
            <td>Grid Frequency Low:</td>
            <td>{grid.gridFrequencyLow}</td>
          </tr>
        </tbody>
      </table>
      {isEditing ? (
        <div>
          <label className="grid-input-label" htmlFor="grid-type-input">Grid Type:</label>
          <input className="grid-input" type="text" id="grid-type-input" name="gridType" value={grid.gridType} onChange={handleInputChange} />
          <label className="grid-input-label" htmlFor="grid-voltage-high-input">Grid Voltage High:</label>
          <input className="grid-input" type="text" id="grid-voltage-high-input" name="gridVoltageHigh" value={grid.gridVoltageHigh} onChange={handleInputChange} />
          <label className="grid-input-label" htmlFor="grid-voltage-low-input">Grid Voltage Low:</label>
          <input className="grid-input" type="text" id="grid-voltage-low-input" name="gridVoltageLow" value={grid.gridVoltageLow} onChange={handleInputChange} />
          <label className="grid-input-label" htmlFor="grid-frequency-input">Grid Frequency:</label>
          <input className="grid-input" type="text" id="grid-frequency-input" name="gridFrequency" value={grid.gridFrequency} onChange={handleInputChange} />
          <label className="grid-input-label" htmlFor="grid-frequency-high-input">Grid Frequency High:</label>
          <input className="grid-input" type="text" id="grid-frequency-high-input" name="gridFrequencyHigh" value={grid.gridFrequencyHigh} onChange={handleInputChange} />
          <label className="grid-input-label" htmlFor="grid-frequency-low-input">Grid Frequency Low``:</label>
          <input className="grid-input" type="text" id="grid-frequency-low-input" name="gridFrequencyLow" value={grid.gridFrequencyLow} onChange={handleInputChange} />
          <br />
          <div grid-buttons>
            <button className="grid-button" onClick={handleSaveClick}>Save</button>
            <button className="grid-button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <button className="grid-button-secondary" onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Grid;
