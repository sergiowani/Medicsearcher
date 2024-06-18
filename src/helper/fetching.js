import axios from 'axios';

export const fetchData = async (url, method, headers = null, body = null) =>{
  return axios[method](url, JSON.parse(headers), JSON.parse(body));
};
