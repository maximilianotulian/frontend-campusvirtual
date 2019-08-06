import _ from 'lodash';
import storage from 'lib-core/persistance/storage';

/*
Config object:
    data: object provided as body in the async call
    filter: function to filter de response
    onDone: callback executed when the call results is succesfully
    onFail: callback executed when the call results is failure
    onSuccess: callback executed
*/

class ServiceCaller {
    constructor() {
        this.authToken = storage.get('authToken');
    }

    setAuthToken(token) {
        this.authToken = token;
    }

    doRequest (serviceConfig, options, data) {
        let request = this.createRequest(serviceConfig, options, data);

        //TODO: find the best way to deal with fecth then => then while having handleResponse and handleFail
        return fetch(request)
            .then(this.parseJson)
            .then(this.handleSuccess)
            .catch(this.handleFail)
    }

    parseJson(response) {
        let result;

        if (response.ok) {
            result = response.text().then( text => text ? JSON.parse(text): {});
        } else {
            result = Promise.reject(response);
        }
        // When doing deletes the server doesn't response with any text. So we need to check it before parsing to JSON
        return result;
    }

    getHeaders(serviceConfig) {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        if (serviceConfig.headers) {
            _.each(serviceConfig.headers, (header) => {
                headers.append(header.key, header.value);
            });
        }

        if (serviceConfig.removeContentType) {
            headers.delete('Content-Type');
        }

        if (serviceConfig.requireAuth) {
            headers.append('Authorization', 'JWT ' + this.authToken);
        }

        return headers;
    }

    createRequest (serviceConfig, options = {}, data = {}) {
        const parameters = options.parameters;
        const queryParameters = options.queryParameters;
        const method = serviceConfig.method || 'POST';
        let requestOptions = {
            headers: this.getHeaders(serviceConfig),
            method: serviceConfig.method || 'POST'
        };
        let url = serviceConfig.url;

        if (parameters) {
            _.each(parameters, (value, key) => {
                url = url.replace(`[${key}]`, value);
            });
        }

        if (queryParameters) {
            url = url.concat('?');
            _.each(queryParameters, (value, key) => {
                url = url.concat(key,'=',value,'&');
            });
        }

        if (method !== 'GET' && method !== 'DELETE') {
            if (requestOptions.headers.get('Content-Type') === 'application/json') {
                requestOptions.body = JSON.stringify(data);
            } else {
                requestOptions.body = data;
            }
        }

        return new Request(url, requestOptions);
    }

    handleSuccess (response) {
        //Here we can apply filters to the response

        return response;
    }

    handleFail (response) {
        //Here we can handle errors
        return Promise.reject(response);
    }
}

export let serviceCaller = new ServiceCaller();