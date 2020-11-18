import React, { Component } from 'react';

// Componentes
import Nav from '../Nav'
import LateralNav from '../LateralNav'
import Footer from '../../Footer'

// Importo llamada a endpoint
import {UpdateClaimState as UpdateClaimStateAPI} from "../../controller/MainController";

class ClaimsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            claim: this.props.location.state.claim,
            claim_id: this.props.location.state.claim.id,
            claim_state: this.props.location.state.claim.estado,
            property_title: this.props.location.state.property,
            activeView: 'main',
        };
        this.goBack = this.goBack.bind(this);
    }
    
    resolveClaim = async (event) =>{
        event.preventDefault();
        console.log(this.state.claim_state)
        this.setState({activeView: 'loading'});
        let claim_state = "Solucionado"
        // Ejecuto el endopoint para actualizar el estado del reclamo
        let UpdateClaim = await UpdateClaimStateAPI(this.state.claim_id, claim_state);

        if(UpdateClaim.rdo === 0 ) {
            this.setState({activeView: "updated_claim"});
        } else {
            this.setState({activeView: "update_fail"});
        }
    }
    goBack(){
        this.props.history.goBack();
    }
    render() {
        let claim = this.state.claim;
        const activeView = this.state.activeView;
        const dbDate = new Date(claim.fecha_creacion);
        let fecha_creacion = new Intl.DateTimeFormat('en-GB').format(dbDate);
        switch(activeView) { 
        case "loading":
            return (
                <div>
                    <Nav history={this.props.history} />
                    <div>
                        <div className="container-fluid">
                            <div className="row ">
                                <div className="col col-sm-12 col-md-5 col-lg-2 bg-light text-secondary margen-lateralNav border-right">
                                    <LateralNav history={this.props.history}/>
                                </div>
                                <div className="col col-sm-12 col-md-7 col-lg-10 align-self-center text-center">
                                    <div className="spinner-border text-secondary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        case "main":
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
                                                <h4 className="rr22">{this.state.property_title}</h4>
                                                <ul className="navbar-nav">
                                                    <li className="nav-item dropdown">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link"
                                                            onClick={this.goBack}>
                                                            <span className="mr-2">Volver</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <hr/>
                                        <div className="row justify-content-center mb-5">
                                            <div className="col-sm-12 col-md-9 col-lg-9 mt-2">
                                                <div className="card ">
                                                    <div className="card-header">
                                                        
                                                        <nav className="navbar navbar-expand-lg claim-nav">
                                                            <div className="container-fluid">
                                                                { claim.estado==="Solucionado" ? 
                                                                    ( 
                                                                    <span className="font-weight-bold text-secondary">{claim.estado} </span> 
                                                                    ) : (
                                                                    <span className="font-weight-bold text-success">{claim.estado} </span>
                                                                    ) 
                                                                }
                                                            <div>
                                                                <ul className="navbar-nav">
                                                                <li className="nav-item dropdown">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-light dropdown-toggle"
                                                                        data-toggle="dropdown" 
                                                                        aria-haspopup="true" 
                                                                        aria-expanded="false">
                                                                        <span className="mr-2">Acciones</span>
                                                                    </button>
                                                                    <div className="dropdown-menu" aria-labelledby="user_header">
                                                                        { claim.estado==="Solucionado" ? 
                                                                            ( <button 
                                                                                type="button" 
                                                                                className="dropdown-item btn btn-link"
                                                                                disabled>
                                                                                Solucionar
                                                                            </button> 
                                                                            ) : (
                                                                            <button 
                                                                                type="button" 
                                                                                className="dropdown-item btn btn-link"
                                                                                onClick={this.resolveClaim}>
                                                                                Solucionar
                                                                            </button>
                                                                            )
                                                                        }
                                                                        
                                                                        <div className="dropdown-divider"></div>
                                                                        <button 
                                                                            type="button" 
                                                                            className="dropdown-item btn btn-link"
                                                                            disabled>
                                                                            Relacionar
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                                </ul>
                                                            </div>
                                                            </div>
                                                        </nav>
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="rr22 mb-4">{claim.titulo}</h4>
                                                        <div className="card mb-4">
                                                            <div className="card-body">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-sm-12 col-md-2 col-lg-2">
                                                                            <small>Estado</small>
                                                                            <h6>{claim.estado}</h6>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-1 col-lg-1">
                                                                            <div className="vl ml-3"></div>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2">
                                                                            <small>Prioridad</small>
                                                                            <h6>{claim.prioridad}</h6>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-1 col-lg-1">
                                                                            <div className="vl ml-3"></div>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2">
                                                                            <small>Reportado por</small>
                                                                            <h6>{claim.creado_por}</h6>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-1 col-lg-1">
                                                                            <div className="vl ml-3"></div>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-2 col-lg-2">
                                                                            <small>Ocurrencia</small>
                                                                            <h6>{fecha_creacion}</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="container-fluid">
                                                            <div className="row">
                                                                <div className="col-2 text-center">
                                                                    <i className="material-icons claim-ico text-muted">
                                                                        person_pin
                                                                    </i>
                                                                </div>
                                                                <div className="col-10">
                                                                    <div className="card mb-5 alert alert-info">
                                                                        <div className="card-body">
                                                                            <blockquote className="blockquote">
                                                                                <p>{claim.descripcion}</p>
                                                                                <footer className="blockquote-footer">{claim.creado_por}</footer>
                                                                            </blockquote>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <textarea 
                                                                className="form-control" 
                                                                rows="4"
                                                                placeholder="Escriba una respuesta aquí"
                                                                disabled>
                                                            </textarea>
                                                        </div>
                                                        <button 
                                                            type="button" 
                                                            className="btn color-alquilar-btn float-right"
                                                            disabled>
                                                            Responder
                                                        </button>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-light mr-3"
                                                            disabled>
                                                            Adjuntar archivo
                                                        </button>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-light"
                                                            disabled>
                                                            Pegar imagen
                                                        </button>
                                                        {/*<div className="card text-white bg-dark mt-3">
                                                            <div className="card-body">
                                                                <span>Por el momento esta funcionalidad no est&aacute; disponible. Podes solucionar este problema desde Acciones.</span>
                                                            </div>
                                                        </div>*/}
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
        case "updated_claim":
            return(
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
                                                <h4 className="rr22">{claim.titulo}</h4>
                                                <ul className="navbar-nav">
                                                    <li className="nav-item dropdown">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link"
                                                            onClick={this.goBack}>
                                                            <span className="mr-2">Volver</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <hr/>
                                        <div className="row justify-content-center mb-5">
                                            <div className="col-sm-12 col-md-9 col-lg-9 mt-2">
                                                <div className="card">
                                                    <div className="card-body text-center">
                                                            <div className="mt-4"></div>
                                                            <i className="material-icons ico-success size-120">check_circle</i>
                                                            <br/>
                                                            <h2>Listo!</h2>
                                                            <p><span className="font-weight-bold"> {this.state.claimTitle} </span> ya est&aacute; solucionado.</p>
                                                            <small className="text-muted">Lo podes ver
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-link text-reset btn-new-prop pad-left claim-confirm" 
                                                                    onClick={this.goBack}>acá.
                                                                </button>
                                                            </small>
                                                            <div className="mb-5"></div>
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
            )
        case "update_fail":
            return(
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
                                                <h4 className="rr22">{claim.titulo}</h4>
                                                <ul className="navbar-nav">
                                                    <li className="nav-item dropdown">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link"
                                                            onClick={this.goBack}>
                                                            <span className="mr-2">Volver</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <hr/>
                                        <div className="row justify-content-center mb-5">
                                            <div className="col-sm-12 col-md-9 col-lg-9 mt-2">
                                                <div className="card">
                                                    <div className="card-body text-center">
                                                    <div className="mt-4"></div>
                                                        <i className="material-icons ico-error size-120">error</i>
                                                        <br/>
                                                        <h2>Algo salió mal.</h2>
                                                        <p>No se pudo actualizar el reclamo.</p>
                                                        <small className="text-muted">Por favor vuelva a intentarlo.</small>
                                                        <div className="mb-5"></div>
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

export default ClaimsDetail;