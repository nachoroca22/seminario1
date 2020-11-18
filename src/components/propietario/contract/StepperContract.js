import React, { Component } from 'react';

class Stepper extends Component {
    render() {
        return (
            <div>
                <div className="card border-info mb-4">
                    <div className="card-body">

                        <div className="row justify-content-center">
                            <div className="col-2 text-center">
                                <button type="button" className="btn btn-outline-info mb-2" disabled>
                                    <i className="material-icons align-middle">filter_1</i>
                                </button>
                                <br/>
                                <small className="font-weight-light text-muted">Locatario</small>
                            </div>
                            <div className="col-1 text-center">
                                <hr/>
                            </div>
                            <div className="col-2 text-center">
                                <button type="button" className="btn btn-outline-info mb-2"disabled>
                                    <i className="material-icons align-middle">filter_2</i>
                                </button>
                                <br/>
                                <small className="font-weight-light text-muted">Locador</small>
                            </div>
                            <div className="col-1 text-center">
                                <hr/>
                            </div>
                            <div className="col-2 text-center">
                                <button type="button" className="btn btn-outline-info mb-2" disabled>
                                    <i className="material-icons align-middle">filter_3</i>
                                </button>
                                <br/>
                                <small className="font-weight-light text-muted">Garante</small>
                            </div>
                            <div className="col-1 text-center">
                                <hr/>
                            </div>
                            <div className="col-2 text-center">
                                <button type="button" className="btn btn-outline-info mb-2" disabled>
                                    <i className="material-icons align-middle">filter_4</i>
                                </button>
                                <br/>
                                <small className="font-weight-light text-muted">Condiciones</small>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Stepper;