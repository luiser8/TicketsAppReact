import './Config';

export const get = async (route) => {
    let url = global.config.url.production ? `${global.config.url.prod}${route}` : `${global.config.url.dev}${route}`;
    let result = await fetch(`${url}`, {
        method: 'GET',
        mode: 'cors',
        headers: global.config.headers.production ? global.config.headers.prod : global.config.headers.dev,
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json()
        }else {
            response.json().then((json) => { 
                return json; 
            });
            return null
        }
    }).catch(e => console.log(e))
    if (result == null) {
        return result;
    } else {
        return result
    }
}
export const post = async (route, data) => {
    let url = global.config.url.production ? `${global.config.url.prod}${route}` : `${global.config.url.dev}${route}`;
    let result = await fetch(`${url}`, {
        method: 'POST',
        mode: 'cors',
        headers: global.config.headers.production ? global.config.headers.prod : global.config.headers.dev,
        body: JSON.stringify(data),
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json()
        }else {
            response.json().then((json) => { 
                return json; 
            });
            return null
        }
    }).catch(e => console.log(e))
    if (result == null) {
        return result;
    } else {
        return result
    }
}
export const put = async (route, data) => {
    let url = global.config.url.production ? `${global.config.url.prod}${route}` : `${global.config.url.dev}${route}`;
    let result = await fetch(`${url}`, {
        method: 'PUT',
        mode: 'cors',
        headers: global.config.headers.production ? global.config.headers.prod : global.config.headers.dev,
        body: JSON.stringify(data),
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json()
        }else {
            response.json().then((json) => { 
                return json; 
            });
            return null
        }
    }).catch(e => console.log(e))
    if (result == null) {
        return result;
    } else {
        return result
    }
}
export const del = async (route) => {
    let url = global.config.url.production ? `${global.config.url.prod}${route}` : `${global.config.url.dev}${route}`;
    let result = await fetch(`${url}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: global.config.headers.production ? global.config.headers.prod : global.config.headers.dev,
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json()
        }else {
            response.json().then((json) => { 
                return json; 
            });
            return null
        }
    }).catch(e => console.log(e))
    if (result == null) {
        return result;
    } else {
        return result
    }
}