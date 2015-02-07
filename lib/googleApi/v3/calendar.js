'use strict';

var util = require('util');

/**
 * Calender API
 * @param {object} api - instance of GoogleApi class
 * @constructor
 */
var CalendarApi = function(api) {

    this.calendarList = {

        /**
         * calendarList.list
         * @desc Return list of calendars for current user
         * @param {function} callback
         */
        list: function(callback) {
            api.createRequest('/calendar/v3/users/me/calendarList', callback);
        }

    };

    this.events = {

        /**
         * events.list
         * @desc Return events of specify calendar by calendar ID
         * @param {string} calendarID - google calendar ID
         * @param {function} callback
         */
        list: function(calendarID, callback) {
            api.createRequest(util.format('/calendar/v3/calendars/%s/events', calendarID), callback);
        }

    };

};

module.exports = CalendarApi;