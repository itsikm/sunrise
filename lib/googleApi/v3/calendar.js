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
         * @return {object}
         */
        list: function(callback) {
            api.createRequest('/calendar/v3/users/me/calendarList', callback);
        }

    };

    this.events = {

        /**
         * events.list
         * @desc Return events of specify calendar by calendar ID
         * @param calendarID
         * @param callback
         */
        list: function(calendarID, callback) {
            api.createRequest(util.format('/calendar/v3/calendars/%s/events', calendarID), callback);
        }

    };

};

module.exports = CalendarApi;