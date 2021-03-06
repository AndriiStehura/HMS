export const API_HOUSES = "api/houses", 
             API_PERSONS = "api/persons",
             API_PAYMENTS = "api/payments",
             API_PROVIDERS = "api/providers",
             API_SERVICES = "api/services",
             API_EXPENSES = "api/expenses"

export const apiGet = (uri, dispatch) => {
    return fetch(uri)
        .then(x => x.json())
        .then(data => dispatch(data))
        .catch(x => alert(x))
}

export const apiPost = (uri, body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(uri, requestOptions)
}

export const apiPut = (uri, body) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(uri, requestOptions)
}

export const apiDelete = (uri, id) => {
    const requestOptions = {
        method: 'DELETE',
    };
    return fetch(`${uri}/${id}`, requestOptions)
}
