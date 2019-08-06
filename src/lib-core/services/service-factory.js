import _ from 'lodash';

// Rename, I don't know if this is actually a factory. Not currently creating new objects, just setting and getting. 
export default class ServiceFactory {

    constructor () {
        this.services = {};
    }

    getService (serviceName) {
        return this.services[serviceName];
    }

    setServices (servicesConfig) {
        if (!_.isEmpty(servicesConfig)) {
            _.each(servicesConfig, (serviceConfig) => {
                if (!this.services[serviceConfig.serviceName]) {
                    this.services[serviceConfig.serviceName] = serviceConfig;
                }
            });
        }
    }
}
