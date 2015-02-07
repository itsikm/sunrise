'use strict';

var OAuth2 = require('oauth').OAuth2;

var GoogleOAuth = function (config) {

    /**
     * Initialize OAuth2 Object
     * @type {OAuth2}
     */
    var oauth2 = new OAuth2(
        config.clientID,
        config.clientSecret,
        'https://accounts.google.com/',
        'o/oauth2/auth',
        'o/oauth2/token',
        null
    );

    /**
     * Authenticate
     * @param {object} req - express request object
     * @param {object} res - express respond object
     * @redirect to google login page
     */
    this.authenticate = function (req, res) {
        var authURL = oauth2.getAuthorizeUrl({
            response_type: 'code',
            scope: config.scope,
            redirect_uri: config.callbackURL
        });
        res.redirect(authURL);
    };

    /**
     * Get Google Access Token
     * @param {object} req - express request object
     * @param {object} res - express respond object
     * @param {function} callback
     */
    this.getAccessToken = function (req, res, callback) {
        oauth2.getOAuthAccessToken(
            req.query.code,
            {
                client_id: config.clientID,
                client_secret: config.clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: config.callbackURL
            },
            function (e, access_token, refresh_token, results) {
                if (e) callback(e)
                else if (results.error) callback(results.error);
                else callback(null, access_token, refresh_token);
            });
    };

};

module.exports = GoogleOAuth;