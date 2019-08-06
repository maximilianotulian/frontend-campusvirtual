import ServiceFactory from 'lib-core/services/service-factory';
import config from 'app/config';

let userService = new ServiceFactory();

userService.setServices([{
        serviceName: 'loginService',
        method: 'POST',
        url: config.localhost.concat('/users/auth/')
    },
    {
        serviceName: 'getAll',
        method: 'GET',
        url: config.localhost.concat('/users/'),
        requireAuth: true
    },
    {
        serviceName: 'getOne',
        method: 'GET',
        url: config.localhost.concat('/users/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'edit',
        method: 'PUT',
        url: config.localhost.concat('/users/[objectId]/'),
        requireAuth: true
    },
    {
        serviceName: 'registerStudent',
        method: 'POST',
        url: config.localhost.concat('/users/students'),
        requireAuth: false
    },
    {
        serviceName: 'registerTeacher',
        method: 'POST',
        url: config.localhost.concat('/users/teachers'),
        requireAuth: false
    }
]);

export default userService;
