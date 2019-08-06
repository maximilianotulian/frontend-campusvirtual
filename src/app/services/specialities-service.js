import ServiceFactory from 'lib-core/services/service-factory';
import config from 'app/config';

let specialitiesService = new ServiceFactory();

specialitiesService.setServices([
    {
        serviceName: 'getAll',
        method: 'GET',
        url: config.localhost.concat('/specialities/'),
        requireAuth: false
    },
    {
        serviceName: 'getOne',
        method: 'GET',
        url: config.localhost.concat('/specialities/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'edit',
        method: 'PUT',
        url: config.localhost.concat('/specialities/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'create',
        method: 'POST',
        url: config.localhost.concat('/specialities/'),
        requireAuth: true
    },
    {
        serviceName: 'delete',
        method: 'DELETE',
        url: config.localhost.concat('/specialities/[objectId]/'),
        requireAuth: true
    }
]);

export default specialitiesService;
