import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch, faCalendarAlt, faSuitcase} from "@fortawesome/free-solid-svg-icons";

const FormFindKeeper = () => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="row mt-2">
            <div className="col-12">
                <h3>Encuentra tu guardian</h3>
            </div>

            <div className="col-12">
                <form onSubmit={handleFormSubmit}>

                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <label htmlFor="keeper-localization"></label>
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-primary bg-white border-right-0"><FontAwesomeIcon icon={faSearch} /></div>
                                </div>
                                <input id="keeper-localization" type="text" className="form-control border-left-0" name="keeper-localization" placeholder="Introduce dirección" />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-6">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-primary bg-white border-right-0"><FontAwesomeIcon icon={faCalendarAlt} /></div>
                                </div>
                                <input id="start-date" type="date" className="form-control border-left-0" name="start-date" placeholder="Fecha de entrada" />
                            </div>
                        </div>
                        <div className="col-6 mb-2">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-primary bg-white border-right-0"><FontAwesomeIcon icon={faCalendarAlt} /></div>
                                </div>
                                <input id="end-date" type="date" className="form-control border-left-0" name="end-date" placeholder="Fecha de salida" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-primary bg-white border-right-0"><FontAwesomeIcon icon={faSuitcase} /></div>
                                </div>
                                <input id="num-maletas" type="number" className="form-control border-left-0" name="num-maletas" placeholder="Nº de piezas" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="input-group">
                                <button type="submit" className="btn btn-primary text-white">Buscar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>

    );

};

export default FormFindKeeper;
