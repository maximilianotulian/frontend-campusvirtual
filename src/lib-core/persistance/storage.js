import _ from 'lodash';
import moment from 'moment';

const storage = window.localStorage;

export default {

    save (name, data, expires = 0) {
        let item = JSON.stringify({
            data: data,
            expires: expires
        });

        storage.setItem(name, item);
    },

    get (name) {
        let data;
        let item = JSON.parse(storage.getItem(name));
        let now = new Date();

        if (item) {
            if (item.expires === 0 || moment(item.expires).isAfter(now)) {
                data = item.data
            } else {
                storage.removeItem(name);
            }
        }

        return data;
    },

    clearStorage () {
        storage.clear();
    },

    delete (name) {
        storage.removeItem(name);
    }
}
