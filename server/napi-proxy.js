'use strict';

var config = require('../config'),
    api = config.api,
    uriPrefix = '/3/open';

/**
 *  根据请求内容判断返回基本URI
 **/
function getBaseAPI (req) {
    switch (req.cookies.nation) {
        case 'china': return api.openAPI.base_china;break;
        case 'us': return api.openAPI.base_us;break;
        case 'india': return api.openAPI.base_india;break;
        case 'pp': return api.openAPI.base_pp;break;
        case 'aws': return api.openAPI.base_aws;break;
        case 'hk': return api.openAPI.base_hk;break;
    }
    return api.openAPI.base;
}

module.exports = {

    uriPrefix: uriPrefix,
    getBaseAPI: getBaseAPI
};

