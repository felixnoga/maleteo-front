import Axios from 'axios'

//Articles API services
export const getAllArticles = () => {
  return Axios.get(`${process.env.REACT_APP_BACKEND_URL}/articles/all`)
    .then(res => {
      return res.data
    })
    .catch(e => {
      console.log(e.message)
    })
}

//Sites API services

export const getAllSites = () => {
  return Axios.get(`${process.env.REACT_APP_BACKEND_URL}/site/all`)
    .then(res => {
      console.log('SITES', res.data)
      return res.data
    })
    .catch(e => {
      console.log(e.message)
    })
}

export const getNearestSites = location => {
  return Axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/site/nearest`,
    location,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then(res => res.data)
    .catch(e => {
      console.log(e)
    })
}

//Files API Services

export const submitFiles = files => {
  return Axios.post(`${process.env.REACT_APP_BACKEND_URL}/file/upload`, files, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    }
  })
    .then(res => console.log(res.data))
    .catch(e => console.log(e.message))
}
