import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import LateralNav from './LateralNav'
import Footer from '../Footer'

// Importo llamada a endpoint
import {DeleteProperty as DeletePropertyAPI} from "../controller/MainController";

class PropertyDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.location.state.property,
            property_id: this.props.location.state.property.prop_id
        };
        this.goBack = this.goBack.bind(this);
    }
    goBack(){
        this.props.history.goBack();
    }
    delete = async (event) =>{
        event.preventDefault();
        let prop_id = this.state.property_id

        let postNewProperty = await DeletePropertyAPI(prop_id);

        if(postNewProperty.rdo === 0 ) {
            this.props.history.goBack();
        }

    }
    render() {
        const description = this.state.description;
        return (
            <div>
                <Nav history={this.props.history} />
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-sm-12 col-md-5 col-lg-2 bg-light text-secondary margen-lateralNav border-right">
                            <LateralNav history={this.props.history}/>
                        </div>
                        <div className="col">
                            <div className="container">
                                <div className="row mt-4">
                                    <nav className="navbar navbar-light w-100">
                                        <h4 className="rr22">Detalle de la propiedad</h4>
                                        <button 
                                                type="button" 
                                                className="btn btn-link mr-3 float-right"
                                                name="paso_2"
                                                onClick={this.goBack}>
                                                    Volver
                                            </button>
                                    </nav>
                                </div>
                                <hr/>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-sm-12 col-md-10 col-lg-10 align-self-center mt-4 mb-5">
                                    <div className="card mb-3">
                                        <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={description.miniatura} className="img-fluid rounded mx-auto d-block card-img-top" alt="Foto" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                            <div className="card-title">
                                                <span className="font-weight-bold lead" >{description.direccion}</span>

                                                <button 
                                                type="button" 
                                                className="btn alquilar-btn-outline float-right mr-2"
                                                onClick={this.delete}>
                                                    <i className="material-icons">delete</i>
                                                </button>
                                                <button 
                                                type="button" 
                                                className="btn alquilar-btn-outline float-right mr-2"
                                                disabled>
                                                    <i className="material-icons">print</i>
                                                </button>
                                                <button 
                                                type="button" 
                                                className="btn alquilar-btn-outline float-right mr-2"
                                                disabled>
                                                    <i className="material-icons">cloud_download</i>
                                                </button>
                                                <button 
                                                type="button" 
                                                className="btn alquilar-btn-outline float-right mr-2"
                                                disabled>
                                                    <i className="material-icons">edit</i>
                                                </button>

                                            </div>
                                            <hr/>
                                            <h6>Datos B&aacute;sicos</h6>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6 col-lg-6"> 
                                                    <ul>
                                                        <li>
                                                            Tipo de unidad: 
                                                            <span className="font-weight-light"> {description.tipo} </span> 
                                                        </li>
                                                        <li>
                                                            Tipo de operaci&oacute;n: 
                                                            <span className="font-weight-light"> {description.operacion} </span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                    <ul>
                                                        <li>
                                                            Precio:
                                                            <span className="font-weight-light"> ${description.precio} </span> 
                                                        </li>
                                                        <li>
                                                            Expensas:
                                                            <span className="font-weight-light"> ${description.expensas} </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <hr/>

                                            <h6>Características generales</h6>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6 col-lg-6"> 
                                                    <ul>
                                                        <li>
                                                            Superficie total: 
                                                            <span className="font-weight-light"> {description.sup_total} </span> 
                                                        </li>
                                                        <li>
                                                            Superficie cubierta: 
                                                            <span className="font-weight-light"> {description.sup_cubierta} </span>
                                                        </li>
                                                        <li>
                                                            Ambientes:
                                                            <span className="font-weight-light"> {description.ambientes} </span> 
                                                        </li>
                                                        <li>
                                                            Baños: 
                                                            <span className="font-weight-light"> {description.baños} </span>
                                                        </li>
                                                        <li>
                                                            Cocheras: 
                                                            <span className="font-weight-light"> {description.cocheras} </span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                    <ul>
                                                        <li>
                                                            Dormitorios: 
                                                            <span className="font-weight-light"> {description.dormitorios} </span> 
                                                        </li>
                                                        <li>
                                                            Toilettes: 
                                                            <span className="font-weight-light"> {description.toilettes} </span>
                                                        </li>
                                                        <li>
                                                            Antigüedad: 
                                                            <span className="font-weight-light"> {description.antiguedad} </span>
                                                        </li>
                                                        <li>
                                                            Estado del inmueble: 
                                                            <span className="font-weight-light"> {description.estado_inmueble} </span>
                                                        </li>
                                                    </ul>

                                                </div>
                                            </div>

                                            <hr/>

                                            <div className="row">
                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                    <h6>Instalaciones</h6>
                                                    <ul>
                                                        {description.instalaciones.map((instalacion) => <li key={instalacion}> {instalacion} </li>)}
                                                    </ul>
                                                </div>

                                                <div className="col-sm-12 col-md-6 col-lg-6">
                                                    <h6>Servicios</h6>
                                                    <ul>
                                                        {description.servicios.map((servicio) => <li key={servicio}> {servicio} </li>)}
                                                    </ul>
                                                </div>
                                            </div>

                                            <hr/>

                                            <p className="card-text text-right"><small className="text-muted">Actualizado el 05-Oct-2020</small></p>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div> 
                    </div>
                    <Footer/>
                </div>
            </div>  
        )
    }
}

export default PropertyDescription;