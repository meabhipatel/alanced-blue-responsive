import axios from 'axios'

// let baseURL = 'https://alanced.pythonanywhere.com/'
// let baseURL = 'http://51.21.1.122:8000/'
// let baseURL = 'http://13.233.123.209:8000/'
let baseURL = 'https://www.api.alanced.com/'

const DataService = axios.create({
    baseURL: baseURL
})



export default DataService;
