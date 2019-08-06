import ServiceFactory from 'lib-core/services/service-factory';
import config from 'app/config';

let imagesService = new ServiceFactory();

imagesService.setServices([
    {
        serviceName: 'getAll',
        method: 'GET',
        url: config.localhost.concat('/images/'),
        requireAuth: true,
    },
    {
        serviceName: 'getOne',
        method: 'GET',
        url: config.localhost.concat('/images/[objectId]'),
        requireAuth: true,
    },
    {
        serviceName: 'create',
        method: 'POST',
        url: config.localhost.concat('/images/'),
        requireAuth: true,
        removeContentType: true,
    },
    {
        serviceName: 'edit',
        method: 'PUT',
        url: config.localhost.concat('/images/[objectId]/'),
        requireAuth: true,
        removeContentType: true,
    },
    {
        serviceName: 'delete',
        method: 'DELETE',
        url: config.localhost.concat('/images/[objectId]'),
        requireAuth: true,
    }
]);

export default imagesService;
