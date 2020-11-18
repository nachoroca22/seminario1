import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import LateralNav from './LateralNav'
import Footer from '../Footer'
import FormNewProperty from './FormNewProperty'
import Stepper from './Stepper'

class NewProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    handleChangeValue = e => this.setState({value: e.target.value});

    render() {
        return (
            <div>
                <Nav history={this.props.history} />
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-5 col-lg-2 bg-light text-secondary margen-lateralNav border-right">
                                <LateralNav history={this.props.history} />
                            </div>
                            <div className="col">
                                <div className="container">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-sm-12 col-md-10 col-lg-10 align-self-center mt-4 mb-5">

                                            <Stepper history={this.props.history} value={this.state.value}/>

                                            <FormNewProperty history={this.props.history} value={this.state.value} onChangeValue={this.handleChangeValue}/>

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

export default NewProperty;