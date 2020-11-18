import React, { Component } from 'react';

class Stepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        };
    }
    render() {
        return (
            <div>
                <div className="card mb-4">
                    <div className="card-body">

                        <div className="row justify-content-center">
                            <div className="col-2 text-center">
                                <button type="button" className="btn btn-outline-info mb-2" disabled>
                                    <i className="material-icons align-middle">filter_1</i>
                                </button>
                                <br/>
                                <small className="font-weight-light text-muted">Caracter&iacute;sticas</small>
                            </div>
                            <div className="col-2 text-center">
                                <hr/>
                            </div>
                            <div className="col-2 text-center">
                                <button type="button" className="btn btn-outline-info mb-2" disabled>
                                    <i className="material-icons align-middle">filter_2</i>
                                </button>
                                <br/>
                                <small className="font-weight-light text-muted">Descripci&oacute;n</small>
                            </div>
                            <div className="col-2 text-center">
                                <hr/>
                            </div>
                            <div className="col-2 text-center">
                                <button type="button" className="btn btn-outline-info mb-2" disabled>
                                    <i className="material-icons align-middle">filter_3</i>
                                </button>
                                <br/>
                                <small className="font-weight-light text-muted">Multimedia y Publicaci&oacute;n</small>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Stepper;