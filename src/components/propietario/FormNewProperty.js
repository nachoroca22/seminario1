import React, { Component } from 'react';

// Componentes
import noImage from '../../assets/img/noImage.jpg'

// Imagenes
import meli from "../../assets/img/meli.jpg"
import zonaprop from "../../assets/img/zonaprop.jpg"
import argenprop from "../../assets/img/argenprop.jpg"
import soloduenos from "../../assets/img/soloduenos.jpg"
import enbuenosaires from "../../assets/img/enbuenosaires.jpg"

// Importo llamada a endpoint
import {NewProperty as NewPropertyAPI} from "../controller/MainController";

class FormNewProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeView: 'paso_1',
            className: 'btn btn-outline-primary',
            icon: 'filter_1',
            fileOne: noImage,
            fileTwo: noImage,
            fileThree: noImage,

            property_owner: localStorage.getItem('email'),

            kind_of_property: '',
            property_type_operation: '',
            property_province: '',
            property_city: '',
            property_address: '',
            property_floor: '',
            property_department: '',

            property_descripcion: 'Departamento en perfecto estado.',
            property_rental_value: '',
            property_expenses_value: '',
            property_environments: '',
            property_bedrooms: '',
            property_bathrooms: '',
            property_garages: '',
            property_toilettes: '',
            property_antiquity: '',
            property_situation: '',
            property_tenant: '',
            property_meters_built: '',
            property_total_built: '',

            services: [
                {id: 0, name: "ABL", isChecked: false},
                {id: 1, name: "Agua corriente", isChecked: false},
                {id: 2, name: "Electricidad", isChecked: false},
                {id: 3, name: "Vigilancia", isChecked: false},
                {id: 4, name: "Gas natural", isChecked: false}
              ],

            installations: [
                {id: 0, name: "Aire acondicionado", isChecked: false},
                {id: 1, name: "Calefacción", isChecked: false},
                {id: 2, name: "Amoblado", isChecked: false},
                {id: 3, name: "Cocina equipada", isChecked: false},
                {id: 4, name: "Lavarropas", isChecked: false},
                {id: 5, name: "Microondas", isChecked: false}
            ],

            miniatura: "https://i.imgur.com/EQkFIgr.jpg",
        };
        this.handleActiveView = this.handleActiveView.bind(this);
        this.handleImageOne = this.handleImageOne.bind(this)
        this.handleImageTwo = this.handleImageTwo.bind(this)
        this.handleImageThree = this.handleImageThree.bind(this)
    }
    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();

        // Ejecuto el endopoint para crear ua nueva propiedad

        let property_owner = this.state.property_owner
        let kind_of_property = this.state.kind_of_property
        let property_type_operation = this.state.property_type_operation
        let property_province = this.state.property_province
        let property_city = this.state.property_city
        let property_address = this.state.property_address
        let property_floor = this.state.property_floor
        if(property_floor === ''){
            property_floor = 0
        }
        let property_department = this.state.property_department
        let property_descripcion = this.state.property_descripcion
        let property_rental_value = this.state.property_rental_value
        if(property_rental_value === ''){
            property_rental_value = 0
        }
        let property_expenses_value = this.state.property_expenses_value
        if(property_expenses_value === ''){
            property_expenses_value = 0
        }
        let property_environments = this.state.property_environments
        if(property_environments === ''){
            property_environments = 0
        }
        let property_bedrooms = this.state.property_bedrooms
        if(property_bedrooms === ''){
            property_bedrooms = 0
        }
        let property_bathrooms = this.state.property_bathrooms
        if(property_bathrooms === ''){
            property_bathrooms = 0
        }
        let property_garages = this.state.property_garages
        if(property_garages === ''){
            property_garages = 0
        }
        let property_toilettes = this.state.property_toilettes
        if(property_toilettes === ''){
            property_toilettes = 0
        }
        let property_antiquity = this.state.property_antiquity
        let property_situation = this.state.property_situation
        if(property_situation === ''){
            property_situation = "Desocupado"
        }
        let property_tenant = this.state.property_tenant
        let property_meters_built = this.state.property_meters_built
        let property_total_built = this.state.property_total_built

        var arrServices = []
        this.state.services.forEach(service => {
            if (service.isChecked) {
                arrServices.push(service.name)
            }
        })

        var arrInstallations = []
        this.state.installations.forEach(installation => {
            if (installation.isChecked) {
                arrInstallations.push(installation.name)
            }
        })

        this.setState({activeView: "loading"});

        let postNewProperty = await NewPropertyAPI(property_owner, kind_of_property, property_type_operation, property_province, property_city, property_address, property_floor, property_department, property_descripcion, property_rental_value, property_expenses_value, property_environments, property_bedrooms, property_bathrooms, property_garages, property_toilettes, property_antiquity, property_situation, property_tenant, property_meters_built, property_total_built, arrServices, arrInstallations);

        if(postNewProperty.rdo === 0 ) {
            this.setState({activeView: "paso_4"});
        } else {
            this.setState({activeView: "paso_5"});
        }

        
    }
    handleImageOne(event) {
        this.setState({
            fileOne: window.URL.createObjectURL(
                new Blob([event.target.files[0]], {
                type: "image/png",
                })
            )
        })
    }
    handleImageTwo(event) {
        this.setState({
            fileTwo: window.URL.createObjectURL(
                new Blob([event.target.files[0]], {
                type: "image/png",
                })
            )
        })
    }
    handleImageThree(event) {
        this.setState({
            fileThree: window.URL.createObjectURL(
                new Blob([event.target.files[0]], {
                type: "image/png",
                })
            )
        })
    }
    handleActiveView(e) {
        const { name } = e.target;
        this.setState(() => ({
            activeView: name
        }));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }
    Properties = () => {
        this.props.history.push({
            pathname: '/propietario',
        })
    }
    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    myChangeHandlerServices = (event) => {
        let nam = event.target.name;
        let services = this.state.services
        services.forEach(service => {
           if (service.name === nam) {
                service.isChecked = event.target.checked
           }
        })
        this.setState({[services]: services});
    }
    myChangeHandlerInstallations = (event) => {
        let nam = event.target.name;
        let installations = this.state.installations
        installations.forEach(installation => {
           if (installation.name === nam) {
                installation.isChecked = event.target.checked
           }
        })
        this.setState({[installations]: installations});
    }
    render() {
        switch(this.state.activeView) {
            case "loading": 
            return (
                <div>
                    <div className="card">
                        <div className="card-body mt-5 mb-5">
                            <div className="container text-center">
                                <div className="spinner-border text-secondary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <br/>
                                <p className="text-muted mt-3">Generando propiedad</p>
                            </div>    
                        </div>
                    </div>
                </div>
            )
            case "paso_1":
                return (
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <h4 className="card-title">Hola!</h4>
                                            <h6 className="card-subtitle mb-2 text-muted">Empecemos por lo básico...</h6>

                                            <div className="mt-4"></div>
                                            <form>
                                                <h6>Propiedad</h6>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <label>Tipo de propiedad</label>
                                                        <select className="form-control"
                                                                name="kind_of_property"
                                                                required
                                                                value={this.state.kind_of_property}
                                                                onChange={this.myChangeHandler}>
                                                            <option defaultValue disabled value="">Seleccione una opci&oacute;n...</option>
                                                            <option value="Departamento">Departamento</option>
                                                            <option value="Casa" disabled>Casa</option>
                                                            <option value="PH" disabled>PH</option>
                                                            <option value="Local" disabled>Local Comercial</option>
                                                            <option value="Oficina" disabled>Oficina</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-6">
                                                        <label>Tipo de operación</label>
                                                        <select className="form-control"
                                                                name="property_type_operation"
                                                                required
                                                                value={this.state.property_type_operation}
                                                                onChange={this.myChangeHandler}>
                                                            <option defaultValue disabled value="">Seleccione una opci&oacute;n...</option>
                                                            <option value="Alquiler">Alquiler</option>
                                                            <option value="Venta" disabled>Venta</option>
                                                            <option value="AlquilerTemp" disabled>Alquiler Temporal</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <h6>Ubicaci&oacute;n</h6>
                                                <div className="row mt-2">
                                                    <div className="col">
                                                        <label>Provincia</label>
                                                        <select 
                                                            className="form-control"
                                                            name="property_province"
                                                            value={this.state.property_province}
                                                            onChange={this.myChangeHandler}>
                                                            <option defaultValue disabled value="">Seleccione una opci&oacute;n...</option>
                                                            <option value="Buenos Aires">Buenos Aires</option>
                                                            <option value="Catamarca">Catamarca</option>
                                                            <option value="Chaco">Chaco</option>
                                                            <option value="Chubut">Chubut</option>
                                                            <option value="Córdoba">C&oacute;rdoba</option>
                                                            <option value="Corrientes">Corrientes</option>
                                                            <option value="Entre Ríos">Entre R&iacute;os</option>
                                                            <option value="Formosa">Formosa</option>
                                                            <option value="Jujuy">Jujuy</option>
                                                            <option value="La Pampa">La Pampa</option>
                                                            <option value="La Rioja">La Rioja</option>
                                                            <option value="Mendoza">Mendoza</option>
                                                            <option value="Misiones">Misiones</option>
                                                            <option value="Neuquén">Neuqu&eacute;n</option>
                                                            <option value="Río Negro">R&iacute;o Negro</option>
                                                            <option value="Salta">Salta</option>
                                                            <option value="San Juan">San Juan</option>
                                                            <option value="San Luis">San Luis</option>
                                                            <option value="Santa Cruz">Santa Cruz</option>
                                                            <option value="Santa Fe">Santa Fe</option>
                                                            <option value="Santiago del Estero">Santiago del Estero</option>
                                                            <option value="Tierra del Fuego">Tierra del Fuego</option>
                                                            <option value="Tucumám">Tucum&aacute;n</option>
                                                        </select>
                                                    </div>
                                                    <div className="col">
                                                        <label>Ciudad</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Ciudad"
                                                            name="property_city"
                                                            value={this.state.property_city}
                                                            onChange={this.myChangeHandler}/>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col">
                                                        <label>Dirección</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Dirección"
                                                            name="property_address"
                                                            value={this.state.property_address}
                                                            onChange={this.myChangeHandler}/>
                                                    </div>
                                                    <div className="col">
                                                        <label>Piso</label>
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            placeholder="Piso"
                                                            name="property_floor"
                                                            value={this.state.property_floor}
                                                            onChange={this.myChangeHandler}/>
                                                    </div>
                                                </div>

                                                <div className="row mt-2">
                                                    <div className="col-6">
                                                        <label>Departamento</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Departamento"
                                                            name="property_department"
                                                            value={this.state.property_department}
                                                            onChange={this.myChangeHandler} />
                                                    </div>
                                                </div>

                                                <hr/>

                                                <button 
                                                    type="button" 
                                                    className="btn color-alquilar-btn float-right"
                                                    name="paso_2"
                                                    value="paso_2"
                                                    onClick={this.handleActiveView}>
                                                        Siguiente
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            
        case "paso_2":
            return(
                <div>    
                    <div className="card">
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <h4 className="card-title">Cu&eacute;ntanos un poco de tu propiedad</h4>

                                        <div className="mt-4"></div>
                                        <form>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>Breve descripci&oacute;n:</label>
                                                        <textarea 
                                                            className="form-control" 
                                                            rows="2"
                                                            placeholder={this.state.property_descripcion}
                                                            name="property_descripcion"
                                                            value={this.state.property_descripcion}
                                                            onChange={this.myChangeHandler}>
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                            <h6>Hablemos de n&uacute;meros</h6>
                                            <div className="row mt-2">
                                                <div className="col">
                                                <label>Precio</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="$ ARG"
                                                        name="property_rental_value"
                                                        value={this.state.property_rental_value}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                                <div className="col">
                                                    <label>Expensas</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="$ ARG"
                                                        name="property_expenses_value"
                                                        value={this.state.property_expenses_value}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                            </div>

                                            <hr/>
                                            
                                            <h6>Espacios</h6>
                                            <div className="row mt-2">
                                                <div className="col">
                                                    <label>Ambientes</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="0"
                                                        name="property_environments"
                                                        value={this.state.property_environments}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                                <div className="col">
                                                    <label>Dormitorios</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="0"
                                                        name="property_bedrooms"
                                                        value={this.state.property_bedrooms}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                                <div className="col">
                                                    <label>Baños</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="0"
                                                        name="property_bathrooms"
                                                        value={this.state.property_bathrooms}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col">
                                                    <label>Cocheras</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="0"
                                                        name="property_garages"
                                                        value={this.state.property_garages}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                                <div className="col">
                                                    <label>Toilettes</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="0"
                                                        name="property_toilettes"
                                                        value={this.state.property_toilettes}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                                <div className="col"></div>
                                            </div>

                                            <hr/>

                                            <h6>Situación actual</h6>
                                            <div className="row mt-2">
                                                <div className="col-4">
                                                <label>Antigüedad</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="A estrenar / 2 años"
                                                        name="property_antiquity"
                                                        value={this.state.property_antiquity}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                                <div className="col-4">
                                                <label>Estado</label>
                                                    <select className="form-control"
                                                            name="property_situation"
                                                            required
                                                            value={this.state.property_situation}
                                                            onChange={this.myChangeHandler}>
                                                        <option defaultValue disabled value="">Seleccione</option>
                                                        <option value="Alquilado">Alquilado</option>
                                                        <option value="Desocupado">Desocupado</option>
                                                        <option value="Publicado" disabled>Publicado</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-8">
                                                <label>Mail inquilino </label>
                                                <small className="text-muted">&nbsp; &nbsp; &nbsp;*En caso de que la propiedad esté alquilada.</small>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Inquilino"
                                                        name="property_tenant"
                                                        value={this.state.property_tenant}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                            </div>

                                            <hr/>

                                            <h6>Superficie</h6>
                                            <div className="row mt-2">
                                                <div className="col">
                                                    <label>Construidos</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="0 m2"
                                                        name="property_meters_built"
                                                        value={this.state.property_meters_built}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                                <div className="col">
                                                    <label>Totales</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="0 m2"
                                                        name="property_total_built"
                                                        value={this.state.property_total_built}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                            </div>

                                            <hr/>

                                            <div className="row mt-3">
                                                <div className="col-2">
                                                    <h6>Servicios</h6>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-check">
                                                    { this.state.services.map(service =>{
                                                            return( 
                                                                <div key={service.id}>
                                                                    <input 
                                                                        className="form-check-input" 
                                                                        type="checkbox" 
                                                                        name={service.name}
                                                                        value={service.name}
                                                                        checked={service.isChecked}
                                                                        onChange={this.myChangeHandlerServices}/>
                                                                        {service.name}
                                                                </div>
                                                            ) } ) }
                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    <h6>Instalaciones</h6>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-check">
                                                    { this.state.installations.map(installation =>{
                                                            return( 
                                                                <div key={installation.id}>
                                                                    <input 
                                                                        className="form-check-input" 
                                                                        type="checkbox" 
                                                                        name={installation.name}
                                                                        value={installation.name}
                                                                        checked={installation.isChecked}
                                                                        onChange={this.myChangeHandlerInstallations}/>
                                                                        {installation.name}
                                                                </div>
                                                            ) } ) }
                                                    </div>
                                                </div>
                                            </div>

                                            <hr/>

                                            <button 
                                                type="button" 
                                                className="btn color-alquilar-btn float-right"
                                                name="paso_3"
                                                onClick={this.handleActiveView}>
                                                    Siguiente
                                            </button>

                                            <button 
                                                type="button" 
                                                className="btn btn-outline-dark mr-3 float-right"
                                                name="paso_1"
                                                onClick={this.handleActiveView}>
                                                    Volver
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            
        case "paso_3":
                return(
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <h4 className="card-title">&Uacute;ltimo paso!</h4>
                                            <h6 className="card-subtitle mb-2 text-muted">Tu propiedad casi est&aacute; lista.</h6>

                                            <hr className="mt-4 mb-4"/>

                                            <h6>Multimedia</h6>
                                            <h6 className="mb-3">
                                                Fotos <i className="material-icons align-middle">image</i>&nbsp; 
                                                <span className="text-muted">
                                                - &nbsp;Videos <i className="material-icons align-middle">video_library</i>&nbsp;
                                                - &nbsp;Recorrido 360 <i className="material-icons align-middle">360</i>
                                                </span>
                                            </h6>
                                            <div className="row">
                                                <div className="col-3">
                                                    <div>
                                                        <div className="custom-file">
                                                            <input 
                                                                type="file" 
                                                                className="custom-file-input" 
                                                                id="customFile"
                                                                onChange={this.handleImageOne} />
                                                            <label data-browse="Elegir" className="custom-file-label"><span className="material-icons">arrow_circle_up</span></label>
                                                        </div>
                                                        <img alt="" className="img-thumbnail mt-2 img-uploadFile" src={this.state.fileOne}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div>
                                                        <div className="custom-file">
                                                            <input 
                                                                type="file" 
                                                                className="custom-file-input" 
                                                                id="customFile"
                                                                onChange={this.handleImageTwo}
                                                                disabled />
                                                            <label data-browse="Elegir" className="custom-file-label"><span className="material-icons">arrow_circle_up</span></label>
                                                        </div>
                                                        <img alt="" className="img-thumbnail mt-2 img-uploadFile" src={this.state.fileTwo}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div>
                                                        <div className="custom-file">
                                                            <input 
                                                                type="file" 
                                                                className="custom-file-input" 
                                                                id="customFile"
                                                                onChange={this.handleImageThree}
                                                                disabled />
                                                            <label data-browse="Elegir" className="custom-file-label"><span className="material-icons">arrow_circle_up</span></label>
                                                        </div>
                                                        <img alt="" className="img-thumbnail mt-2 img-uploadFile" src={this.state.fileThree}/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <span className="material-icons newProp-ico">
                                                        add_circle_outline
                                                    </span>
                                                </div>
                                            </div>

                                            <hr className="mt-4 mb-4"/>

                                            <h6>Publicaci&oacute;n</h6>
                                            <h6 className="card-subtitle mb-2 text-muted">Donde quieres que publiquemos tu propiedad?</h6>
                                            <small className="text-muted">Puedes omitir este paso y hacerlo m&aacute;s tarde desde <span className="font-italic">Mis Publicaciones.</span></small>
                                            <div className="row mt-2">
                                                <div className="col-12">
                                                    <div className="form-check form-check-inline">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            name="exampleRadios" 
                                                            id="exampleRadios1" 
                                                            value="option1" 
                                                            disabled/>
                                                        <img 
                                                            src={meli} 
                                                            alt="Mercadolibre" 
                                                            className="img-thumbnail contenedor-img" />
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            name="exampleRadios" 
                                                            id="exampleRadios2" 
                                                            value="option2" 
                                                            disabled/>
                                                        <img 
                                                            src={zonaprop}
                                                            alt="zonaprop" 
                                                            className="img-thumbnail contenedor-img" />
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            name="exampleRadios" 
                                                            id="exampleRadios3" 
                                                            value="option3" 
                                                            disabled/>
                                                        <img 
                                                            src={argenprop} 
                                                            alt="argenprop" 
                                                            className="img-thumbnail contenedor-img" />
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            name="exampleRadios" 
                                                            id="exampleRadios4" 
                                                            value="option4" 
                                                            disabled/>
                                                        <img 
                                                            src={soloduenos}
                                                            alt="soloduenos" 
                                                            className="img-thumbnail contenedor-img" />
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            name="exampleRadios" 
                                                            id="exampleRadios5" 
                                                            value="option5" 
                                                            disabled/>
                                                        <img 
                                                            src={enbuenosaires}
                                                            alt="enbuenosaires" 
                                                            className="img-thumbnail contenedor-img" />
                                                    </div>
                                                    <div className="card text-white bg-dark mt-3 mb-2">
                                                        <div className="card-body">
                                                            <span>Por el momento esta funcionalidad no est&aacute; disponible. Muy pronto podr&aacute;s publicar tus propiedades en sitios como MercadoLibre, ZonaProp y muchos m&aacute;s.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <hr/>

                                            <button 
                                                type="button" 
                                                className="btn color-alquilar-btn float-right"
                                                name="paso_4"
                                                onClick={(E) => {
                                                    this.handleActiveView(E); 
                                                    this.handleSubmit(E);}}>
                                                    Finalizar
                                            </button>

                                            <button 
                                                type="button" 
                                                className="btn btn-outline-dark mr-3 float-right"
                                                name="paso_2"
                                                onClick={this.handleActiveView}>
                                                    Volver
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        case "paso_4":
            return(
                <div>
                    <div className="card">
                        <div className="card-body text-center">
                                <div className="mt-4"></div>
                                <i className="material-icons ico-success size-120">check_circle</i>
                                <br/>
                                <h2>Listo!</h2>
                                <p><span className="font-weight-bold"> {this.state.property_address} </span> ya est&aacute; disponible.</p>
                                <small className="text-muted">La podes ver en
                                    <button 
                                        type="button" 
                                        className="btn btn-link text-reset btn-new-prop pad-left" 
                                        onClick={this.Properties}>Mis propiedades.
                                    </button>
                                </small>
                                <div className="mb-5"></div>
                        </div>
                    </div>
                </div>
            )
        
        case "paso_5":
            return(
                <div>
                    <div className="card">
                        <div className="card-body text-center">
                        <div className="mt-4"></div>
                            <i className="material-icons ico-error size-120">error</i>
                            <br/>
                            <h2>Algo salió mal.</h2>
                            <p>No se pudo crear la propiedad <span className="font-weight-bold">{this.state.property_address} </span></p>
                            <small className="text-muted">Por favor vuelva a intentarlo.</small>
                            <div className="mb-5"></div>
                        </div>
                    </div>
                </div>
            )

        default:
            return(
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">P&aacute;gina no encontrada</h4>
                                <h6 className="card-subtitle mb-2 text-muted">Te pedimos disculpas por las molestias ocasionadas.</h6>
                            </div>
                        </div>
                    </div>
                )
            
        }
    }
}

export default FormNewProperty;