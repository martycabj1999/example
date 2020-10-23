import axios from 'axios'

let axiosInstance = axios.create({
  baseURL: process.env.BACK_URL,
  timeout: 60,
  headers: {
    accept: 'application/json'
  }
})

/*const access_token = localStorage.getItem('access_token')
if (access_token) {
  axiosInstance.defaults.headers.common['authorization'] = 'Bearer '+ access_token
}*/

export let ai = axiosInstance;

axiosInstance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

class HttpRequest {
  constructor(entity) {
    this.entity = entity;
    this.axios = axios;
    this.axiosInstance = axiosInstance;
  }

  setHeader(header) {
    axiosInstance.defaults.headers.common[header.key] = header.value
    axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
  }

  fetchAll() {
    return axiosInstance.get(this.entity)
  }

  fetch(id) {
    return axiosInstance.get(this.entity + "/" + id)
  }

  fetchFilters(filters) {
    return axiosInstance.get(this.entity + filters)
  }

  create(data) {
    return axiosInstance.post( this.entity, data)
  }

  update(id, data) {
    return axiosInstance.put( this.entity + "/" + id, data)
  }

  delete(id) {
    return axiosInstance.delete( this.entity + "/" + id)
  }

  request(type, url, data) {
    let promise = null
    switch (type) {
      case 'GET':
        promise = axios.get(url, {params: data});
        break
      case 'POST':
        promise = axios.post(url, data);
        break
      case 'PUT':
        promise = axios.put(url, data);
        break
      case 'DELETE':
        promise = axios.delete(url, data);
        break
      default :
        promise = axios.get(url, {params: data});
        break
    }
    return promise
  }
}

export default HttpRequest
