import Axios from "axios";


//Articles API services
export const getAllArticles = () => {
   return Axios.get(`${process.env.REACT_APP_BACKEND_URL}/articles/all`)
        .then ( (res)=>{
            return(res.data);
        })
        .catch((e) => {
            console.log(e.message);
        })
};

//Sites API services

export const getAllSites = () => {

    return Axios.get(`${process.env.REACT_APP_BACKEND_URL}/site/all`)
        .then ( (res)=>{
            return res.data;
        })
        .catch((e) => {
            console.log(e.message);
        })
};

export const getNearestSites = (location) => {
    return Axios.put(`${process.env.REACT_APP_BACKEND_URL}/site/nearest`, location, {
        headers: { Accept: 'application/json',
            'Content-Type': 'application/json' }
    })
        .then(res => {console.log('FROM API', res.data); return res.data; })
        .catch(e => {console.log(e)});
};

export const putNewBooking = (data) => {
    return Axios.put(`${process.env.REACT_APP_BACKEND_URL}/booking/create`,
        {
            startDate: data.startDate,
            endDate: data.endDate,
            suitcasesPieces: data.suitcasesPieces,
            keeper: data.keeper,
            site: data.site
        },
        { headers: {"Authorization" : data.token}})
        .then(res => res.data)
        .catch(e => {console.log(e.message)});
};

export const getUserBookings = (token)=> {
  return Axios.get(`${process.env.REACT_APP_BACKEND_URL}/booking`,{
      headers: {"Authorization": token}})
      .then(res => res.data)
      .catch(err => {console.log(err.message)});
    // console.log('ESTO ES',id, token);
};
