import _ from 'lodash';
const slice = Array.prototype.slice;

function get(obj, keys, defaultValue) {
    let value;

    keys = toArray(keys);
    if (typeof defaultValue === 'undefined') {
        defaultValue = null;
    }
    
    if (!keys.length) {
        return defaultValue || obj;
    }

    keys.every(function iterate(key, index) {
        try {
            if (!index) {
                value = obj[key];
            }
            else {
                value = value[key];
            }
        }
        catch (err) {
            value = null;
            return false;
        }
        return true;
    });

    if (typeof value === 'undefined' || value === null) {
        return defaultValue;
    }

    return _.isFunction(value) ? value : _.clone(value);
}

function toArray(value) {
    if (!Array.isArray(value)) {
        if (typeof value === 'undefined') {
            value = [];
        } else {
            value = [value];
        }
    }

    return value;
}

function extend(target) {
    _.each(slice.call(arguments, 1), function eachSources(source) {
        if (source) {
            _.each(source, function eachSource(value, key) {
                if (isObject(value) && isObject(target[key])) {
                    return (target[key] = extend(_.clone(target[key]), value));
                }
                target[key] = value;
            });
        }
    });
    return target;
}

function isObject(obj) {
    return _.isObject(obj) && !_.isArray(obj);
}

module.exports = {
    get: get,
    extend: extend,
    toArray: toArray
};