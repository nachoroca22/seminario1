import React, { Component } from 'react';

// Componentes
import Nav from '../Nav'
import LateralNav from '../LateralNav'
import Claim from './Claim'
import NewClaim from './NewClaim'
import Footer from '../../Footer'

// Importo llamada a endpoint
import {GetClaimsByPropId as ClaimsAPI} from "../../controller/MainController";

class ClaimsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: this.props.location.state.property,
            propertyId: this.props.location.state.property.prop_id,
            claims: [],
            text_search: '',
            active_view: 'main'
        };
        this.goBack = this.goBack.bind(this);
        this.handleActiveView = this.handleActiveView.bind(this);
    }
    componentDidMount() {
        this.getClaims();
    }
    setTextFilter(event){
        var text_search = event.target.value
        this.setState({
            text_search: text_search,
        })
    }
    getClaims = async () => {
        // Ejecuto el endopoint para traer los reclamos.
        const propertyId = this.state.propertyId
        this.setState({active_view: 'loading'});
        let getClaimsByPropId = await ClaimsAPI(propertyId);
        this.setState({active_view: 'main'});
        if(getClaimsByPropId.rdo === 0) {
            this.setState({
                claims: getClaimsByPropId.data,
            })
        }
    }
    handleActiveView(e) {
        const { name } = e.target;
        this.setState(() => ({
            active_view: name
        }));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }
    goBack(){
        this.props.history.goBack();
    }
    render() {
        const property = this.state.property;
        const activeView = this.state.active_view;
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
                                                <h4 className="rr22">Reclamos en {property.direccion}</h4>
                                                <form className="form-inline">
                                                        <div className="float-right">
                                                            <input 
                                                                className="form-control mr-sm-2" 
                                                                type="search" 
                                                                placeholder="Buscar" 
                                                                aria-label="Search"
                                                                value={this.state.text_search} 
                                                                onChange={(text_search) => this.setTextFilter(text_search)}/>
                                                            <button 
                                                                className="btn btn-outline-success my-2 my-sm-0" type="button">
                                                                    <i 
                                                                        className="material-icons float-right">
                                                                        search
                                                                    </i>
                                                            </button>
                                                        </div>
                                                    </form>
                                            </nav>
                                        </div>
                                        <hr/>
                                        <div className="row justify-content-center">
                                            <div className="col-sm-12 col-md-8 col-lg-8 mt-2">
                                                <button 
                                                    type="button" 
                                                    className="btn color-alquilar-btn float-right"
                                                    name="new_claim"
                                                    onClick={this.handleActiveView}>
                                                        Generar reclamo
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center mb-5">
                                            <div className="col-sm-12 col-md-8 col-lg-8">
                                            
                                                { this.state.claims.length > 0 ? ( 

                                                    /*Mapeo todos los reclamos asociados a la propiedad */

                                                    this.state.claims
                                                    .filter(claim => claim.titulo.toLowerCase().includes(this.state.text_search.toLowerCase()))
                                                    .map(claim => <Claim claim = {claim} key={claim.id} property={property.direccion} history={this.props.history}/>) 

                                                    ) : (

                                                    <div className="text-center mt-5">
                                                        <i className="material-icons ico-no-property text-secondary">sentiment_satisfied_alt</i>
                                                        <br/>
                                                        <br/>
                                                        <span className="text-secondary">No reportaste ningún problema en esta propiedad.</span>
                                                        <br/>
                                                        <small className="text-muted">Puedes informar de un problema desde el botón "Generar reclamo".</small>
                                                    </div>

                                                    ) 
                                                }
                                                <button 
                                                    type="button" 
                                                    className="btn btn-link mt-5"
                                                    onClick={this.goBack}>
                                                        Volver
                                                </button>
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
        case "new_claim":
            return (
                <div>
                    <Nav history={this.props.history} />
                    <div>
                        <div className="container-fluid">
                            <div className="row ">
                                <div className="col col-sm-12 col-md-5 col-lg-2 bg-light text-secondary margen-lateralNav border-right">
                                    <LateralNav history={this.props.history}/>
                                </div>
                                <div className="col">
                                    <div className="container">
                                        <div className="row mt-4">
                                            <nav className="navbar navbar-light w-100">
                                                <h4 className="rr22">{this.state.property.direccion}</h4>
                                                <ul className="navbar-nav">
                                                    <li className="nav-item dropdown">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link"
                                                            name="main"
                                                            onClick={this.getClaims}>
                                                            <span className="mr-2">Volver</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <hr/>
                                        <div className="row mt-3 mb-5 justify-content-center">
                                            <div className="col col-sm-12 col-md-8 col-lg-8 align-self-center ">
                                                <NewClaim name="main" onClick={this.getClaims} property={this.state.property}/>
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

export default ClaimsView;