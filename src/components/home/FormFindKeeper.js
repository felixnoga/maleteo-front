import React, {useContext, useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {GlobalContext} from '../../context/globalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch, faCalendarAlt, faSuitcase} from "@fortawesome/free-solid-svg-icons";
import GooglePlacesAutocomplete, {geocodeByAddress} from "react-google-places-autocomplete";

import "./style.scss";



const FormFindKeeper = () => {
    const history = useHistory();

    const [globalState, setglobalState] = useContext(GlobalContext);



    const style = { width: '100%'};

    const handleFormSubmit = (e) => {
        e.preventDefault();
        history.push('/search');

    };

    const handleAdressSelect = (address) => {
        geocodeByAddress(address.description)
            .then((r)=> {
                const currentLat = r[0].geometry.location.lat();
                const currentLng = r[0].geometry.location.lng();
                setglobalState({...globalState, currentBooking: {...globalState.currentBooking, locationCoordinates: {lat: currentLat, lng: currentLng}, locationAddress: address.description}});
                localStorage.setItem('currentLat', currentLat);
                localStorage.setItem('currentLng', currentLng);
            })
            .catch((e)=> {console.log(e)});
        setglobalState({...globalState, currentSearchAdress: address});

    };

    const handleInputChange = (e) => {
        switch (e.target.id) {
            case('start-date'):
                setglobalState({...globalState, currentBooking: {...globalState.currentBooking, startDate: e.target.value}});
                break;
            case('end-date'):
                setglobalState({...globalState, currentBooking: {...globalState.currentBooking, endDate: e.target.value}});
                break;
            case('num-maletas'):
                setglobalState({...globalState, currentBooking: {...globalState.currentBooking, suitcasesPieces: parseInt(e.target.value)}});
                break;
            default:
                console.log('default');
        }
    };

    const checkIfButtonDisabled = ()=> {
        return (!globalState.currentBooking.startDate || !globalState.currentBooking.endDate || !globalState.currentBooking.suitcasesPieces);

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

                                <GooglePlacesAutocomplete
                                    inputClassName={"form-control border-left-0"}
                                    onSelect={(address) => {handleAdressSelect(address)}}
                                    renderSuggestions={(active, suggestions, onSelectSuggestion) => (
                                        <ul className="list-group" id="suggestion-list">
                                            {
                                                suggestions.map((suggestion, i) => (
                                                    <li
                                                        key={i}
                                                        className="list-group-item suggestion"
                                                        onClick={(event) => onSelectSuggestion(suggestion, event)}
                                                    >
                                                        {suggestion.description}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )}
                                    renderInput={(props) => (
                                        <div className="input-group">
                                            <label htmlFor="keeper-localization"></label>
                                            <div className="input-group-prepend">
                                                <div className="input-group-text text-primary bg-white border-right-0"><FontAwesomeIcon icon={faSearch} /></div>
                                            </div>
                                            <input id="keeper-localization"
                                                   type="text"
                                                   className="form-control border-left-0"
                                                   name="keeper-localization"
                                                   placeholder="Introduce dirección"
                                                   onChange={handleInputChange}
                                                // Custom properties
                                                {...props}
                                            />
                                        </div>
                                    )}
                                />
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-6">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-primary bg-white border-right-0"><FontAwesomeIcon icon={faCalendarAlt} /></div>
                                </div>
                                <input id="start-date"
                                       type="date"
                                       className="form-control border-left-0"
                                       name="start-date"
                                       placeholder="Fecha de entrada"
                                       onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-6 mb-2">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-primary bg-white border-right-0"><FontAwesomeIcon icon={faCalendarAlt} /></div>
                                </div>
                                <input id="end-date"
                                       type="date"
                                       className="form-control border-left-0"
                                       name="end-date"
                                       placeholder="Fecha de salida"
                                       onChange={handleInputChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-primary bg-white border-right-0"><FontAwesomeIcon icon={faSuitcase} /></div>
                                </div>
                                <input
                                    id="num-maletas"
                                    type="number"
                                    className="form-control border-left-0"
                                    name="num-maletas"
                                    placeholder="Nº de piezas"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="input-group">
                                <button type="submit"
                                        className="btn btn-primary text-white"
                                        disabled={checkIfButtonDisabled()}

                                >Buscar</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </div>

    );

};

export default FormFindKeeper;
