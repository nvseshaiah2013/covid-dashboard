import axios from 'axios';
import { ZONES_INDIA, UPDATES, COUNTRY_DATA, DISTRICT_WISE } from '../constants/urls';

export const zones = () => axios.get(ZONES_INDIA).then((zones) => zones.data);
export const updates = () => axios.get(UPDATES).then((updates) => updates.data);
export const countryData = () => axios.get(COUNTRY_DATA).then((countryData) => countryData.data);
export const districtWiseData = () => axios.get(DISTRICT_WISE).then((districtWiseData) => districtWiseData.data);

