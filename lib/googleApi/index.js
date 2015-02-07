'use strict';

var request = require('request');
var fs = require('fs');
var path = require('path');

var GoogleApi = function (params) {

    // params must be object
    params = typeof(params) === 'object' ? params : {};

    // Set default API version if not exists
    if (!params.hasOwnProperty('version')) {
        params.version = 'v3';
    }

    // Make sure params.accessToken not undefined
    if (!params.hasOwnProperty('accessToken')) {
        params.accessToken = null;
    }

    /**
     * Create API request
     * @param {string} apiURI - relative url of google restful API
     * @param {function} callback
     */
    this.createRequest = function (apiURI, callback) {
        request.get({
            url: 'https://www.googleapis.com/' + apiURI,
            json: true
        }, function (err, httpResponse, body) {
            if (body.hasOwnProperty('error')) {
                callback(body.error);
            }
            else {
                callback(null, body);
            }
        }).auth(null, null, true, params.accessToken);
    };

    /**
     * Load API Modules
     * @desc load all the available modules under specify version of google API
     * @param {object} api - this instance of GoogleApi class
     * @returns {object} - list of supported google API classes pointers
     */
    function loadApiModules(api) {
        var apiMap = {};

        // resolve the base path of google API version folder
        var basePath = path.resolve('lib/googleApi', params.version);

        // read the version folder and get list of all the modules inside
        var files = fs.readdirSync(basePath);

        for (var i in files) {
            // apiName - remove '.js' from the file name
            var apiName = files[i].split('.').shift();

            // locate and require the current module
            var apiModule = require(path.resolve(basePath, apiName));

            // create new instance of API module
            apiMap[apiName] = new apiModule(api);
        }

        return apiMap;
    }

    return loadApiModules(this);
};

module.exports = GoogleApi;