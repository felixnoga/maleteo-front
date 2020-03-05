import React, {useState, useEffect} from "react";
import Axios from "axios";
import {getAllArticles} from "../services/apiService";

export const ArticleContext = React.createContext();

export function ArticleContextProvider({children}) {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        // Axios.get(`${process.env.REACT_APP_BACKEND_URL}/articles/all`)
        //     .then ( (res)=>{
        //         setArticles(res.data);
        //     })
        //     .catch((e) => {
        //         console.log(e.message);
        //     })
        async function apiArticles() {
            const articles = await getAllArticles();
            setArticles(articles);
        }
        apiArticles();


    }, []);

    return (
        <ArticleContext.Provider value={[articles, setArticles]}>
            {children}
        </ArticleContext.Provider>
    )

}
