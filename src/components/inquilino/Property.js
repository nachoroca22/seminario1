import React, { Component } from 'react';

class Property extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: this.props.property,
        };
    }
    claims = () => {
        this.props.history.push({
            pathname: '/reclamosInquilino',
            state: {
                property: this.state.property,
            }
        })
    }
    render() {
        const property = this.state.property;
        return (
            <div className="card mt-4">
                <div className="row no-gutters">
                    <div className="col-md-3">
                        <img src={property.miniatura} className="card-img h-100" alt="Miniatura" />
                    </div>
                        <div className="col-md-9">
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-9 col-lg-9">
                                        <h5 className="card-title">{property.direccion}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{property.descripcion}</h6>
                                        <button 
                                            type="button" 
                                            className="btn btn-link card-link padding-cero"
                                            onClick={this.contract} 
                                            disabled >
                                                Contrato
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-link card-link padding-cero"
                                            disabled>
                                                Comprobantes de pago
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-link card-link padding-cero"
                                            onClick={this.claims} >
                                                Reclamos <span className="badge ">{property.cant_reclamos}</span>
                                                <span className="sr-only">unread messages</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Property;