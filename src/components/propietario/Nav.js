import React, { Component } from 'react';

// Logo del proyecto.
import LogoImg from '../../assets/img/logo.jpg'
import IconoUsuario from '../../assets/img/person.svg'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: localStorage.getItem('nombre'),
        };
    }
    Properties = () => {
        this.props.history.push({
            pathname: '/propietario',
        })
    }
    signOff = () => {
        this.props.history.push('/login');
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark color-alquilar">
                    <div className="container-fluid">
                    <button 
                        type="button" 
                        className="btn navbar-brand alquilar-btn-publication" 
                        onClick={this.Properties}>
                            <img 
                                src={LogoImg} 
                                width="134" 
                                height="32" 
                                alt="ALQUILAR"/>
                    </button>
                    <div>
                        <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <button
                                type="button"
                                className="btn btn-primary dropdown-toggle color-alquilar-btn"
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false">
                                <span className="mr-2">{this.state.user_name}</span> <img src={IconoUsuario} className="mr-2" alt="Icono Usuario" />
                            </button>
                            <div className="dropdown-menu" aria-labelledby="user_header">
                                <button 
                                    type="button" 
                                    className="dropdown-item btn btn-link"
                                    disabled>
                                    Mi Cuenta
                                </button>
                                <div className="dropdown-divider"></div>
                                <button 
                                    type="button" 
                                    className="dropdown-item btn btn-link"
                                    disabled>
                                    Ayuda
                                </button>
                                <button 
                                    type="button" 
                                    className="dropdown-item btn btn-link"
                                    onClick={this.signOff}>
                                    Cerrar sesi&oacute;n
                                </button>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;