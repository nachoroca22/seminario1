import React, { Component } from 'react';

// Logo del proyecto.
import UserImg from "../../assets/img/logo2.png"

// Datos Usuarios
import users from '../../data/users.json';

// Importo llamada a endpoint
import {Login as LoginAPI} from "../controller/MainController";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_pass: '',
            usuarioValido: false,
            msj_error: false,
            className: 'form-control',
            users: users,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Validacion de usuario segun el rol del mismo.
    handleSubmit = async (event) =>{
        event.preventDefault();
        
        // Ejecuto el endopoint para validar login
        let getLogin = await LoginAPI(this.state.user_name, this.state.user_pass);

        if(getLogin.rdo === 0 ) {
            this.setState({usuarioValido: true});
            this.redirect();
        } else {
            if(this.state.msj_error === false) {
                this.setState({msj_error: !this.state.msj_error})
                this.setState({className: "form-control is-invalid"});
            }
        }
    }

    // Si el usuario es valido, redirecciono. Si no, mensaje de error.
    redirect = () => {
        const userRol = localStorage.getItem('rol');

        switch(userRol) {
            case "Propietario":
                this.props.history.push({
                    pathname: '/propietario',
                })
                break;
            case "Inmobiliaria":
                this.props.history.push({
                    pathname: '/propietario',
                })
                break;
            case "Inquilino":
                this.props.history.push({
                    pathname: '/inquilino',
                })
                break;
            default:
                this.setState({msj_error: !this.state.msj_error})
                this.setState({className: "form-control is-invalid"})
                break;
        }

    }
    
    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    signUp = () => {
        this.props.history.push({
            pathname: '/nuevo_usuario',
        })
    }
    render() {
        return (
            <div className="fondo-login">
                <div className="container">
                    <div className="row align-items-center justify-content-center vh-100">
                        <div className="col-sm-12 col-md-5 col-lg-5 align-self-center">
                            <div className="card">
                                <div className="card-body">
                                    <img src={UserImg} className="mx-auto d-block" width="180" alt="Usuario"/>
                                    <h4 className="text-center p-3">Bienvenido</h4>

                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row justify-content-center p-3">
                                            <div className="col-sm-12 col-md-10 col-lg-10">
                                                <div className="form-group">
                                                    <input 
                                                        name="user_name" 
                                                        type="text" 
                                                        className={this.state.className}
                                                        autoComplete="off" 
                                                        autoFocus={true}
                                                        required
                                                        placeholder="Correo electr&oacute;nico"
                                                        value={this.state.user_name}
                                                        onChange={this.myChangeHandler} />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-10 col-lg-10">
                                                <div className="form-group">
                                                    <input 
                                                        name="user_pass" 
                                                        type="password" 
                                                        className={this.state.className}
                                                        autoComplete="off" 
                                                        required
                                                        placeholder="Contrase&ntilde;a" 
                                                        value={this.state.user_pass }
                                                        onChange={this.myChangeHandler} />
                                                </div>
                                            </div>
                                            { this.state.msj_error ? ( <small className="text-danger">Ingresa un correo electr&oacute;nico y contrase&ntilde;a validos</small> ) : null }
                                        </div>
                                        
                                        <div className="row p-3 justify-content-center">
                                            <div className="col-sm-12 col-md-10 col-lg-10">
                                                    <button 
                                                        type="submit" 
                                                        id="submit-btn" 
                                                        className="btn btn-primary btn-block alquilar-btn-login">
                                                        Iniciar sesi&oacute;n
                                                    </button>
                                                <div className="text-right">
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-link btn-link-Alquilar text-muted" >
                                                            <small>¿Necesitas ayuda?</small>
                                                    </button>
                                                </div>
                                            </div>
                                        </div> 
                                    </form>
                                </div>
                                <div className="card-footer text-muted text-center">
                                    <div style={{fontSize: "14px"}}>¿Primera vez?
                                    <button 
                                        type="button" 
                                        className="btn btn-link pad-left"
                                        style={{fontSize: "14px", paddingBottom: "8px"}}
                                        onClick={this.signUp} >
                                        Crea tu cuenta
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

export default Login;