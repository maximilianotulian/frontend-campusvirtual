import config from 'config';

export default {
    localhost: config.get('host', 'http://localhost:8000')
};