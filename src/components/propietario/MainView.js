import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import LateralNav from './LateralNav'
import Property from './Property'
import Footer from '../Footer'

// Importo llamada a endpoint
import {GetPropertyByOwnerId as PropertiesAPI} from "../controller/MainController";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: [],
            text_search: '',
            loading: false,
        };
        
    }
    componentDidMount() {
        this.getProperty();
    }
    setTextFilter(event){
        var text_search = event.target.value
        this.setState({
            text_search: text_search,
        })
    }
    getProperty = async () => {
        // Ejecuto el endopoint para validar login
        const userMail = localStorage.getItem('email') 
        this.setState({loading: true});
        let getPropertyFromAPI = await PropertiesAPI(userMail);
        this.setState({loading: false});
        if(getPropertyFromAPI.rdo === 0) {
            this.setState({
                properties: getPropertyFromAPI.data,
            })
        }
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
                                                <h4 className="rr22">Propiedades</h4>
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
                                        <div className="row align-items-center justify-content-center mb-5">
                                            <div className="col-sm-12 col-md-10 col-lg-10 align-self-center">

                                            { this.state.properties.length > 0 ? ( 

                                                /*Mapeo todas las propiedades existentes en el .json */

                                                this.state.properties
                                                .filter(property => property.direccion.toLowerCase().includes(this.state.text_search.toLowerCase()))
                                                .map(property => <Property property = {property} key={property.prop_id} history={this.props.history}/>) 

                                                ) : (

                                                <div className="text-center mt-5">
                                                    <i className="material-icons ico-no-property text-secondary">list</i>
                                                    <br/>
                                                    <span className="text-secondary">Aun no tienes propiedades cargadas, crea una desde la sección Nueva propiedad.</span>
                                                </div>

                                                ) 
                                            }

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

export default Main;