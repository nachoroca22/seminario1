import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import LateralNav from './LateralNav'
import Publication from './Publication'
import Footer from '../Footer'

// Importo llamada a endpoint
import {GetPropertyByOwnerId as PropertiesAPI} from "../controller/MainController";

class Publications extends Component {
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
        let enabled = 0;
        let disabled = 0;
        this.state.properties.map(property => property.estado === "Publicado" ? (enabled++) : (disabled++));
        const cantPropiedades = this.state.properties.length;
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
                                                <h4 className="rr22">Publicaciones</h4>
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
                                        <div className="row justify-content-center mt-4">
                                            <div className="col-sm-12 col-md-10 col-lg-10">
                                                <div className="card text-white bg-dark">
                                                    <div className="card-body">
                                                        <span>Por el momento esta funcionalidad no est&aacute; disponible. Muy pronto podr&aacute;s publicar tus propiedades en sitios como MercadoLibre, ZonaProp y muchos m&aacute;s.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center mt-4">
                                            <div className="col-sm-12 col-md-10 col-lg-10">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-sm-12 col-md-2 col-lg-2 text-center">
                                                                    
                                                                    <h1 className="size-4-5"> {cantPropiedades} </h1>
                                                                    <span className="font-weight-light size-1em text-muted">Propiedades disponibles</span>
                                                                        
                                                                </div>

                                                                <div className="col-sm-12 col-md-1 col-lg-1">
                                                                    <div className="vl ml-3"></div>
                                                                </div>

                                                                <div className="col-sm-12 col-md-3 col-lg-3">
                                                                    <div className="card text-white color-success mb-3">
                                                                            <div className="card-body">
                                                                            <h2>{enabled}
                                                                                <i 
                                                                                    className="material-icons float-right ico-publication">
                                                                                    play_circle_outline
                                                                                </i>
                                                                            </h2>
                                                                            { enabled === 0 || enabled >1 ? ( <h6>Activas</h6> ) : ( <h6>Activa</h6> ) }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-12 col-md-3 col-lg-3">
                                                                    <div className="card text-white bg-secondary mb-3">
                                                                            <div className="card-body">
                                                                            <h2>0 {/*Esta valor se debe tomar de un servicio que vea en que sitio la publicacion fanalizo.*/} 
                                                                                <i className="material-icons float-right ico-publication" >error_outline
                                                                                </i>
                                                                            </h2>
                                                                            <h6>Finalizadas</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-12 col-md-3 col-lg-3">
                                                                    <div className="card text-white bg-info mb-3">
                                                                            <div className="card-body">
                                                                            <h2>{disabled}
                                                                                <i className="material-icons float-right ico-publication">query_builder
                                                                                </i>
                                                                            </h2>
                                                                            <h6>Por publicar</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center justify-content-center mb-5">
                                            <div className="col-sm-12 col-md-10 col-lg-10 align-self-center">
                                                
                                                {/*Mapeo todas las propiedades disponibles para publicar. */}
                                                { this.state.properties
                                                .filter(property => property.direccion.toLowerCase().includes(this.state.text_search.toLowerCase()))
                                                .map(property => <Publication property = {property} key={property.prop_id} history={this.props.history}/>) }

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

export default Publications;