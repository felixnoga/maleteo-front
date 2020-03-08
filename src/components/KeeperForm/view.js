import React from 'react'

function KeeperForm() {
  return (
    <div className="container-fluid mt-5">
      <form>
        <div className="form-group row ">
          <div className="col-6 col-sm-3 offset-4">
            <h3>Describe tu Espacio </h3>
          </div>
          <div className="col-6 col-sm-3">
            <button className="btn btn-primary text-white">Continuar</button>
          </div>
        </div>
        <div className="form-group offset-4 col-6 col-sm-4">
          <label for="keeperUbication">Ubicación</label>
          <input
            type="text"
            class="form-control bg-white border-right-0 border-left-0 border-top-0"
            id="keeperUbication"
          />
        </div>
        <div className="form-group offset-4 col-6 col-sm-4">
          <label for="keeperPictures">Fotos</label>
          <input
            type="text"
            class="form-control bg-white border-right-0 border-left-0 border-top-0"
            id="keeperPictures"
          />
        </div>
        <div className="form-group offset-4 col-6 col-sm-4">
          <label for="KeeperTitle">Email address</label>
          <input
            type="text"
            class="form-control bg-white border-right-0 border-left-0 border-top-0"
            id="kepperTitle"
          />
        </div>
        <div className="form-group offset-4 col-6 col-sm-4">
          <label for="KeeperAvailability">Email address</label>
          <input
            type="text"
            class="form-control bg-white border-right-0 border-left-0 border-top-0"
            id="KeeperAvailability"
          />
        </div>
        <div className="form-group offset-4 col-6 col-sm-4">
          <label for="KeeperServices">Email address</label>
          <input
            type="text"
            class="form-control bg-white border-right-0 border-left-0 border-top-0"
            id="KeeperServices"
          />
        </div>
      </form>
    </div>
  )
}

export default KeeperForm
