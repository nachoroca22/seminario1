import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import './App.css';

// Componentes Login
import Login from "./components/login/login"
import Signup from "./components/login/Signup"

// Componentes Inquilino
import Tenant from "./components/inquilino/TenantView"
import TenantClaims from './components/inquilino/claims/ClaimsView';
import TenantClaimsDetail from './components/inquilino/claims/ClaimDetail';

// Componentes Propuetario
import Owner from "./components/propietario/MainView"
import NewProperty from "./components/propietario/NewProperty"
import Publications from "./components/propietario/Publications"
import TemplateAgreement from "./components/propietario/TemplateAgreement"
import PropertyDescription from './components/propietario/PropertyDescription';
import ContractView from './components/propietario/contract/ContractView';
import Claims from './components/propietario/claims/ClaimsView';
import ClaimsDetail from './components/propietario/claims/ClaimDetail';

class App extends Component {

  render() {
    return ( 
      <Router>
        <Route exact path="/login" component = {Login} />
        <Route exact path="/nuevo_usuario" component = {Signup} />
        <Route exact path="/inquilino" component = {Tenant} />
        <Route exact path="/propietario" component = {Owner} />
        <Route exact path="/nuevaProp" component = {NewProperty} />
        <Route exact path="/publicaciones" component = {Publications} />
        <Route exact path="/plantillaContrato" component = {TemplateAgreement} />
        <Route exact path="/descripcion" component = {PropertyDescription} />
        <Route exact path="/contrato" component = {ContractView} />
        <Route exact path="/reclamosPropietario" component = {Claims} />
        <Route exact path="/detalleReclamoPropietario" component = {ClaimsDetail} />
        <Route exact path="/reclamosInquilino" component = {TenantClaims} />
        <Route exact path="/detalleReclamoInquilino" component = {TenantClaimsDetail} />
        <Route exact path="/" render={() => <Redirect to="/login"/>} />
      </Router>
    )
  }

}

export default App;