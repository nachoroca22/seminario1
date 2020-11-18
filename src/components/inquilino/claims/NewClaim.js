import React, { Component } from 'react';

// Importo llamada a endpoint
import {NewClaim as NewClaimAPI} from "../../controller/MainController";

function cambiarAFormatoAR(fecha){
    //let fecha = "15/08/2020";
    console.log(fecha);
    let fechaSplit = fecha.split("/");
    let dia = new Date(parseInt(fechaSplit[2], 10), // anio
                        parseInt(fechaSplit[0], 10) - 1, //mes
                        parseInt(fechaSplit[1], 10)); // dia
    
    //let diaFormateado = dia.getDate() + "-" + (dia.getMonth() + 1) + "-" + dia.getFullYear()
    let diaFormateado = dia.getFullYear() + "-" + (dia.getMonth() + 1) + "-" + dia.getDate();
    return diaFormateado;
}

class NewClaim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyId: this.props.property.prop_id,
            claimOwner: '',
            claimPriority: '',
            claimDate: '',
            claimTitle: '',
            claimDescription: '',
            claimState: 'Abierto',
            activeView: 'form'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();

        let propertyId = this.state.propertyId
        let claimOwner = this.state.claimOwner
        let claimPriority = this.state.claimPriority
        let claimDate = this.state.claimDate
        console.log(claimDate);
        
        if(claimDate==='') {
            var dbDate = new Date();
            claimDate = new Intl.DateTimeFormat('en-US').format(dbDate);
        }
        claimDate = cambiarAFormatoAR(claimDate);

        let claimTitle = this.state.claimTitle
        let claimDescription = this.state.claimDescription
        let claimState = this.state.claimState

        this.setState({activeView: 'loading'});

        // Ejecuto el endopoint para crear un nuevo reclamo
        let NewClaim = await NewClaimAPI(propertyId, claimOwner, claimPriority, claimDate, claimTitle, claimDescription, claimState);

        if(NewClaim.rdo === 0 ) {
            this.setState({activeView: "claim_created"});
        } else {
            this.setState({activeView: "claim_fail"});
        }
    }
    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        let activeView = this.state.activeView;
        let property = this.props.property;
        switch(activeView) {
            case "loading": 
            return (
                <div>
                    <div className="card">
                        <div className="card-body mt-5 mb-5">
                            <div className="container text-center">
                                <div className="spinner-border text-secondary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <br/>
                                <p className="text-muted mt-3">Generando reclamo</p>
                            </div>    
                        </div>
                    </div>
                </div>
            )
            case "form":
            return (
                <div>
                    <div className="card mt-3 ">
                        <div className="card-body">
                            <div className="col-sm-12 col-md-12 col-lg-12 mb-3">
                                <h4 className="card-title">Nuevo reclamo</h4>
                                <h6 className="card-subtitle mb-2 text-muted">Formulario para informar un problema en el departamento.</h6>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row justify-content-center p-3">

                                    <div className="col-md-6 mb-6 mb-2">
                                        <div className="form-group">
                                            <label htmlFor="textSurvey">Cliente</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Nombre y Apellido" 
                                                required
                                                autoFocus={true} 
                                                name="claimOwner"
                                                value={this.state.claimOwner}
                                                onChange={this.myChangeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-6 mb-2">
                                        <div className="form-group">
                                            <label htmlFor="textSurvey">Prioridad</label>
                                            <select 
                                                className="form-control"
                                                name="claimPriority"
                                                required
                                                value={this.state.claimPriority}
                                                onChange={this.myChangeHandler} >
                                            <option defaultValue disabled value="">Seleccion&aacute; prioridad</option>
                                            <option value="Baja">Baja</option>
                                            <option value="Media">Media</option>
                                            <option value="Alta">Alta</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-6 mb-2">
                                        <div className="form-group">
                                            <label htmlFor="textSurvey">Fecha de ocurrencia</label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="MM/DD/AAAA" 
                                                required
                                                name="claimDate"
                                                value={this.state.claimDate}
                                                onChange={this.myChangeHandler} />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-6 mb-2"></div>

                                    <div className="col-md-12 mb-12 mb-12">
                                        <div className="form-group">
                                            <label htmlFor="textSurvey">Titulo</label>
                                            <input  
                                                type="text" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Titulo" 
                                                required 
                                                name="claimTitle"
                                                value={this.state.claimTitle}
                                                onChange={this.myChangeHandler} />
                                        </div>
                                    </div>


                                    <div className="col-md-12 mb-12 mb-12">
                                        <label htmlFor="textSurvey">Descripción</label>
                                        <div className="form-group">
                                            <textarea 
                                                className="form-control" 
                                                rows="5"
                                                placeholder="Describa su problema aquí"
                                                required 
                                                name="claimDescription"
                                                value={this.state.claimDescription}
                                                onChange={this.myChangeHandler}>
                                            </textarea>
                                        </div>

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
                                    </div>
                                </div>
                                <hr/>
                                <div className="container">
                                    <div className="row">
                                        <div className="col col-sm-12 col-md-6 col-lg-6 align-items-left">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={this.props.onClick}>
                                                Cancelar
                                            </button>
                                        </div>
                                        <div className="col col-sm-12 col-md-6 col-lg-6">
                                            <button
                                                type="submit"
                                                value="Submit"
                                                className="btn color-alquilar-btn float-right"
                                                onClick={this.handleSubmit}>
                                                Enviar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        case "claim_created":
        return(
            <div>
                <div className="card">
                    <div className="card-body text-center">
                            <div className="mt-4"></div>
                            <i className="material-icons ico-success size-120">check_circle</i>
                            <br/>
                            <h2>Listo!</h2>
                            <p><span className="font-weight-bold"> {this.state.claimTitle} </span> ya est&aacute; creado.</p>
                            <small className="text-muted">Lo podes ver
                                <button 
                                    type="button" 
                                    className="btn btn-link text-reset btn-new-prop pad-left claim-confirm" 
                                    onClick={this.props.onClick}>acá.
                                </button>
                            </small>
                            <div className="mb-5"></div>
                    </div>
                </div>
            </div>
        )
        case "claim_fail":
        return(
            <div>
                <div className="card">
                    <div className="card-body text-center">
                    <div className="mt-4"></div>
                        <i className="material-icons ico-error size-120">error</i>
                        <br/>
                        <h2>Algo salió mal.</h2>
                        <p>No se pudo crear el reclamo para <span className="font-weight-bold">{property.direccion} </span></p>
                        <small className="text-muted">Por favor vuelva a intentarlo.</small>
                        <div className="mb-5"></div>
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

export default NewClaim;