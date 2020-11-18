import React, { Component } from 'react';

// Importo llamada a endpoint
import {NewContract as NewContractAPI} from "../../controller/MainController";
import {UpdateCurrentContract as UpdateCurrentContractAPI} from "../../controller/MainController";

class FormNewContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: this.props.property,
            activeView: 'paso_1',
            propertyId: this.props.property.prop_id,
            contractCreated: '',
            contrato_vigente: true,

            tenant_lastname: '',
            tenant_name: '',
            tenant_DNI: '',
            tenant_sex: '',
            tenant_phone: '',
            tenant_mail: '',
            tenant_cant_inq: '',

            owner_lastname: '',
            owner_name: '',
            owner_DNI: '',
            owner_sex: '',
            owner_phone: '',
            owner_home: '',

            surety_lastname: '',
            surety_name: '',
            surety_DNI: '',
            surety_sex: '',
            surety_phone: '',
            surety_home: '',
            surety_city: '',
            surety_province: '',

            terms_since: '',
            terms_until: '',
            terms_address: '',
            terms_city: '',
            terms_province: '',
            terms_price: '',
            terms_price_USD: '',
        };

        this.handleActiveView = this.handleActiveView.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);

    }
    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();

        let tenant_lastname = this.state.tenant_lastname
        let tenant_name = this.state.tenant_name
        let tenant_DNI = this.state.tenant_DNI
        let tenant_sex = this.state.tenant_sex
        let tenant_phone = this.state.tenant_phone
        let tenant_cant_inq = this.state.tenant_cant_inq

        if(tenant_cant_inq === '') {
            tenant_cant_inq = 0;
        }

        let owner_lastname = this.state.owner_lastname
        let owner_name = this.state.owner_name
        let owner_DNI = this.state.owner_DNI
        let owner_sex = this.state.owner_sex
        let owner_phone = this.state.owner_phone
        let owner_home = this.state.owner_home

        let surety_lastname = this.state.surety_lastname
        let surety_name = this.state.surety_name
        let surety_DNI = this.state.surety_DNI
        let surety_sex = this.state.surety_sex
        let surety_phone = this.state.surety_phone
        let surety_home = this.state.surety_home
        let surety_city = this.state.surety_city
        let surety_province = this.state.surety_province

        let terms_since = this.state.terms_since
        let terms_until = this.state.terms_until
        let terms_address = this.state.terms_address
        let terms_city = this.state.terms_city
        let terms_province = this.state.terms_province
        let terms_price = this.state.terms_price
        if(terms_price === '') {
            terms_price = 0;
        }
        let terms_price_USD = this.state.terms_price_USD
        if(terms_price_USD === '') {
            terms_price_USD = 0;
        }

        let propertyId = this.state.propertyId

        this.setState({activeView: 'loading'});

        let postNewContractAPI = await NewContractAPI(propertyId,tenant_lastname, tenant_name, tenant_DNI, tenant_sex, tenant_phone, tenant_cant_inq, owner_lastname, owner_name, owner_DNI, owner_sex, owner_phone, owner_home, surety_lastname, surety_name, surety_DNI, surety_sex, surety_phone, surety_home, surety_city, surety_province, terms_since, terms_until, terms_address, terms_city, terms_province, terms_price, terms_price_USD);

        if(postNewContractAPI.rdo === 0 ) {
            let property_id = this.state.propertyId
            let contrato_vigente = this.state.contrato_vigente
            let tenant_mail = this.state.tenant_mail
            let postUpdateCurrentContract = await UpdateCurrentContractAPI(property_id, contrato_vigente, tenant_mail);
            if(postUpdateCurrentContract.rdo === 0 ) {
                this.setState({contractCreated: true});
            } else {
                this.setState({contractCreated: false});
            }
        } else {
            this.setState({contractCreated: false});
        }
        this.setState({activeView: 'paso_5'});
    }
    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
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
            pathname: '/contrato',
            state: {
                property: this.state.property,
            }
        })
    }
    Properties = () => {
        this.props.history.push({
            pathname: '/propietario',
        })
    }
    goBack(){
        this.props.history.goBack();
    }
    render() {
        const property = this.state.property;
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
                                <p className="text-muted mt-3">Generando contrato</p>
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
                                            <h4 className="card-title">Locatario</h4>
                                            <h6 className="card-subtitle mb-2 text-muted">Necesitamos algunos datos del nuevo inquilino.</h6>

                                            <div className="mt-4"></div>
                                            <form>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label>Apellido</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Apellido del locatario"
                                                            autoComplete="off" 
                                                            autoFocus={true} 
                                                            required
                                                            name="tenant_lastname"
                                                            value={this.state.tenant_lastname}
                                                            onChange={this.myChangeHandler}/>
                                                    </div>
                                                    <div className="col">
                                                        <label>Nombre</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Nombre del locatario"
                                                            autoComplete="off" 
                                                            required
                                                            name="tenant_name"
                                                            value={this.state.tenant_name}
                                                            onChange={this.myChangeHandler} />
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label>D.N.I.</label>
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            placeholder="DNI del locatario"
                                                            autoComplete="off" 
                                                            required
                                                            name="tenant_DNI"
                                                            value={this.state.tenant_DNI}
                                                            onChange={this.myChangeHandler} />
                                                        <small>Sin puntos ej: 35434567</small>
                                                    </div>
                                                    <div className="col">
                                                        <label>Sexo</label>
                                                        <select className="form-control"
                                                            required
                                                            name="tenant_sex"
                                                            value={this.state.tenant_sex}
                                                            onChange={this.myChangeHandler}>
                                                            <option defaultValue disabled value="">Seleccione una opci&oacute;n...</option>
                                                            <option value="M">Masculino</option>
                                                            <option value="F">Femenino</option>
                                                        </select>
                                                        <small>Genero del inquilino</small>
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label>Tel&eacute;fono</label>
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            placeholder="Tel&eacute;fono del locatario"
                                                            autoComplete="off" 
                                                            required
                                                            name="tenant_phone"
                                                            value={this.state.tenant_phone}
                                                            onChange={this.myChangeHandler} />
                                                        <small>Sin puntos ej: 114543456</small>
                                                    </div>
                                                    <div className="col">
                                                        <label>Mail</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control"
                                                            placeholder="E-mail del locatario"
                                                            autoComplete="off" 
                                                            required
                                                            name="tenant_mail"
                                                            value={this.state.tenant_mail}
                                                            onChange={this.myChangeHandler} />
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col-6">
                                                        <label>Inquilinos</label>
                                                        <select 
                                                            className="form-control"
                                                            autoComplete="off" 
                                                            required
                                                            name="tenant_cant_inq"
                                                            value={this.state.tenant_cant_inq}
                                                            onChange={this.myChangeHandler} >
                                                            <option defaultValue disabled value="">Seleccione una opci&oacute;n...</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2 o 3</option>
                                                            <option value="3">M&aacute;s de 3</option>
                                                        </select>
                                                        <small>Cantidad de personas que van a ocupar el departamento.</small>
                                                    </div>
                                                </div>

                                                <hr className="mt-5 mb-4"/>

                                                <button 
                                                    type="button" 
                                                    className="btn btn-link mb-4"
                                                    onClick={this.goBack}>
                                                        Cancelar
                                                </button>

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
                                        <h4 className="card-title">Locador</h4>
                                        <h6 className="card-subtitle mb-2 text-muted">Ahora algunos datos del due&ntilde;o.</h6>

                                        <div className="mt-4"></div>
                                        <form>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <label>Apellido</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Apellido del locador" 
                                                        autoFocus={true} 
                                                        required
                                                        name="owner_lastname"
                                                        value={this.state.owner_lastname}
                                                        onChange={this.myChangeHandler} />
                                                </div>
                                                <div className="col">
                                                    <label>Nombre</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Nombre del locador"
                                                        required
                                                        name="owner_name"
                                                        value={this.state.owner_name}
                                                        onChange={this.myChangeHandler}/>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col">
                                                    <label>D.N.I.</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="DNI del locador"
                                                        autoComplete="off" 
                                                        required
                                                        name="owner_DNI"
                                                        value={this.state.owner_DNI}
                                                        onChange={this.myChangeHandler} />
                                                    <small>Sin puntos ej: 35434567</small>
                                                </div>
                                                <div className="col">
                                                    <label>Sexo</label>
                                                    <select 
                                                        className="form-control"
                                                        required
                                                        name="owner_sex"
                                                        value={this.state.owner_sex}
                                                        onChange={this.myChangeHandler} >
                                                        <option defaultValue disabled value="">Seleccione una opci&oacute;n...</option>
                                                        <option value="M">Masculino</option>
                                                        <option value="F">Femenino</option>
                                                    </select>
                                                    <small>Genero del locador</small>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col">
                                                    <label>Tel&eacute;fono</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="Tel&eacute;fono del locatario"
                                                        required
                                                        name="owner_phone"
                                                        value={this.state.owner_phone}
                                                        onChange={this.myChangeHandler} />
                                                    <small>Sin puntos ej: 114543456</small>
                                                </div>
                                                <div className="col">
                                                    <label>Domicilio</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Direcci&oacute;n del locador"
                                                        required
                                                        name="owner_home"
                                                        value={this.state.owner_home}
                                                        onChange={this.myChangeHandler} />
                                                </div>
                                            </div>

                                            <hr className="mt-5 mb-4"/>

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
                                            <h4 className="card-title">Garante</h4>
                                            <h6 className="card-subtitle mb-2 text-muted">La garant&iacute;a es fundamental.</h6>

                                            <div className="mt-4"></div>

                                            <form>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label>Apellido</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Apellido del garante"
                                                            autoFocus={true} 
                                                            required
                                                            name="surety_lastname"
                                                            value={this.state.surety_lastname}
                                                            onChange={this.myChangeHandler} />
                                                    </div>
                                                    <div className="col">
                                                        <label>Nombre</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Nombre del garante"
                                                            required
                                                            name="surety_name"
                                                            value={this.state.surety_name}
                                                            onChange={this.myChangeHandler} />
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label>D.N.I.</label>
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            placeholder="DNI del garante"
                                                            required
                                                            name="surety_DNI"
                                                            value={this.state.surety_DNI}
                                                            onChange={this.myChangeHandler} />
                                                        <small>Sin puntos ej: 35434567</small>
                                                    </div>
                                                    <div className="col">
                                                        <label>Sexo</label>
                                                        <select 
                                                            className="form-control"
                                                            required
                                                            name="surety_sex"
                                                            value={this.state.surety_sex}
                                                            onChange={this.myChangeHandler} >
                                                            <option defaultValue disabled value="">Seleccione una opci&oacute;n...</option>
                                                            <option value="M">Masculino</option>
                                                            <option value="F">Femenino</option>
                                                        </select>
                                                        <small>Genero del garante</small>
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label>Tel&eacute;fono</label>
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            placeholder="Tel&eacute;fono del garante"
                                                            name="surety_phone"
                                                            value={this.state.surety_phone}
                                                            onChange={this.myChangeHandler} />
                                                        <small>Sin puntos ej: 114543456</small>
                                                    </div>
                                                    <div className="col">
                                                        <label>Domicilio</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Direcci&oacute;n del garante"
                                                            name="surety_home"
                                                            value={this.state.surety_home}
                                                            onChange={this.myChangeHandler} />
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label>Ciudad</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Ciudad"
                                                            name="surety_city"
                                                            value={this.state.surety_city}
                                                            onChange={this.myChangeHandler} />
                                                    </div>
                                                    <div className="col">
                                                        <label>Provincia</label>
                                                        <select 
                                                            className="form-control"
                                                            name="surety_province"
                                                            value={this.state.surety_province}
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
                                                </div>

                                                <hr className="mt-5 mb-4"/>

                                                <button 
                                                    type="button" 
                                                    className="btn color-alquilar-btn float-right"
                                                    name="paso_4"
                                                    onClick={this.handleActiveView}>
                                                        Siguiente
                                                </button>

                                                <button 
                                                    type="button" 
                                                    className="btn btn-outline-dark mr-3 float-right"
                                                    name="paso_2"
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
        case "paso_4":
            return(
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <h4 className="card-title">&Uacute;ltimo paso!</h4>
                                        <h6 className="card-subtitle mb-2 text-muted">Condiciones de alquiler.</h6>

                                        <div className="mt-4"></div>

                                        <form>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <label>Plantilla</label>
                                                    <div className="form-group">
                                                        <select 
                                                            className="form-control"
                                                            name=""
                                                            required >
                                                        <option defaultValue disabled value="">Seleccion&aacute; una plantilla de contrato.</option>
                                                        <option value="Propietario">Modelo de Contrato para Alquileres de Vivienda</option>
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col">
                                                    <label>Inicio del contrato</label>
                                                    <input 
                                                        type="date" 
                                                        className="form-control" 
                                                        placeholder="mm/dd/aaaa"
                                                        required
                                                        name="terms_since"
                                                        value={this.state.terms_since}
                                                        onChange={this.myChangeHandler} />
                                                </div>
                                                <div className="col">
                                                    <label>Fin del contrato</label>
                                                    <input 
                                                        type="date" 
                                                        className="form-control" 
                                                        placeholder="mm/dd/aaaa"
                                                        required
                                                        name="terms_until"
                                                        value={this.state.terms_until}
                                                        onChange={this.myChangeHandler} />
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-6">
                                                    <label>Direcci&oacute;n</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Direcci&oacute;n del inmueble"
                                                        required
                                                        name="terms_address"
                                                        value={this.state.terms_address}
                                                        onChange={this.myChangeHandler} />
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col">
                                                    <label>Ciudad</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Ciudad"
                                                        required
                                                        name="terms_city"
                                                        value={this.state.terms_city}
                                                        onChange={this.myChangeHandler} />
                                                </div>
                                                <div className="col">
                                                    <label>Provincia</label>
                                                    <select 
                                                        className="form-control"
                                                        required
                                                        name="terms_province"
                                                        value={this.state.terms_province}
                                                        onChange={this.myChangeHandler} >
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
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col">
                                                    <label>Precio</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="Precio Mensual (ARG)"
                                                        required
                                                        name="terms_price"
                                                        value={this.state.terms_price}
                                                        onChange={this.myChangeHandler} />
                                                        <small>Valor mensual del alquiler en moneda argentina</small>
                                                </div>
                                                <div className="col">
                                                    <label>Precio</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        placeholder="Precio Mensual (USD)"
                                                        required
                                                        name="terms_price_USD"
                                                        value={this.state.terms_price_USD}
                                                        onChange={this.myChangeHandler} />
                                                        <small>Valor mensual del alquiler en moneda Estadounidense</small>
                                                </div>
                                            </div>

                                            <hr className="mt-5 mb-4"/>

                                            <button 
                                                type="button" 
                                                className="btn color-alquilar-btn float-right"
                                                name="paso_5"
                                                onClick={(e) => {
                                                    this.handleSubmit(e);
                                                }}>
                                                    Finalizar
                                            </button>

                                            <button 
                                                type="button" 
                                                className="btn btn-outline-dark mr-3 float-right"
                                                name="paso_3"
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
        case "paso_5":
            return(
                <div>
                    <div className="card">
                        <div className="card-body text-center">

                            { this.state.contractCreated === true ? ( 
                                <div>
                                    <div className="mt-4"></div>
                                    <i className="material-icons ico-success size-120">check_circle</i>
                                    <br/>
                                    <h2>Listo!</h2>
                                    <p><span className="font-weight-bold"> {property.direccion} </span> ya tiene un contrato disponible.</p>
                                    <small className="text-muted">Lo podes ver en 
                                    <button 
                                        type="button" 
                                        className="btn btn-link text-reset btn-new-prop pad-left" 
                                        onClick={this.Properties}>Mis propiedades.
                                    </button>
                                    </small>
                                    <div className="mb-5"></div>
                                </div>
                            ) : (
                                <div>
                                    <div className="mt-4"></div>
                                    <i className="material-icons ico-error size-120">error</i>
                                    <br/>
                                    <h2>Algo salió mal.</h2>
                                    <p>No se pudo crear el contrato para <span className="font-weight-bold">{property.direccion} </span></p>
                                    <small className="text-muted">Por favor vuelva a intentarlo.</small>
                                    <div className="mb-5"></div>
                                </div>
                            ) }

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

export default FormNewContract;