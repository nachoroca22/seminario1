import React, { Component } from 'react';

// Componentes
import Nav from '../Nav'
import LateralNav from '../LateralNav'
import Footer from '../../Footer'
import Contract from './Contract'
import StepperContract from './StepperContract'
import FormNewContract from './FormNewContract'


class ContractView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: this.props.location.state.property,
        };
        this.goBack = this.goBack.bind(this);
    }
    goBack(){
        this.props.history.goBack();
    }
    goTop(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    goDown(){
        window.scrollTo({ 
            top: document.body.scrollHeight, 
            behavior: "smooth" 
        });
    }
    render() {
        const property = this.state.property;
        if(property.contrato_vigente) {
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
                                        <div className="row align-items-center justify-content-center">
                                            <div className="col-sm-12 col-md-10 col-lg-10 align-self-center mt-4 mb-5">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-link mb-4"
                                                    onClick={this.goBack}>
                                                        Volver
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-link mb-4 float-right"
                                                    onClick={this.goDown}>
                                                        Bajar
                                                </button>
                                                <div className="card mb-4">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-4 text-center align-center">
                                                                <h5>{property.direccion}</h5>
                                                            </div>
                                                            <div className="col-2 text-center">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-outline-secondary" disabled>
                                                                    <i className="material-icons align-middle">edit</i>
                                                                </button>
                                                            </div>
                                                            <div className="col-2 text-center">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-outline-secondary" disabled>
                                                                    <i className="material-icons align-middle">file_download</i>
                                                                </button>
                                                            </div>
                                                            <div className="col-2 text-center">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-outline-secondary" disabled>
                                                                    <i className="material-icons align-middle">print</i>
                                                                </button>
                                                            </div>
                                                            <div className="col-2 text-center">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-outline-secondary" disabled>
                                                                    <i className="material-icons align-middle">cancel</i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card border-dark mb-4">
                                                    <div className="card-body">
                                                        <Contract property={this.state.property}/>
                                                    </div>
                                                </div>

                                                <div className="card border-dark mb-4">
                                                    <div className="card-body">
                                                        <div className="row justify-content-center">
                                                            <div className="col-6">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-block btn-outline-secondary" disabled>
                                                                    <i className="material-icons align-middle mr-2">grading</i>Firma Digital
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-link"
                                                    onClick={this.goBack}>
                                                        Volver
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-link float-right"
                                                    onClick={this.goTop}>
                                                        Subir
                                                </button>
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
                                        <div className="row align-items-center justify-content-center">
                                            <div className="col-sm-12 col-md-10 col-lg-10 align-self-center mt-4 mb-5">

                                                <StepperContract />

                                                <FormNewContract property={this.state.property} history={this.props.history}/>

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

export default ContractView;