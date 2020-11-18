const URL_API = "seminario1alquilar.herokuapp.com";
// const URL_API = "http://localhost:3000/";

const urlWebServices = {
    login: URL_API + "/api/Users/login",
    signup: URL_API + "/api/Users",
    getPropertyByOwnerId: URL_API + "/api/Properties/GetPropertyByOwnerId",
    getPropertyByTenantId: `${URL_API}​/api/Properties/GetPropertyByTenantId`,
    getClaimsByPropId: `${URL_API}​/api/Claims/GetClaimsByPropId`,
    updateContrat: URL_API + "/api/Properties/UpdateContrat",
    updateCurrentContrat: `${URL_API}/api/Properties/UpdateCurrentContrat`,
    setClaims: `${URL_API}/api/Claims`,
    updateClaimState: `${URL_API}/api/Claims/UpdateClaimState`,
    setProperty: `${URL_API}/api/Properties`,
    deleteProperty: `${URL_API}/api/Properties`
}

export default urlWebServices;