import React, {useContext} from "react";
import {ArticleContext} from '../../../../context/articleContext'
import Article from "../article/Article";

const ArticleList = () => {

    const [articles, setArticles] = useContext(ArticleContext);
    return (
        <div className="row mt-2">
            <div className="col-12">
                <h3>Novedades</h3>
                <div className="row display-flex">

                    {
                        articles.map((article)=> {
                            return (
                                <Article content={article} />
                            )
                        })
                    }
                </div>

            </div>


        </div>
    )
};

export default ArticleList;
