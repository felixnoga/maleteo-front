import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import GooglePlacesAutocomplete, {
  geocodeByAddress
} from 'react-google-places-autocomplete'

import './style.scss'

function KeeperForm() {
  /************** STATES ************/

  const [pictureNames, setPictureNames] = useState([]) //this state is jusf for render the picture names in Front app
  // const [inputPictures, setInputPictures] = useState([])

  //state to send to Back app
  const [keeperData, setKeeperData] = useState({
    location: { coordinates: [] },
    property: '',
    type: '',
    space_img: [],
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  })

  const [show, setShow] = useState(false)

  /**************** MODAL FUNCTIONS **************/

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  /**************** HANDLE FUNCTIONS *****************/

  function handlePicturesName(e) {
    const inputFiles = e.target.files

    for (let i = 0; i <= inputFiles.length - 1; i++) {
      let inputPictureName = inputFiles[i].name
      setPictureNames(prevState => [...prevState, inputPictureName])
    }
  }

  function handleKeeperProperty(e) {
    const property = e.target.value
    setKeeperData({ ...keeperData, property })
  }

  function handleKeeperType(e) {
    const type = e.target.value
    setKeeperData({ ...keeperData, type })
  }

  function handleTitle(e) {
    const inputTitle = e.target.value
    const title = inputTitle.trim()

    setKeeperData({ ...keeperData, name: title })
  }

  /***************** GOOGLEPLACESAUTOCOMPLETE HANDLE FUNCTION *****************/

  /**
   *geocodeByAddress Function
   * @param {String} address
   * @return {Promise}
   */

  function handleAdressSelected(address) {
    const arrLatLng = []
    let addressStreet = ''
    let addressNumber = ''

    geocodeByAddress(address.description)
      .then(result => {
        const locationLatLng = result[0].geometry.location
        const addressComponents = result[0].address_components

        const currentLat = locationLatLng.lat()
        const currentLng = locationLatLng.lng()
        arrLatLng.push(currentLat, currentLng)

        addressStreet = addressComponents[1].long_name
        addressNumber = addressComponents[0].long_name
        const street = addressStreet.concat(` ${addressNumber}`)

        const town = addressComponents[2].long_name
        const city = addressComponents[3].long_name
        const state = addressComponents[4].long_name
        const country = addressComponents[5].long_name
        const zip = addressComponents[6].long_name

        if (town === city) {
          setKeeperData({
            ...keeperData,
            location: { coordinates: arrLatLng },
            street,
            city,
            state,
            country,
            zip
          })
        } else {
          const fullCity = town.concat(`, ${city}`)
          setKeeperData({
            ...keeperData,
            location: { coordinates: arrLatLng },
            street,
            city: fullCity,
            state,
            country,
            zip
          })
        }
      })

      .catch(error => console.log(error))
  }

  /************* SUBMIT FUNCTION ****************/

  async function submitData(e) {
    e.preventDefault()
    const { elements } = e.target
    const formKeeperData = new FormData()

    formKeeperData.append('location', keeperData.location)
    formKeeperData.append('property', keeperData.property)
    formKeeperData.append('type', keeperData.type)
    formKeeperData.append('name', keeperData.name)
    formKeeperData.append('street', keeperData.street)
    formKeeperData.append('city', keeperData.city)
    formKeeperData.append('state', keeperData.state)
    formKeeperData.append('country', keeperData.country)
    formKeeperData.append('zip', keeperData.zip)

    for (const inputField of elements) {
      if (inputField.type === 'file') {
        for (const fileIndex in inputField.files) {
          formKeeperData.append(inputField.name, inputField.files[fileIndex])
        }
      }
    }

    fetch('http://localhost:8000/file/upload', {
      method: 'POST',
      body: formKeeperData
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error uploading file')
        }

        return res.json()
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  return (
    <div className="container-fluid mt-5">
      <form onSubmit={submitData}>
        <div className="form-group row " id="describeSpace">
          <div className="col-6 pl-4 col-sm-4 offset-sm-3">
            <strong>Describe tu Espacio</strong>

            {keeperData.property && keeperData.type ? (
              <div className="mt-3" id="picturesNames">
                <ul>
                  <li>{keeperData.property}</li>
                  <li>{keeperData.type}</li>
                </ul>
              </div>
            ) : null}
          </div>

          <div className="col-3 ml-5 col-sm-3">
            <Button
              variant="primary"
              className="text-white"
              onClick={handleShow}
            >
              {!keeperData.property && !keeperData.type
                ? 'Continuar'
                : 'Modificar'}
            </Button>
          </div>
        </div>

        {/********************* MODAL ************************/}
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton id="modalHeader">
              <Modal.Title>Descríbenos tu espacio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="keeperProperty">Especifica tu propiedad</label>
                <select
                  className="custom-select"
                  id="keeperProperty"
                  onChange={handleKeeperProperty}
                  value={keeperData.property}
                >
                  <option defaultValue="Selecciona una opcion">
                    Selecciona una opcion
                  </option>
                  <option value="Casa">Casa</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Establecimiento">Establecimiento</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="keeperSpace">Especifica tu propiedad</label>
                <select
                  className="custom-select"
                  id="keeperSpace"
                  onChange={handleKeeperType}
                  value={keeperData.type}
                >
                  <option defaultValue="Selecciona una opcion">
                    Selecciona una opción
                  </option>
                  <option value="Habitación">Habitación</option>
                  <option value="Hall">Hall</option>
                  <option value="Trastero">Trastero</option>
                  <option value="Buhardilla">Buhardilla</option>
                  <option value="Garaje">Garaje</option>
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={handleClose}
                className="text-white"
                disabled={!keeperData.property || !keeperData.type}
              >
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        {/******************** END OF MODAL *********************/}

        {/******************* UBICATION INPUT **************/}

        <div className="form-group col-12 offset-sm-3 col-sm-6 ">
          <p>Ubicación</p>
          <GooglePlacesAutocomplete
            inputClassName={
              'form-control border-right-0 border-left-0 border-top-0'
            }
            placeholder="Dirección"
            onSelect={address => {
              handleAdressSelected(address)
            }}
            renderSuggestions={(active, suggestions, onSelectSuggestion) => (
              <ul className="list-group mt-4" id="suggestion-list">
                {suggestions.map((suggestion, i) => (
                  <li
                    key={i}
                    className="list-group-item suggestion"
                    onClick={event => onSelectSuggestion(suggestion, event)}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          />
        </div>

        {/*************** PICTURES INPUT *************/}

        <div className="form-group col-12 offset-sm-3 col-sm-6 ">
          <p>Fotos</p>
          <div className="form-group row">
            <div className="col-4">
              <input
                type="file"
                id="keeperPictures"
                accept="image/png, image/jpeg, 'image/jpg'"
                multiple
                onChange={handlePicturesName}
                // value={pictureNames}
              />
              <label htmlFor="keeperPictures" id="pictureLabel">
                <p>
                  <span className="badge badge-primary text-white p-2">
                    Seleccionar
                  </span>
                </p>
              </label>
            </div>
            <div className="col-3">
              {pictureNames.length ? (
                <span>
                  {pictureNames.map((name, i) => {
                    return (
                      <div key={i}>
                        <h6>
                          <span className="badge badge-primary text-white">
                            {name}
                          </span>
                        </h6>
                      </div>
                    )
                  })}
                </span>
              ) : null}
            </div>
          </div>
          <hr />
        </div>

        {/**************** TITLE INPUT ******************/}

        <div className="form-group col-12 offset-sm-3 col-sm-6">
          <label htmlFor="KeeperTitle">Título</label>
          <input
            type="text"
            className="form-control bg-white border-right-0 border-left-0 border-top-0"
            id="kepperTitle"
            onChange={handleTitle}
            // value={keeperData.name}
          />
        </div>

        {/*************** AVAILABILITY AND SERVICES INPUTS ***************/}

        <div className="form-group col-12 offset-sm-3 col-sm-6">
          <label htmlFor="KeeperAvailability">Disponibilidad y horarios</label>
          <input
            type="text"
            className="form-control bg-white border-right-0 border-left-0 border-top-0"
            id="KeeperAvailability"
          />
        </div>
        <div className="form-group col-12 offset-sm-3 col-sm-6">
          <label htmlFor="KeeperServices">Servicios</label>
          <input
            type="text"
            className="form-control bg-white border-right-0 border-left-0 border-top-0"
            id="KeeperServices"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary text-white"
          id="submitKeeperData"
          onClick
          disabled={
            !keeperData.location ||
            !keeperData.property ||
            !keeperData.type ||
            !keeperData.name
          }
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default KeeperForm
