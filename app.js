'use strict';

// express application
var express     = require('express');
var app         = express();
var port        = 9000;

// application modules
var config      = require('./config.json');
var GoogleOAuth = require('./lib/googleApi/oauth');
var Calendars   = require('./lib/calendars');

/**
 * Google Api OAuth2
 * @type {GoogleOAuth}
 */
var googleOAuth = new GoogleOAuth(config.google);

/**
 * GET /authenticate
 */
app.get('/authenticate', googleOAuth.authenticate);

/**
 * GET /authenticate/callback
 */
app.get('/authenticate/callback', function(req, res){
    googleOAuth.getAccessToken(req, res, function(err, accessToken) {
        res.send(err ? err : accessToken);
    });
});

/**
 * GET /calendars
 * @param {string} query.accessToken - google access token
 */
app.get('/calendars', function (req, res) {
    var calendars = new Calendars(req.query.accessToken);

    calendars.list(function (err, calendars) {
        res.send(err ? err : calendars);
    });
});

/**
 * GET /calendars/<calendarID>/events
 * @param {string} query.accessToken - google access token
 */
app.get('/calendars/:calendarID/events', function (req, res) {
    var calendars = new Calendars(req.query.accessToken);

    calendars.events(req.params.calendarID, function (err, calendars) {
        res.send(err ? err : calendars);
    });
});

app.listen(port);
