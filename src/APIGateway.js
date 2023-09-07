// export const API_BASE_URL = "http://192.168.88.48:8080/api";

export const API_BASE_URL = "http://124.29.208.21:8081/api";

// Route for logging in a user
export const LOGIN_ROUTE = `${API_BASE_URL}/login`;

// Route for dashboard in a user
export const DASHBOARD_ROUTE = `${API_BASE_URL}/dashboard`;

// Route for fetching and updating the specification data
export const SPECIFICATION_ROUTE = (inverterId) => `${API_BASE_URL}/inverters/${inverterId}/specification`;

// Route for fetching and updating the grid data
export const GRID_ROUTE = (inverterId) => `${API_BASE_URL}/inverters/${inverterId}/grid`;

// Route for fetching and updating the auxiliary load data
export const AUX_LOAD_ROUTE = (inverterId) => `${API_BASE_URL}/inverters/${inverterId}/auxiliary-load`;

// Route for fetching and updating the battery type data
export const BATTERY_TYPE_ROUTE = (inverterId) => `${API_BASE_URL}/inverters/${inverterId}/battery-type`;

// Route for fetching and updating the battery charging data
export const BATTERY_CHARGING_ROUTE = (inverterId) => `${API_BASE_URL}/inverters/${inverterId}/battery-charging`;

// Route for fetching and updating the work mode data
export const WORK_MODE_ROUTE = (inverterId) => `${API_BASE_URL}/inverters/${inverterId}/work-mode`;

// Route for fetching List of Inverters
export const INVERTERS_ROUTE =  `${API_BASE_URL}/inverters`;

// Route for fetching battery charging schedules
export const BATTERY_CHARGING_SCHEDULE_ROUTE = `${API_BASE_URL}/battery_charging_schedules`;

// Route for fetching battery charging schedules
export const BATTERY_CHARGING_UPDATE_SCHEDULE_ROUTE = (scheduleId) => `${API_BASE_URL}/battery_charging_schedules`;

// Route for fetching List of usb devices
export const USB_DEVICES_ROUTE =  `${API_BASE_URL}/usbdevices`;

// Route for fetching List of connected wifi nerworks
export const WIFI_CONNECTED_DEVICES_ROUTE =  `${API_BASE_URL}/wifi/connected`;

// Route for fetching List OF available wifi nerworks
export const WIFI_AVAILABLE_DEVICES_ROUTE =  `${API_BASE_URL}/wifi/networks`;

// Route for wifi connect
export const WIFI_CONNECT_ROUTE =  `${API_BASE_URL}/wifi/connect`;
// Route for wifi connect
export const INVERTER_INFO_ROUTE = (inverterId) => `${API_BASE_URL}/inverters/${inverterId}/inverter-info`;