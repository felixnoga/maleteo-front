import React, {useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {GlobalContext} from "../../context/globalContext";
import {AuthContext} from "../../context/AuthContext";
import {putNewBooking} from "../../services/apiService";
import {Redirect} from 'react-router-dom';

import './style.scss';

import axios from "axios";

import moment from "moment";
import 'moment/locale/es';

const calculateTotalPrice = (days, numBaggages, firstDayPrice, extraDayPrice)=>{
    if(days===1) {
        return firstDayPrice*numBaggages;
    }
    return firstDayPrice*numBaggages + extraDayPrice*numBaggages*(days-1)
};

const BookingComponent = (props) => {
    const [globalContext, setGlobalContext] = useContext(GlobalContext);
    const [authenticated, user] = useContext(AuthContext);
    const [currentBookingState, setCurrentBookingState] = useState({

    });
    const [bookingSentState, setBookingSentState] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const {token} = cookies;

    useEffect(()=>{
        setCurrentBookingState(globalContext.currentBooking);
    }, []);

    const {selectedSite} = globalContext;

    moment.locale('es');
    const a = moment(currentBookingState.startDate, 'YYYY-MM-DD');
    const b = moment(currentBookingState.endDate, 'YYYY-MM-DD');

    const diaInicio = moment(currentBookingState.startDate).format("DD de MMMM");
    const days = b.diff(a, 'days');
    let totalPrice;
    if(selectedSite!==null && selectedSite!==undefined) {
        totalPrice = calculateTotalPrice(days, currentBookingState.suitcasesPieces, selectedSite.firstDayPrice, selectedSite.extraDayPrice);

    }


    const handleBaggageChange = (e) =>{
      setCurrentBookingState({...currentBookingState, suitcasesPieces: e.target.value});
    };

    const handleBooking = async () => {
        // console.log(currentBookingState.suitcasesPieces);
        const data = {
            startDate: currentBookingState.startDate,
            endDate:  currentBookingState.endDate,
            suitcasesPieces: currentBookingState.suitcasesPieces,
            keeper: selectedSite.owner._id,
            site: selectedSite._id,
            token

        };

        const res = await putNewBooking(data);
        setCurrentBookingState({});

        if(res.status==='ok') {
            setBookingSentState(true);
        }

    };

    if(selectedSite===null || selectedSite===undefined || currentBookingState===undefined) {
        return <div>Cargando....</div>
    }

    if(bookingSentState) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div className="container-fluid pb-4">
            <div className="card mt-2">
                <div className="card-header">
                    Tu selección
                </div>
                <div className="card-body">
                    <h5 className="card-title text-primary text-uppercase">{selectedSite.name}</h5>
                    <p>{selectedSite.description}</p>
                    <p className="text-primary"><strong>IMÁGENES:</strong></p>
                    <p>
                        {selectedSite.space_img.map((img, i)=> {
                            return <img src={img} className="img-thumbnail" width="200px" alt="site" key={i}/>
                        })}
                    </p>

                    <p>Tu reserva desde el {currentBookingState.startDate} hasta el {currentBookingState.endDate}</p>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong className="text-primary">PRECIO 1er DIA:</strong> {selectedSite.firstDayPrice} Euros <strong className="text-primary">A PARTIR DEL SEGUNDO DÍA:</strong> {selectedSite.extraDayPrice} Euros</li>
                        <li className="list-group-item"><strong className="text-primary">FECHAS:</strong> del <strong>{moment(currentBookingState.startDate).format("DD MMMM")}</strong> al <strong>{moment(currentBookingState.endDate).format("DD MMMM")}</strong>. <strong className="text-primary">TOTAL: </strong> {days} días. </li>
                        <li className="list-group-item"><strong className="text-primary">TIPO DE ESPACIO: </strong>{selectedSite.property}, {selectedSite.type} </li>
                        <li className="list-group-item"><strong className="text-primary">PRECIO TOTAL ESTANCIA: </strong>{totalPrice} Euros</li>
                        <li className="list-group-item"><strong className="text-primary">DIRECCIÓN: </strong>{selectedSite.street} {selectedSite.city}, {selectedSite.zip} {selectedSite.state}</li>
                        <li className="list-group-item"><strong className="text-primary">EMAIL-CONTACTO: </strong>{selectedSite.owner.email}</li>

                    </ul>
                    <form>
                        <div className="form-group">
                            <label htmlFor="num_maletas">Número de equipajes:</label>
                            <input type="number" className="form-control" id="num_maletas"
                                   aria-describedby="numeroMaletas"
                                   placeholder="Número equipajes"
                                   value={currentBookingState.suitcasesPieces}
                                   onChange={handleBaggageChange}
                            />
                        </div>
                    </form>
                    <button href="#" className="btn btn-primary" onClick={handleBooking}>Aceptar</button>
                </div>
            </div>
        </div>


    )


};

export default BookingComponent;
