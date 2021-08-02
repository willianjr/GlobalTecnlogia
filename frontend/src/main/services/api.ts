import axios from 'axios'
import auth from './auth'

const api = axios.create({
	baseURL:('http://localhost:3031/api/'
	)
})

api.interceptors.request.use(async config => {
  const token = auth.getToken();
	//console.log("tk", token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api
