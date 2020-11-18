import React, { Component } from 'react';


class LateralNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    Properties = () => {
        this.props.history.push({
            pathname: '/inquilino',
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
                            name="Properties"
                            disabled>
                            <i className="material-icons align-middle mr-2">assignment</i>Mis contratos
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LateralNav;