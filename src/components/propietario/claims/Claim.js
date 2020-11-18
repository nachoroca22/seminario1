import React, { Component } from "react";

class Claim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            claim: this.props.claim,
            property: this.props.property,
        };
    }
    claimDetail = () => {
        this.props.history.push({
            pathname: '/detalleReclamoPropietario',
            state: {
                claim: this.state.claim,
                property: this.state.property,
            }
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }
    render() {
        let claim = this.state.claim
        const dbDate = new Date(claim.fecha_creacion);
        const dbDate2 = new Date(claim.fecha_modificacion);
        let fecha_creacion = new Intl.DateTimeFormat('en-GB').format(dbDate);
        let fecha_actualizacion = new Intl.DateTimeFormat('en-GB').format(dbDate2);
        return( 
            <div>                
                 <div className="card mt-4" >
                    <div className="card-header" >
                        <div className="d-flex w-100 mb-1">
                                { claim.estado==="Solucionado" ? 
                                    ( <span className="font-weight-bold text-secondary">{claim.estado} </span> ) : (
                                        <span className="font-weight-bold text-success">{claim.estado} </span>
                                    ) 
                                } 
                                &nbsp; &nbsp; &nbsp; {claim.prioridad} &nbsp; &nbsp; &nbsp;
                                <i className="material-icons">person</i> {claim.creado_por} &nbsp; &nbsp; 
                                <i className="material-icons">access_time</i> {fecha_creacion} &nbsp; &nbsp; 
                                <i className="material-icons">update</i> {fecha_actualizacion}
                          
                        </div>
                        <hr className="no-padding"/>
                        <button 
                            onClick={this.claimDetail} 
                            className="btn btn-block text-left no-box">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="mb-1">
                                        <span className="font-weight-bold claim">{claim.titulo}</span> 
                                        <br/>
                                        <small className="text-muted">{claim.descripcion}</small>
                                    </div>
                                </div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Claim;