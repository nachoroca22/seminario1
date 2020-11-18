import React, { Component } from 'react';

// Imagen
import Miniatura from "../../assets/img/miniatura.contrato.png"

// Componentes
import Nav from './Nav'
import LateralNav from './LateralNav'
import Footer from '../Footer'

class TemplateAg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <div>
                <Nav history={this.props.history} />
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-5 col-lg-2 bg-light text-secondary margen-lateralNav border-right">
                                <LateralNav history={this.props.history} />
                            </div>
                            <div className="col">
                                <div className="container">
                                    <div className="row mt-4">
                                        <nav className="navbar navbar-light w-100">
                                            <h4 className="rr22">Plantillas de contratos</h4>
                                            <form className="form-inline">
                                                <div className="float-right">
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-primary float-right alquilar-btn-outline"
                                                        disabled>
                                                        <i 
                                                            className="material-icons align-middle mr-1">
                                                            backup
                                                        </i> 
                                                        Cargar plantilla
                                                    </button>
                                                </div>
                                            </form>
                                        </nav>
                                    </div>
                                    <hr/>
                                    <div className="row justify-content-center">

                                        <div className="col-sm-12 col-md-3 col-lg-3 mt-2">
                                            <div className="card">
                                                <img src={Miniatura} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">Modelo de Contrato para Alquileres de Vivienda</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">Instituto de Vivienda de la Ciudad</h6>
                                                    <a target="_blank" rel="noopener noreferrer" href="https://vivienda.buenosaires.gob.ar/inquilinos/modelo-contrato-alquileres-vivienda#top" className="card-link">Recurso</a>
                                                    <br/>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-primary mt-2 alquilar-btn-outline"
                                                        disabled>
                                                            <i 
                                                                className="material-icons align-middle">
                                                                mode_edit
                                                            </i>
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-danger mt-2 ml-1"
                                                        disabled>
                                                            <i 
                                                                className="material-icons align-middle">
                                                                delete_forever
                                                            </i>
                                                    </button>
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
        )
    }
}

export default TemplateAg;