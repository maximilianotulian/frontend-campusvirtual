import storage from 'lib-core/persistance/storage';

let storedAuthInformation = storage.get('authInformation');

export default {
    deleteUserErrors: {},
    editUserErrors: {},
    logInErrors: {},
    registeredErrors: {},
    selectedUser: {},
    user: storedAuthInformation,
    users: [],
    teachers: []
}
