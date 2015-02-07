'use strict';

var assert = require("assert")
var Calendars = require('../lib/calendars');

describe('[lib/calenders]', function() {

    describe('index of methods', function() {

        it('should contain list method', function(){
            var calendars = new Calendars();
            assert.equal(typeof(calendars.list), 'function');
        });

        it('should contain events method', function(){
            var calendars = new Calendars();
            assert.equal(typeof(calendars.events), 'function');
        });

        it('should contain convertListFormat method', function(){
            var calendars = new Calendars();
            assert.equal(typeof(calendars.convertListFormat), 'function');
        });

        it('should contain convertEventsFormat method', function(){
            var calendars = new Calendars();
            assert.equal(typeof(calendars.convertEventsFormat), 'function');
        });

    });

    describe('Calendars converter', function(){

        it('should convert calendars list to new format', function(){
            var calendars = new Calendars();
            var oldListFormat = {
                "kind": "calendar#calendarList",
                "etag": "\"1423248703252000\"",
                "nextSyncToken": "00001423248703252000",
                "items": [
                    {
                        "kind": "calendar#calendarListEntry",
                        "etag": "\"0\"",
                        "id": "extropia@gmail.com",
                        "summary": "Welcome to sunrise Unit-Tests",
                        "timeZone": "Asia/Jerusalem",
                        "colorId": "17",
                        "backgroundColor": "#9a9cff",
                        "foregroundColor": "#000000",
                        "selected": true,
                        "accessRole": "owner",
                        "defaultReminders": [
                            {
                                "method": "email",
                                "minutes": 10
                            },
                            {
                                "method": "popup",
                                "minutes": 30
                            }
                        ],
                        "notificationSettings": {
                            "notifications": [
                                {
                                    "type": "eventCreation",
                                    "method": "email"
                                },
                                {
                                    "type": "eventChange",
                                    "method": "email"
                                },
                                {
                                    "type": "eventCancellation",
                                    "method": "email"
                                },
                                {
                                    "type": "eventResponse",
                                    "method": "email"
                                }
                            ]
                        },
                        "primary": true
                    }
                ]
            };
            var newListFormat = calendars.convertListFormat(oldListFormat);

            assert.equal(JSON.stringify(newListFormat[0]), JSON.stringify({
                id: "extropia@gmail.com",
                title: "Welcome to sunrise Unit-Tests",
                color: "#9a9cff",
                writable: false,
                selected: true,
                timezone: "Asia/Jerusalem"
            }));
        });

        it('should convert calendar events to new format', function(){
            var calendars = new Calendars();
            var oldEventsFormat = {
                "kind": "calendar#events",
                "etag": "\"1423248703252000\"",
                "summary": "Unit-Tests Calendar",
                "updated": "2015-02-06T18:51:43.252Z",
                "timeZone": "Asia/Jerusalem",
                "accessRole": "owner",
                "defaultReminders": [
                    {
                        "method": "email",
                        "minutes": 10
                    },
                    {
                        "method": "popup",
                        "minutes": 30
                    }
                ],
                "nextSyncToken": "CKDMicv-zcMCEKDMicv-zcMCGAU=",
                "items": [
                    {
                        "kind": "calendar#event",
                        "etag": "\"2467653255478000\"",
                        "id": "013drbvct081lh79jb558q372g",
                        "status": "confirmed",
                        "htmlLink": "https://www.google.com/calendar/event?eid=MDEzZHJidmN0MDgxbGg3OWpiNTU4cTM3MmcgZXh0cm9waWFAbQ",
                        "created": "2009-02-05T09:36:53.000Z",
                        "updated": "2009-02-05T09:37:07.739Z",
                        "summary": "Welcome to sunrise Unit-Tests",
                        "creator": {
                            "email": "extropia@gmail.com",
                            "displayName": "itsik maman",
                            "self": true
                        },
                        "organizer": {
                            "email": "extropia@gmail.com",
                            "displayName": "itsik maman",
                            "self": true
                        },
                        "start": {
                            "dateTime": "2009-02-04T09:30:00+02:00"
                        },
                        "end": {
                            "dateTime": "2009-02-04T12:30:00+02:00"
                        },
                        "iCalUID": "013drbvct081lh79jb558q372g@google.com",
                        "sequence": 1,
                        "reminders": {
                            "useDefault": true
                        }
                    }
                ]
            };
            var newEventsFormat = calendars.convertEventsFormat(oldEventsFormat);

            assert.equal(JSON.stringify(newEventsFormat[0]), JSON.stringify({
                id: "013drbvct081lh79jb558q372g",
                status: "confirmed",
                title: "Welcome to sunrise Unit-Tests",
                start: {
                    dateTime: "2009-02-04T09:30:00+02:00",
                    timezone: "Asia/Jerusalem"
                },
                end: {
                    dateTime: "2009-02-04T12:30:00+02:00",
                    timezone: "Asia/Jerusalem"
                },
                location: null,
                attendees: [ ],
                organizer: {
                    name: "itsik maman",
                    emails: [
                        "extropia@gmail.com"
                    ],
                    self: true
                },
                editable: false,
                recurrence: null
            }));
        });

    });

});