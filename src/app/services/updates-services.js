import ServiceFactory from 'lib-core/services/service-factory';
import config from 'app/config';

let updatesServices = new ServiceFactory();

updatesServices.setServices([
    {
        serviceName: 'countUpdates',
        method: 'GET',
        url: config.localhost.concat('/updates/count'),
        requireAuth: true
    }
]);

export default updatesServices;
