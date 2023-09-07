import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PowerManagement.css';

const PowerManagement = () => {
  const [data, setData] = useState([]);
  const [editable, setEditable] = useState(false);
  const [editableData, setEditableData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://124.29.208.21:8081/api/7/power_management_schedules')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setEditableData(data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleEditAll = () => {
    setEditable(!editable);
  };

  const handleSaveAll = async () => {
    try {
      // Perform PUT request to update data at the backend
      await axios.put('http://124.29.208.21:8081/api/7/power_management_schedules', editableData);

      // Update local state with the saved data
      setData(editableData);
      setEditable(false);
    } catch (error) {
      console.log(error);
      console.log("Request not made")
      // Handle error gracefully
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedEditableData = [...editableData];
    updatedEditableData[index][field] = value;
    setEditableData(updatedEditableData);
  };

  return (
    <div className="table-container">
      <table className="my-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Power (Watt)</th>
            <th>State of Charge %</th>
            <th>Voltage (V)</th><th>Grid Charge</th><th>Charge</th><th>Charge power Grid not Present</th>
          </tr>
        </thead>
        <tbody>
          {editableData.map((item, index) => (
            <tr key={item.id}>
              <td>{item.schedule_id}</td>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editableData[index].start_time}
                    onChange={e => handleInputChange(index, 'start_time', e.target.value)}
                  />
                ) : (
                  item.start_time
                )}
              </td>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editableData[index].end_time}
                    onChange={e => handleInputChange(index, 'end_time', e.target.value)}
                  />
                ) : (
                  item.end_time
                )}
              </td>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editableData[index].power}
                    onChange={e => handleInputChange(index, 'power', e.target.value)}
                  />
                ) : (
                  item.power
                )}
              </td>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editableData[index].state_of_charge}
                    onChange={e => handleInputChange(index, 'state_of_charge', e.target.value)}
                  />
                ) : (
                  item.state_of_charge
                )}
              </td>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editableData[index].voltage}
                    onChange={e => handleInputChange(index, 'voltage', e.target.value)}
                  />
                ) : (
                  item.voltage
                )}
              </td>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editableData[index].grid_charge}
                    onChange={e => handleInputChange(index, 'grid_charge', e.target.value)}
                  />
                ) : (
                  item.grid_charge
                )}
              </td>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editableData[index].charge}
                    onChange={e => handleInputChange(index, 'charge', e.target.value)}
                  />
                ) : (
                  item.charge
                )}
              </td>
              <td>
                {editable ? (
                  <input
                    type="text"
                    value={editableData[index].charge_power_grid_not_present}
                    onChange={e => handleInputChange(index, 'charge_power_grid_not_present', e.target.value)}
                  />
                ) : (
                  item.charge_power_grid_not_present
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              {editable ? (
                <button className="save-button" onClick={handleSaveAll}>Save</button>
              ) : (
                <button className="edit-button" onClick={handleEditAll}>Edit</button>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PowerManagement;