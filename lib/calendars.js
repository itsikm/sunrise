'use strict';

var GoogleApi = require('./googleApi');

/**
 * Calender Module
 * @param {string} accessToken - Google access token
 * @constructor
 */
var Calendars = function (accessToken) {

    var self = this;

    /**
     * Create Google Api object with Authentication
     * @type {GoogleApi}
     */
    var google = new GoogleApi({
        version: 'v3',
        accessToken: accessToken
    });

    /**
     * Get list of calendars for the current user
     * @param {function} callback - callback function
     */
    this.list = function (callback) {
        google.calendar.calendarList.list(function (err, calendars) {
            if (err) callback(err);
            else callback(null, self.convertListFormat(calendars));
        });
    };

    /**
     * Get calendar events by ID
     * @param {string} calendarID - google calender ID
     * @param {function} callback
     */
    this.events = function (calendarID, callback) {
        google.calendar.events.list(calendarID, function (err, events) {
            if (err) callback(err);
            else callback(null, self.convertEventsFormat(events));
        });
    };

    /**
     * Convert list of calendars to a new format
     * @param {object} calendars - google API calendars list
     * @returns {Array} - list of calendars with new format
     */
    this.convertListFormat = function (calendars) {
        var calenders = [];

        for (var i in calendars.items) {
            var calender = calendars.items[i];
            calenders.push({
                id: calender.id,
                title: calender.summary,
                color: calender.backgroundColor,
                writable: calender.accessRole === 'writer' ? true : false,
                selected: calender.selected,
                timezone: calender.timeZone
            });
        }

        return calenders;
    };

    /**
     * Convert events to a new format
     * @param {object} events - google API specify calendar events
     * @returns {Array} - list of specify calendar events with new format
     */
    this.convertEventsFormat = function (events) {
        var newEventsFormat = [];

        for (var i in events.items) {
            var event = events.items[i];

            // Convert google event to new format
            var newEvent = {
                id: event.id,
                status: event.status,
                title: event.summary,
                start: {
                    dateTime: event.start.dateTime,
                    timezone: events.timeZone
                },
                end: {
                    dateTime: event.end.dateTime,
                    timezone: events.timeZone
                },
                location: event.location || null,
                attendees: [],
                organizer: {
                    name: event.organizer.displayName || event.organizer.email,
                    emails: [
                        event.organizer.email
                    ],
                    self: event.organizer.self || false
                },
                editable: events.accessRole === 'writer' ? true : false,
                recurrence: event.recurrence || null
            };

            // Convert google event attendees to new format
            if (event.hasOwnProperty('attendees')) {
                for (var i in event.attendees) {
                    var attende = event.attendees[i];

                    newEvent.attendees.push({
                        name: attende.displayName || attende.email,
                        emails: [
                            attende.email
                        ],
                        self: attende.self || false,
                        rsvpStatus: attende.responseStatus
                    });
                }
            }

            // Add new formatted event item to a list
            newEventsFormat.push(newEvent);
        }

        // Return list of events item converted to new format
        return newEventsFormat;
    };

};

module.exports = Calendars;