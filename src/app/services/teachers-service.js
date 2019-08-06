import ServiceFactory from 'lib-core/services/service-factory';
import config from 'app/config';

let teachersService = new ServiceFactory();

teachersService.setServices([
    {
        serviceName: 'getAll',
        method: 'GET',
        url: config.localhost.concat('/users/teachers'),
        requireAuth: true
    },
    {
        serviceName: 'getOne',
        method: 'GET',
        url: config.localhost.concat('/users/teachers/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'edit',
        method: 'PUT',
        url: config.localhost.concat('/users/teachers/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'sendInvitation',
        method: 'POST',
        url: config.localhost.concat('/users/teachers/invite'),
        requireAuth: true
    }
]);

export default teachersService;
