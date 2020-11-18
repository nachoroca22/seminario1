import React, { Component } from 'react';

// Logo del proyecto.
import UserImg from "../../assets/img/logo2.png"

// Importo llamada a endpoint
import {Signup as SignupAPI} from "../controller/MainController";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_email: '',
            user_password: '',
            user_confirm_password: '',
            user_rol: '',
            msj_error_email: '',
            msj_error_pass: '',
            className_email: 'form-control',
            className_pass: 'form-control',
            userCreated: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();
        let mail_valido = false
        let passwords_validas = false

        if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test((this.state.user_email))) {
            this.setState({msj_error_email: ''});
            this.setState({className_email: "form-control is-valid"});
            mail_valido = true
        } else {
            this.setState({msj_error_email: 'Ingrese un email valido.'});
            this.setState({className_email: "form-control is-invalid"});
            mail_valido = false
        }

        if(this.state.user_password === this.state.user_confirm_password) {
            this.setState({msj_error_pass: ''});
            this.setState({className_pass: "form-control is-valid"});
            passwords_validas = true
        } else {
            this.setState({msj_error_pass: 'Las contraseñas ingresadas no son iguales.'});
            this.setState({className_pass: "form-control is-invalid"});
            passwords_validas = false
        }

        if(mail_valido && passwords_validas) {
            // Ejecuto el endopoint para validar login
            let name = this.state.user_name
            let pass = this.state.user_password
            let email = this.state.user_email
            let rol = this.state.user_rol
            let postSignup = await SignupAPI(name, pass, email, rol);

            if(postSignup.rdo === 0 ) {
                this.setState({userCreated: true});
            } else {
                this.setState({userCreated: false});
            }
        }
    }
    
    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    login = () => {
        this.props.history.push('/login');
    }
    render() {
        return (
            <div className="fondo-login">
                <div className="container">
                    <div className="row align-items-center justify-content-center vh-100">
                        <div className="col-sm-12 col-md-9 col-lg-9 align-self-center">
                            
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <div className="row p-3">
                                        <div className="col-md-6 mb-6">
                                            <h4 className="text-center p-2">Crea una cuenta en AlquilAR</h4>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="row justify-content-center p-3">
                                                    <div className="col-md-12 mb-12">
                                                        <div className="form-group">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                autoComplete="off" 
                                                                autoFocus={true} 
                                                                placeholder="Nombre" 
                                                                required
                                                                name="user_name"
                                                                value={this.state.user_name}
                                                                onChange={this.myChangeHandler} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-12">
                                                        <div className="form-group">
                                                            <input 
                                                                type="text" 
                                                                className={this.state.className_email}
                                                                autoComplete="off"  
                                                                placeholder="Correo electr&oacute;nico" 
                                                                required 
                                                                name="user_email"
                                                                value={this.state.user_email}
                                                                onChange={this.myChangeHandler} />
                                                                { this.state.msj_error_email !== '' ? ( <small className="text-danger">{this.state.msj_error_email}</small> ) : null }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-12">
                                                        <div className="form-group">
                                                            <input  
                                                                type="password" 
                                                                className={this.state.className_pass}
                                                                autoComplete="off" 
                                                                placeholder="Contrase&ntilde;a" 
                                                                required 
                                                                name="user_password"
                                                                value={this.state.user_password}
                                                                onChange={this.myChangeHandler} />
                                                            <small className="form-text text-muted">Utiliza ocho caracteres como m&iacute;nimo con una combinaci&oacute;n de letras, n&uacute;meros y s&iacute;mbolos</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-12">
                                                        <div className="form-group">
                                                            <input 
                                                                type="password" 
                                                                className={this.state.className_pass}
                                                                autoComplete="off" 
                                                                placeholder="Confirma tu contrase&ntilde;a" 
                                                                required
                                                                name="user_confirm_password"
                                                                value={this.state.user_confirm_password}
                                                                onChange={this.myChangeHandler} />
                                                                { this.state.msj_error_pass !== '' ? ( <small className="text-danger">{this.state.msj_error_pass}</small> ) : null }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-12">
                                                        <div className="form-group">
                                                            <select 
                                                                className="form-control"
                                                                name="user_rol"
                                                                required
                                                                value={this.state.user_rol}
                                                                onChange={this.myChangeHandler} >
                                                            <option defaultValue disabled value="">Seleccion&aacute; tu perfil ...</option>
                                                            <option value="Propietario">Particular (Due&ntilde;o directo)</option>
                                                            <option value="Inquilino">Particular (Inquilino)</option>
                                                            <option disabled value="Inmobiliaria">Profesional (Inmobiliaria, corredor o constructora)</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row p-3 justify-content-center">
                                                    <div className="col-md-12 mb-12">
                                                        <button 
                                                        type="submit" 
                                                        id="submit-btn" 
                                                        className="btn alquilar-btn-login btn-block">
                                                            Crear cuenta
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="col-md-6 mb-6 align-self-center">
                                            <img 
                                                src={UserImg}
                                                className="img-fluid rounded mx-auto d-block" 
                                                alt="AlquiAR"
                                                width="80%" />
                                            <p className="font-weight-light card-subtitle mb-2 text-center p-3">Todas las herramientas para administrar propiedades en un solo lugar.</p>

                                            <div className="row justify-content-center">
                                                <div className="col-md-12 mb-12">
                                                    
                                                    { this.state.userCreated === true ? ( <div className="alert alert-success text-center" role="alert"> Usuario creado, <button type="button" className="btn btn-link pad-left" onClick={this.login} > inicia sesi&oacute;n </button> </div>) : null }

                                                    { this.state.userCreated === false ? ( <div className="alert alert-warning text-center" role="alert"> El usuario no se pudo crear, vuelva a intentarlo. </div>) : null }

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-muted text-center">
                                    <button 
                                        type="button" 
                                        className="btn btn-link pad-left"
                                        style={{fontSize: "14px", paddingBottom: "8px"}}
                                        onClick={this.login} >
                                        Prefiero iniciar sesi&oacute;n
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;