import ServiceFactory from 'lib-core/services/service-factory';
import config from 'app/config';

let newsService = new ServiceFactory();

newsService.setServices([
    {
        serviceName: 'getAll',
        method: 'GET',
        url: config.localhost.concat('/news/'),
        requireAuth: true
    },
    {
        serviceName: 'getOne',
        method: 'GET',
        url: config.localhost.concat('/news/[objectId]'),
        requireAuth: true
    },
    {
        serviceName: 'create',
        method: 'POST',
        url: config.localhost.concat('/news/'),
        requireAuth: true
    },
    {
        serviceName: 'edit',
        method: 'PUT',
        url: config.localhost.concat('/news/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'delete',
        method: 'DELETE',
        url: config.localhost.concat('/news/[objectId]'),
        requireAuth: true
    }
]);

export default newsService;
