import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/v1',
    timeout: 2500,
});

export default API;
