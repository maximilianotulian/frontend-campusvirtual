import _ from 'lodash';
import utils from '../../shared/utils';
import MODULES from './modules';
import VERSION from './version';

function checkValue(value) {
    return value === null || _.isUndefined(value);
}

function isProduction() {
    return PRODUCTION;
}

module.exports = function () {
    let config = './default' + (isProduction() ? '' : '-development');
    let CONFIG = _.extend(require(config), {
        modules: MODULES,
        version: VERSION
    });

    function get(keys, defaultValue) {
        let value = utils.get(CONFIG, keys);

        if (checkValue(value)) {
            value = defaultValue;
            keys = _.clone(utils.toArray(keys));

            if (keys.length) {
                value = utils.get(CONFIG, keys.splice(keys.length - 1, 1, 'default'), defaultValue);
            }
        }
        return value;
    }

    function getForModules(keys, defaultValue) {
        return get(['modules'].concat(keys), defaultValue);
    }

    return {
        get,
        getForModules
    }
}();