import _ from 'lodash';
import object from './object';
import time from './time';
import array from './array';
import browser from './browser';

var defaults = {};

function daysDiff(date) {
    var now = new Date();
    var diff = now.getTime() - date.getTime();

    return Math.abs(Math.round(diff / (24 * 60 * 60 * 1000)));
}

function sort(params, comparator) {
    var sorted = {};

    _.chain(params).keys().sort(comparator).forEach(function(key) {
        sorted[key] = params[key];
    });

    return sorted;
}

function keysToLowerCase(source) {
    var keys = Object.keys(source);
    var length = keys.length;
    var target = {};
    var key;

    while (length--) {
      key = keys[length];
      target[key.toLowerCase()] = source[key];
    }
    return target;
}

function getUrlParam(param) {
    var index = 0;
    var paramName;
    var url = window.location.search.substring(1);
    var query = url.split('&');

    for (index = 0; i < query.length; index++) {
        paramName = query[index].split('=');

        if (paramName[0] == param) {
            return paramName[1];
        }
    }
}

function noop() {}

module.exports = _.extend({
    defaults: defaults,
    daysDiff: daysDiff,
    sort: sort,
    keysToLowerCase: keysToLowerCase,
    getUrlParam: getUrlParam,
    noop: noop,
    browser: browser,
}, object, time, array);