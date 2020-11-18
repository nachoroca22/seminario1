import React, { Component } from 'react';

// Componentes
import Nav from '../Nav'
import LateralNav from '../LateralNav'
import Claim from '../claims/Claim'
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
            loading: false,
        };
        this.goBack = this.goBack.bind(this);
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
        this.setState({loading: true});
        let getClaimsByPropId = await ClaimsAPI(propertyId);
        this.setState({loading: false});
        if(getClaimsByPropId.rdo === 0) {
            this.setState({
                claims: getClaimsByPropId.data,
            })
        }
    }
    goBack(){
        this.props.history.goBack();
    }
    render() {
        if(this.state.loading){
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
            );
        } else {
            let property = this.state.property;
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
                                        <div className="row justify-content-center mb-5">
                                            <div className="col-sm-12 col-md-8 col-lg-8 mt-2">
                                            
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
                                                        <span className="text-secondary">Inquilinos contentos, no hay reclamos en esta propiedad.</span>
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
        }
    }
}

export default ClaimsView;