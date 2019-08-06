import ServiceFactory from 'lib-core/services/service-factory';
import config from 'app/config';

let subjectsService = new ServiceFactory();

subjectsService.setServices([
    {
        serviceName: 'getAll',
        method: 'GET',
        url: config.localhost.concat('/subjects/'),
        requireAuth: true
    },
    {
        serviceName: 'getOne',
        method: 'GET',
        url: config.localhost.concat('/subjects/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'edit',
        method: 'PUT',
        url: config.localhost.concat('/subjects/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'create',
        method: 'POST',
        url: config.localhost.concat('/subjects/'),
        requireAuth: true
    },
    {
        serviceName: 'delete',
        method: 'DELETE',
        url: config.localhost.concat('/subjects/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'subscribe',
        method: 'POST',
        url: config.localhost.concat('/subjects/[objectId]/student-request/'),
        requireAuth: true
    },
    {
        serviceName: 'enableStudents',
        method: 'POST',
        url: config.localhost.concat('/subjects/[objectId]/enable-students/'),
        requireAuth: true
    }
]);

export default subjectsService;
