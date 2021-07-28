module.exports = global.config = {
    url: {
        production: false,
        dev: 'https://localhost:44330/api/',
        prod: 'https://localhost:44330/api/'
    },
    headers: {
        production: false,
        dev: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }),
        prod: ''
    }
};