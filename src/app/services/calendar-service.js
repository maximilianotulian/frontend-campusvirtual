import ServiceFactory from 'lib-core/services/service-factory';
import config from 'app/config';

let calendarService = new ServiceFactory();

calendarService.setServices([
    {
        serviceName: 'getAll',
        method: 'GET',
        url: config.localhost.concat('/events/'),
        requireAuth: true
    },
    {
        serviceName: 'getOne',
        method: 'GET',
        url: config.localhost.concat('/events/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'edit',
        method: 'PUT',
        url: config.localhost.concat('/events/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'create',
        method: 'POST',
        url: config.localhost.concat('/events/'),
        requireAuth: true
    },
    {
        serviceName: 'delete',
        method: 'DELETE',
        url: config.localhost.concat('/events/[objectId]/'),
        requireAuth: true
    }
]);

export default calendarService;
