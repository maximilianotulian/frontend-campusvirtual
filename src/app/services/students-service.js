import ServiceFactory from 'lib-core/services/service-factory';
import config from 'app/config';

let studentsService = new ServiceFactory();

studentsService.setServices([{
    },
    {
        serviceName: 'getAll',
        method: 'GET',
        url: config.localhost.concat('/users/students'),
        requireAuth: true
    },
    {
        serviceName: 'getOne',
        method: 'GET',
        url: config.localhost.concat('/users/students/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'edit',
        method: 'PUT',
        url: config.localhost.concat('/users/students/[objectId]/'),
        requireAuth: true
    }
]);

export default studentsService;
