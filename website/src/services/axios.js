import axios from 'axios';

axios.defaults.timeout = 8000;

export const APIClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASEURL}/`,
});
