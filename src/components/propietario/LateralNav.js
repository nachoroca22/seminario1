import React, { Component } from 'react';


class LateralNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    Properties = () => {
        this.props.history.push({
            pathname: '/propietario',
        })
    }
    NewProperty = () => {
        this.props.history.push({
            pathname: '/nuevaProp',
        })
    }
    publications = () => { 
        this.props.history.push({
            pathname: '/publicaciones',
        })
    }
    TemplateAg = () => {
        this.props.history.push({
            pathname: '/plantillaContrato',
        })
    }
    render() {
        return (
            <div className="">
                <div className="bg-light" id="sidebar-wrapper">
                    <div className="list-group list-group-flush mt-2">
                        <button 
                            type="button"
                            className="list-group-item list-group-item-action bg-light pad-left"
                            name="Properties"
                            onClick={this.Properties}>
                            <i className="material-icons align-middle mr-2">apartment</i>Mis propiedades
                        </button>
                        <button 
                            type="button"
                            className="list-group-item list-group-item-action bg-light pad-left"
                            name="NewProperty" 
                            onClick={this.NewProperty}>
                            <i className="material-icons align-middle mr-2">add_box</i>Nueva propiedad
                        </button>
                        <button 
                            type="button"
                            className="list-group-item list-group-item-action bg-light pad-left"
                            name="NewProperty" 
                            onClick={this.publications}>
                            <i className="material-icons align-middle mr-2">home_work</i>Mis publicaciones
                        </button>
                        <button
                            type="button" 
                            className="list-group-item list-group-item-action bg-light pad-left"
                            name="TemplateAg" 
                            onClick={this.TemplateAg}>
                            <i className="material-icons align-middle mr-2">assignment</i>Plantillas contratos
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LateralNav;