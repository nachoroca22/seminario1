import React, { Component } from 'react';

// Imagenes
import meli from "../../assets/img/meli.jpg"
import zonaprop from "../../assets/img/zonaprop.jpg"
import argenprop from "../../assets/img/argenprop.jpg"
import soloduenos from "../../assets/img/soloduenos.jpg"
import enbuenosaires from "../../assets/img/enbuenosaires.jpg"

class Publication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: this.props.property,
        };
    }
    render() {
        const property = this.state.property;
        const target = '#collapse'+property.prop_id.toString();
        const targetDestination = 'collapse'+property.prop_id.toString();
        return (
            <div>
                <div className="accordion" id="accordionExample">
                    <div className="card mt-4 border-secondary">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button 
                                    className="btn btn-block collapsed text-left alquilar-btn-publication" 
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target={target} 
                                    aria-expanded="true" 
                                    aria-controls="collapseOne">
                                    <span className="font-weight-bold">{property.direccion}</span> - 
                                    Precio ${property.precio} - 
                                    Expensas ${property.expensas}
                                    { property.estado==="Publicado" ? ( <i className="material-icons float-right ico-success">play_circle_outline</i> ) : null }
                                    { property.estado==="Desocupado" ? ( <i className="material-icons float-right ico-pending">query_builder</i> ) : null }
                                    { property.estado==="Alquilado" ? ( <i className="material-icons float-right ico-pending">query_builder</i> ) : null }
                                </button>
                            </h2>
                        </div>

                        <div 
                            id={targetDestination} 
                            className="collapse" 
                            aria-labelledby="headingOne" 
                            data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="card">
                                    <div className="card-body">
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
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer bg-transparent text-right">
                                { property.estado==="Publicado" ? ( <button type="button" className="btn btn-outline-warning mr-3" disabled>Pausar</button>  ) : null }
                                
                                { property.estado==="Publicado" ? ( <button type="submit" className="btn btn-outline-danger" disabled>Finalizar</button>  ) : ( <button type="submit" className="btn alquilar-btn-outline" data-toggle="modal" data-target="#exampleModal" disabled>Publicar</button> ) }
                            </div>
                        </div>
                    </div>
                </div>

                {/* -- Modal -- */}
            
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="mt-4"></div>
                                <i className="material-icons ico-success size-120">check_circle</i>
                                <br/>
                                <h2>Listo!</h2>
                                <p><span className="font-weight-bold">{property.direccion}</span> ya est&aacute; publicada.</p>
                                <small className="text-muted">La podes ver en: </small>
                                <div className="mb-5"></div>
                            </div>

                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}

export default Publication;