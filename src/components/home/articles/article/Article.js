import React from "react";
import './style.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileAlt} from "@fortawesome/free-regular-svg-icons";

const Article = (props) => {
    console.log(props.content);
    const {title, body} = props.content;
    let style = {};
    if(props.content.picture_url) {
        style = {
            backgroundImage: 'url(' + props.content.picture_url + ')'
        };
    }



    return (
        <div className="col-md-4 col-sm-6 col-lg-3 mb-2">
            <div className="card text-white" id="article-card" style={style}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-3">
                            <FontAwesomeIcon icon={faFileAlt} size="3x" />
                        </div>
                        <div className="col-9">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{body}</p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <hr className="article-divider"/>
                    <p>Leer mas...</p>
                </div>
            </div>
        </div>

    );
};
export default Article;
