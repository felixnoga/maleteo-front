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
