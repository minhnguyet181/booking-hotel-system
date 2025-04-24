import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

export default api;

// api.get('/users')
//   .then(res => console.log(res.data))
//   .catch(err => console.error(err));
