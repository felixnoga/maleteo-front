import React from "react";
import FormFindKeeper from "./FormFindKeeper";
import ArticleList from "./articles/articleList/ArticleList";
import {ArticleContextProvider} from "../../context/articleContext";

const Home = () => {
    return (
        <div className="container-fluid">
            <FormFindKeeper/>
            <ArticleContextProvider>
                <ArticleList/>
            </ArticleContextProvider>

        </div>
    )
};

export default Home;
