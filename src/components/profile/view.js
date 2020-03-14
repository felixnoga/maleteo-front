import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import {getUserBookings} from "../../services/apiService";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEuroSign, faCalendar, faQuestion, faCheck, faTimes, faThumbsUp, faSpinner } from '@fortawesome/free-solid-svg-icons';

import moment from "moment";

import './style.scss';

const calculateDays = (start, end) => {
  const a = moment(start)
  const b = moment(end)
  return b.diff(a, 'days')
};

const calculateTotalPrice = (
  days,
  numBaggages,
  firstDayPrice,
  extraDayPrice
) => {
  if (days === 1) {
    return firstDayPrice * numBaggages
  }
  return firstDayPrice * numBaggages + extraDayPrice * numBaggages * (days - 1)
};

const STATUS_ICONS = {
  Pendiente: faQuestion,
  Aprobada: faThumbsUp,
  Rechazada: faTimes,
  Finalizada: faCheck
}

const ProfileComponent = () => {
  const [cookies, , removeCookie] = useCookies(['token'])
  const [bookingsState, setBookingsState] = useState([])
  const [isAuthenticated, userdetails] = useContext(AuthContext)

  const { token } = cookies

  useEffect(() => {
    const retrieveBookings = async () => {
      const bookings = await getUserBookings(token)
      setBookingsState(bookings)
    }
    if (userdetails !== undefined && userdetails !== null) {
      retrieveBookings()
    }
  }, [userdetails]);


  function handleClick(e) {
    e.preventDefault()
    console.log('The link to become a keeper was clicked.')
    //TODO Implemente call to API update Users as a Keeper
  }

  if (isAuthenticated)
    return (
      <div className="container-fluid profileContainer">
        <div className="row mt-3 text-justify">
          <div className="col-sm-3"></div>
          <div className="col col-sm-3 ml-2 ">
            <h1>{userdetails.name}</h1>
            <p>Puedes ver y editar tu perfil</p>
          </div>
          <div className="col col-sm-3">
            <img
              id="userPicture"
              src={userdetails.profile_img}
              alt={userdetails.name}
            />
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 mt-5 text-left">
            <div className="row ">
              {!userdetails.isKeeper ? (
                <div className="col info">
                  <h3>
                    <Link
                      to="/toguardian"
                      className="profileLink"
                      // onClick={handleClick}
                    >
                      Convierte en guardian
                    </Link>
                    {/* <a href="/toguardian" className="profileLink" onClick={handleClick}>
                      Convierte en guardian
                    </a> */}
                  </h3>
                  <p>Puedes ganar 400€ de media al mes</p>
                </div>
              ) : (
                <div className="col info">
                  <h3>
                    <a href="/sitios" className="profileLink">
                      Administra tus sitios
                    </a>
                  </h3>
                  <p>Da de alta y gestiona tus sitios</p>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col">
                <h3>Tus reservas</h3>

                {bookingsState !== undefined
                  ? bookingsState.map(booking => {
                      return (
                        <div className="card" key={booking._id}>
                          <div className="card-body bg-primary text-white">
                            <h4 className="card-title">
                              {moment(booking.startDate).format('DD MMMM')} al{' '}
                              {moment(booking.endDate).format('DD MMMM')}{' '}
                              <span className="d-inline-block float-right small">
                                <FontAwesomeIcon
                                  icon={STATUS_ICONS[booking.status]}
                                />{' '}
                                {booking.status}
                              </span>
                            </h4>
                            <h5 className="card-subtitle">
                              En "{booking.site.name}" de {booking.keeper.name}{' '}
                              ({booking.site.street}, {booking.site.city})
                            </h5>
                          </div>
                          <div className="card-body">
                            <p className="card-text">
                              <FontAwesomeIcon
                                icon={faCalendar}
                                size={'2x'}
                                className="text-primary"
                              />{' '}
                              {calculateDays(
                                booking.startDate,
                                booking.endDate
                              )}{' '}
                              días.
                            </p>
                            <p>
                              <FontAwesomeIcon
                                icon={faEuroSign}
                                size={'2x'}
                                className="text-primary"
                              />{' '}
                              Tu precio:{' '}
                              {calculateTotalPrice(
                                calculateDays(
                                  booking.startDate,
                                  booking.endDate
                                ),
                                booking.suitcasesPieces,
                                booking.site.firstDayPrice,
                                booking.site.extraDayPrice
                              )}{' '}
                              <FontAwesomeIcon icon={faEuroSign} /> por tus{' '}
                              {booking.suitcasesPieces} maletas.
                            </p>
                          </div>
                        </div>
                      )
                    })
                  : null}
              </div>
            </div>
            <div className="row">
              <div className="col info">
                <h3>Invita a tus amigos</h3>
                <p>Y podrás ganar descuentos para tí</p>
              </div>
            </div>
            <div className="row">
              <div className="col info">
                <h3>Créditos y descuentos</h3>
              </div>
            </div>
            <div className="row">
              <div className="col info">
                <h3>Publica tu anuncio o experiencia</h3>
              </div>
            </div>
            <div className="row">
              <div className="col info">
                <h3>Configuración</h3>
              </div>
            </div>
            <div className="row">
              <div className="col info">
                <h3>Ayuda</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  else
    return (
      <div>
        <h2>  <FontAwesomeIcon icon={faSpinner} /> Pending Autenticacion ..... </h2>

      </div>
    )
}

export default ProfileComponent;
