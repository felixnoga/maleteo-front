import React, {useState, useEffect} from "react";
import Axios from "axios";

export const ArticleContext = React.createContext()

export function ArticleContextProvider({children}) {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/articles/all`)
            .then ( (res)=>{
                setArticles(res.data);
            })
            .catch((e) => {
                console.log(e.message);
            })

    }, []);

    return (
        <ArticleContext.Provider value={[articles, setArticles]}>
            {children}
        </ArticleContext.Provider>
    )

}
