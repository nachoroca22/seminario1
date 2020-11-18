import urlWebServices from '../controller/WebServices.js';

export const Login = async (userId, pass) => {
    //url webservices
    let URL_API = urlWebServices.login;

    let req = JSON.stringify({
        userMail: userId,
        userPass: pass
    })

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        const json = await response.json();
        let rdo = response.status;

        switch(rdo) {
            case 201: {
                // Guardo usuario logueado
                let user = json;
                localStorage.setItem("nombre",user.userName);
                localStorage.setItem("rol",user.userRol);
                localStorage.setItem("email",user.userMail);
                localStorage.setItem("usuarioValido", true);
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"El usuario ingresado no existe en nuestra base."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const Signup = async (userName, userPass, userMail, userRol) => {
    //url webservices
    let URL_API = urlWebServices.signup;

    let req = JSON.stringify({
        userName: userName,
        userPass: userPass,
        userMail: userMail,
        userRol: userRol
    })

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;

        switch(rdo) {
            case 201: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"El usuario no pudo ser dado de alta."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const GetPropertyByOwnerId = async (userMail) => {
    //url webservices
    let URL_API = urlWebServices.getPropertyByOwnerId;

    try {
        const response = await fetch('http://' + URL_API + '/' + userMail, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;
        let data = await response.json();

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok", data}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo recuperar las propiedades de ese usuario."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const GetPropertyByTenantId = async (userMail) => {
    //url webservices
    let URL_API = urlWebServices.getPropertyByTenantId;

    try {
        const response = await fetch('http://' + URL_API + '/' + userMail, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;

        let data = await response.json();

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok", data}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo recuperar las propiedades de ese usuario."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const NewContract = async (propertyId, tenant_lastname, tenant_name, tenant_DNI, tenant_sex, tenant_phone, tenant_cant_inq, owner_lastname, owner_name, owner_DNI, owner_sex, owner_phone, owner_home, surety_lastname, surety_name, surety_DNI, surety_sex, surety_phone, surety_home, surety_city, surety_province, terms_since, terms_until, terms_address, terms_city, terms_province, terms_price, terms_price_USD) => {
    //url webservices
    let URL_API = urlWebServices.updateContrat;
    
    let req = JSON.stringify({
        "contrato": {
            "locatario": {
                "apellido": tenant_lastname,
                "nombre": tenant_name,
                "DNI": tenant_DNI,
                "sexo": tenant_sex,
                "telefono": tenant_phone,
                "cant_inquilinos": parseInt(tenant_cant_inq),
                "user_mail": "juan.diaz@gmail.com"
            },
            "locador": {
                "apellido": owner_lastname,
                "nombre": owner_name,
                "DNI": owner_DNI,
                "telefono": owner_phone,
                "domicilio": owner_home,
                "user_mail": "pablo.aguirre@gmail.com"
            },
            "garante": {
                "apellido": surety_lastname,
                "nombre": surety_name,
                "DNI": surety_DNI,
                "sexo": surety_sex,
                "telefono": surety_phone,
                "domicilio": surety_home,
                "ciudad": surety_city,
                "provincia": surety_province
            },
            "condiciones": {
                "inicio_contrato": terms_since,
                "fin_contrato": terms_until,
                "direccion_inmueble": terms_address,
                "piso": 4,
                "depto": "c",
                "ciudad": terms_city,
                "provincia": terms_province,
                "precio_arg": parseFloat(terms_price),
                "precio_usd": parseFloat(terms_price_USD)
            }
        }
    })
    
    try {
        const response = await fetch('http://' + URL_API + '/' + propertyId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo crear el contrato."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const UpdateCurrentContract = async (propertyId, contrato_vigente, tenant_mail) => {
    //url webservices
    let URL_API = urlWebServices.updateCurrentContrat;
    
    let req = JSON.stringify({
        "contrato_vigente": contrato_vigente,
        "inquilino": tenant_mail
    })

    console.log(req)
    
    try {
        const response = await fetch('http://' + URL_API + '/' + propertyId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;
        console.log(rdo)

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo crear el contrato."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const GetClaimsByPropId = async (propertyId) => {
    //url webservices
    let URL_API = urlWebServices.getClaimsByPropId;

    try {
        const response = await fetch('http://' + URL_API + '/' + propertyId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;
        let data = await response.json();

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok", data}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo recuperar las propiedades de ese usuario."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const NewClaim = async (propertyId, claimOwner, claimPriority, claimDate, claimTitle, claimDescription, claimState) => {
    //url webservices
    let URL_API = urlWebServices.setClaims;
    
    let req = JSON.stringify({
        prop_id: propertyId,
        titulo: claimTitle,
        descripcion: claimDescription,
        estado: claimState,
        creado_por: claimOwner,
        prioridad: claimPriority,
        fecha_creacion: claimDate,
        comentarios: null
    })
    
    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;
        console.log(rdo);

        switch(rdo) {
            case 201: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo crear el reclamo."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const UpdateClaimState = async (claimId, claimState) => {
    //url webservices
    let URL_API = urlWebServices.updateClaimState;
    
    let req = JSON.stringify({
        estado: claimState
    })

    try {
        const response = await fetch('http://' + URL_API + '/' + claimId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;
        console.log(rdo);

        switch(rdo) {
            case 204: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo actualizar el estado del reclamo."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const NewProperty = async (property_owner, kind_of_property, property_type_operation, property_province, property_city, property_address, property_floor, property_department, property_descripcion, property_rental_value, property_expenses_value, property_environments, property_bedrooms, property_bathrooms, property_garages, property_toilettes, property_antiquity, property_situation, property_tenant, property_meters_built, property_total_built, arrServices, arrInstallations) => {
    //url webservices
    let URL_API = urlWebServices.setProperty;
    
    let req = JSON.stringify({

        estado: property_situation,
        direccion: property_address,
        provincia: property_province,
        ciudad: property_city,
        tipo: kind_of_property,
        operacion: property_type_operation,
        precio: parseFloat(property_rental_value),
        expensas: parseFloat(property_expenses_value),
        piso: parseInt(property_floor),
        depto: property_department,
        sup_total: property_meters_built,
        sup_cubierta: property_total_built,
        ambientes: parseInt(property_environments),
        baños: parseInt(property_bathrooms),
        cocheras: parseInt(property_garages),
        dormitorios: parseInt(property_bedrooms),
        antiguedad: property_antiquity,
        descripcion: property_descripcion,
        miniatura: "https://i.imgur.com/EQkFIgr.jpg",
        inquilino: property_tenant,
        propietario: property_owner,
        currency: 0,
        servicios: arrServices,
        instalaciones: arrInstallations
    })
    
    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: req
        });

        let rdo = response.status;

        switch(rdo) {
            case 201: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo crear la propiedad."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const DeleteProperty = async (prop_id) => {
    //url webservices
    let URL_API = urlWebServices.deleteProperty;

    try {
        const response = await fetch('http://' + URL_API + '/' + prop_id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;

        switch(rdo) {
            case 204: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo actualizar el estado del reclamo."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}