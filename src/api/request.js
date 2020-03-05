import axios from "axios";

const API =
  process.env.REACT_APP_BACKEND_URL || 'https://maleteo-api.herokuapp.com'
const buildUrl = (uri = '', query = '') => `${API}${uri}${query}`

/*
export const getRequest = (uri, headers = {}) => {
  const url = buildUrl(uri)
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  })
}  */

export const getRequest = (uri, headers = {}) => {
  const url = buildUrl(uri)
  return axios.get(url, { 'headers': 
    {  Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers } })
  .then((response) => {
    console.log("Axious Response ",response.data);
    return (response.data)
  })
  .catch((error) => {
    console.log("Axious Error", error);
    return error
  }) 
}

/*
export const postRequest = (uri, data, headers = {}) => {
  const url = buildUrl(uri)

  console.log('Axious Post with ' + JSON.stringify(data))

  return fetch(url, {
    method: 'POST',
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  });
}*/

// Using fetch

export const postRequest = (uri, body, headers = {}) => {
  const url = buildUrl(uri)

  console.log('Post with ' + JSON.stringify(body))
  // TODO igual que al anterior, cambiar por axios
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  });
}


