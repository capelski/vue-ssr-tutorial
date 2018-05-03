'use strict';

const baseApiUrl = process.env.baseApiUrl;

export const get = (url, parameters, defaultValue) => {        
    var options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include'
    };

    if (parameters) {
        url += '?';
        for (var key in parameters) {
            var parameter = parameters[key];
            if (parameter) {
                url += (key + '=' + encodeURIComponent(parameter) + '&');
            }
        }
        url = url.substring(0, url.length - 1);
    }
    
    return fetch(baseApiUrl + url, options)
    .then(response => response.json())
    .catch(error => defaultValue);
};