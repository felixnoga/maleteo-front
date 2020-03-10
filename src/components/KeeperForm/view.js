import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import './style.scss'

function KeeperForm() {
  /************** STATES ************/

  const [pictureNames, setPictureNames] = useState([])
  const [keeperProperty, setKeeperProperty] = useState()
  const [keeperSpace, setKeeperSpace] = useState()
  const [show, setShow] = useState(false)

  /**************** MODAL FUNCTIONS **************/

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  /**************** HANDLE FUNCTIONS *****************/

  function handlePictureName(e) {
    const inputFiles = e.target.files

    for (let i = 0; i <= inputFiles.length - 1; i++) {
      let inputPictureName = inputFiles[i].name
      setPictureNames([...pictureNames, inputPictureName])
    }
  }

  function handleKeeperProperty(e) {
    const property = e.target.value
    setKeeperProperty(property)
  }

  function handleKeeperSpace(e) {
    const space = e.target.value
    setKeeperSpace(space)
  }

  function handleAdressSelect() {}

  console.log(keeperSpace, keeperProperty)

  /************* SUBMIT FUNCTION ****************/

  return (
    <div className="container-fluid mt-5">
      <form>
        <div className="form-group row " id="describeSpace">
          <div className="col-6 pl-4 col-sm-4 offset-sm-3">
            <strong>Describe tu Espacio</strong>

            {keeperProperty && keeperSpace ? (
              <div className="mt-3">
                <ul>
                  <li>{keeperProperty}</li>
                  <li>{keeperSpace}</li>
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
              {!keeperProperty && !keeperSpace ? 'Continuar' : 'Modificar'}
            </Button>
          </div>
        </div>

        {/********************* MODAL ********************** */}
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
                  onChange={handleKeeperSpace}
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
                disabled={!keeperProperty || !keeperSpace}
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
            placeholeder="Dirección"
            onSelect={address => {
              handleAdressSelect(address)
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
                accept="image/png, image/jpeg"
                multiple
                onChange={handlePictureName}
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
      </form>
    </div>
  )
}

export default KeeperForm
