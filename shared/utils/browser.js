import _ from 'lodash';
import object from './object';
const isServer = (typeof window === 'undefined');
const browsers = [{
    keys: 'userAgent',
    subString: 'Trident',
    identity: 'Explorer',
    versionSearch: 'rv:'
},
{
    keys: 'userAgent',
    subString: 'Edge',
    identity: 'Edge',
    versionSearch: 'Edge/'
},
{
    keys: 'userAgent',
    subString: 'Chrome',
    identity: 'Chrome'
},
{
    keys: 'userAgent',
    subString: 'OmniWeb',
    versionSearch: 'OmniWeb/',
    identity: 'OmniWeb'
},
{
    keys: ['vendor', 'userAgent'],
    subString: 'Apple',
    identity: 'Safari',
    versionSearch: 'Version'
},
{
    keys: 'userAgent',
    props: 'opera',
    subString: 'Opera',
    identity: 'Opera',
    versionSearch: 'Version'
},
{
    keys: ['vendor', 'userAgent'],
    subString: 'iCab',
    identity: 'iCab'
},
{
    keys: ['vendor', 'userAgent'],
    subString: 'KDE',
    identity: 'Konqueror'
},
{
    keys: 'userAgent',
    subString: 'Firefox',
    identity: 'Firefox'
},
{
    keys: ['vendor', 'userAgent'],
    subString: 'Camino',
    identity: 'Camino'
},
{
    keys: 'userAgent',
    subString: 'Netscape',
    identity: 'Netscape'
},
{
    keys: 'userAgent',
    subString: 'MSIE',
    identity: 'Explorer',
    versionSearch: 'MSIE'
},
{
    keys: 'userAgent',
    subString: 'Gecko',
    identity: 'Mozilla',
    versionSearch: 'rv'
},
{
    keys: 'userAgent',
    subString: 'Mozilla',
    identity: 'Netscape',
    versionSearch: 'Mozilla'
}];

function getCtx(app) {
    if (isServer) {
        return app;
    }
    return window;
}

function _get(key, ctx) {
    if (isServer) {
        if (key === 'userAgent' && ctx.req) {
            return ctx.req.header('user-agent') || 'Mozilla/5.0 (compatible; OlxArwen/1.0; +http://www.olx.com)';
        }
        return ctx.session.get(key);
    }
    return object.get(ctx, key.split('.'));
}

function transform(key) {
    if (isServer) {
        return key;
    }
    return key === 'userAgent' || key === 'vendor' ? ('navigator.' + key) : key;
}

function get(keys, ctx, defaultValue) {
    var value = defaultValue;

    if (_.isString(keys)) {
        keys = [keys];
    }
    _.each(keys, function each(k) {
        value = _get(transform(k), ctx) || value;
    });
    return value;
}

function searchIdentity(ctx) {
    var identity = {};
    var value;

    identity.browser = _.find(browsers, function each(browser) {
        identity.version = browser.versionSearch || browser.identity;

        value = get(browser.props, ctx);
        if (value) {
            identity.name = browser.identity;
            return browser;
        }

        value = get(browser.keys, ctx);
        if (value) {
            if (value.indexOf(browser.subString) != -1) {
                identity.name = browser.identity;
                return browser;
            }
        }
        return false;
    });
    return identity;
}

function searchVersion(browser, version) {
    var index = browser.indexOf(version);
    var versionIndex;

    if (index == -1) {
        return;
    }
    versionIndex = index + version.length + 1;
    return parseFloat(browser.substring(versionIndex));
}

module.exports = function browserDetect(app) {
    var ctx = getCtx(app);
    var identity = searchIdentity(ctx);
    var browser = {};

    browser.browser = identity.name;
    browser.version = searchVersion(get('userAgent', ctx, ''), identity.version) || searchVersion(get('appVersion', ctx, ''), identity.version) || '';
    browser.name = browser.browser + browser.version;

    return browser;
};