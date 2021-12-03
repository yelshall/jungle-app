const { assert } = require('chai');
const mongoose = require('mongoose');
const tag = require('../../Objects/tag');
const event = require('../../Objects/event');
const host = require('../../Objects/host');
// require('dotenv').config({path: '../../config/.env'});

mongoose.connect(process.env.DATABASE_ACCESS)

describe('Tag Tests', () => {
    it('createTag - Create a new tag.', (done) => {
        tag.createTag('testTag', (err, res) => {
            if(err) {
                done(err);
                return;
            }

            tag.getTag(res._id, (err, res2) => {
                if(err) {
                    done(err);
                    return;
                }

                assert.equal(res2._id.equals(res._id), true, 'Make sure that the stored tag is the same as the actual one.');
                tag.deleteTag(res._id, (err, del) => {
                    if(err) {
                        done(err);
                        return;
                    }
                    done();
                });
            });
        });
    });

    it('getTag - Get tag stored in database.', (done) => {
        tag.createTag('testTag', (err, res) => {
            if(err) {
                done(err);
                return;
            }

            tag.getTag(res._id, (err, res2) => {
                if(err) {
                    done(err);
                    return;
                }

                assert.equal(res2._id.equals(res._id), true, 'Make sure that the stored tag is the same as the actual one.');
                tag.deleteTag(res._id, (err, del) => {
                    if(err) {
                        done(err);
                        return;
                    }
                    done();
                });
            });
        });
    });

    it('deleteTag - Delete a tag stored in the database.', (done) => {
        tag.createTag('testTag', (err, res) => {
            if(err) {
                done(err);
                return;
            }
            hostEventTag(res._id, (hid, eid) => {
                tag.deleteTag(res._id, (err, del) => {
                    if(err) {
                        done(err);
                        return;
                    }
                    host.retreiveHostInfo(hid, (err, res2) => {
                        if(err) {
                            done(err);
                            return;
                        }
                        assert.equal(res2.tags.length, 0, 'Make sure the tag is removed from the host.');
                        event.getEvent(eid, (err, res3) => {
                            if(err) {
                                done(err);
                                return;
                            }
                            assert.equal(res3.tags.length, 0, 'Make sure the tag is removed from the event.');
                            host.deleteHost(hid, (err, del) => {
                                if(err) {
                                    done(err);
                                    return;
                                }
                                event.deleteEvent(eid, (err, del) => {
                                    if(err) {
                                        done(err);
                                        return;
                                    }
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        var hostEventTag = (tid, callback) => {
            let newHost = {
                email: "test@mail.net3",
                password: "testPassword",
                hostName: "hostNameTest",
                description: "descriptionTest",
                phoneNumber: "+1 (999) 1234 567",
                website: "www.host.com",
                tags: [tid]
            };

            let newEvent = {
                eventName: "eventTest3",
                dateTime: new Date(),
                endDateTime: new Date(),
                location: "123 Drive, etc.",
                description: "descriptionTest",
                tags: [tid]
            };

            host.hostSignup(newHost, (err, res) => {
                if(err) {
                    done(err);
                    return;
                }
                event.createEvent(newEvent, (err, res3) => {
                    if(err) {
                        done(err);
                        return;
                    }
                    callback(res._id, res3._id);
                });
            });
        };
    });

    it("addEvent - Add an event to a tag.", (done) => {
        let newEvent = {
            eventName: "eventTest3",
            dateTime: new Date(),
            endDateTime: new Date(),
            location: "123 Drive, etc.",
            description: "descriptionTest",
            tags: []
        };

        tag.createTag('testTag', (err, res) => {
            if(err) {
                done(err);
                return;
            }
            newEvent.tags.push(res._id);
            event.createEvent(newEvent, (err, res2) => { //addEvent will be called in hostSignup for each tag chosen
                if(err) {
                    done(err);
                    return;
                }

                assert.equal(res2.tags[0].equals(res._id), true, 'Make sure the tag stored in the event is the same as the actual tag.');
                tag.deleteTag(res._id, (err, del) => {
                    if(err){
                        done(err);
                        return;
                    }
                    event.deleteEvent(res2._id, (err, del) => {
                        if(err) {
                            done(err);
                            return;
                        }
                        done();
                    });
                })
            });
        });
    });
    
    it("addHost - Add a host to a tag.", (done) => {
        let newHost = {
            email: "test@mail.net3",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        tag.createTag('testTag', (err, res) => {
            if(err) {
                done(err);
                return;
            }
            newHost.tags.push(res._id);
            host.hostSignup(newHost, (err, res2) => { //addEvent will be called in hostSignup for each tag chosen
                if(err) {
                    done(err);
                    return;
                }

                assert.equal(res2.tags[0].equals(res._id), true, 'Make sure the tag stored in the event is the same as the actual tag.');
                tag.deleteTag(res._id, (err, del) => {
                    if(err){
                        done(err);
                        return;
                    }
                    host.deleteHost(res2._id, (err, del) => {
                        if(err) {
                            done(err);
                            return;
                        }
                        done();
                    });
                })
            });
        });
    });

    it("removeEvent - Remove an event from a tag.", (done) => {
        let newEvent = {
            eventName: "eventTest3",
            dateTime: new Date(),
            endDateTime: new Date(),
            location: "123 Drive, etc.",
            description: "descriptionTest",
            tags: []
        };

        tag.createTag('testTag', (err, res) => {
            if(err) {
                done(err);
                return;
            }
            newEvent.tags.push(res._id);
            event.createEvent(newEvent, (err, res2) => {
                if(err) {
                    done(err);
                    return;
                }
                event.deleteEvent(res2._id, (err, del) => {
                    if(err) {
                        done(err);
                        return;
                    }
                    tag.getTag(res._id, (err, res) => {
                        if(err) {
                            done(err);
                            return;
                        }

                        assert.equal(res.events.length, 0, 'Make sure that the event is removed.')
                        tag.deleteTag(res._id, (err, del) => {
                            if(err) {
                                done(err);
                                return;
                            }
                            done();
                        });
                    });
                });
            });
        });
    });
    
    it("removeHost - Remove a host from a tag.", (done) => {
        let newHost = {
            email: "test@mail.net3",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        tag.createTag('testTag', (err, res) => {
            if(err) {
                done(err);
                return;
            }
            newHost.tags.push(res._id);
            host.hostSignup(newHost, (err, res2) => {
                if(err) {
                    done(err);
                    return;
                }
                host.deleteHost(res2._id, (err, del) => {
                    if(err) {
                        done(err);
                        return;
                    }
                    tag.getTag(res._id, (err, res) => {
                        if(err) {
                            done(err);
                            return;
                        }

                        assert.equal(res.hosts.length, 0, 'Make sure that the host is removed.')
                        tag.deleteTag(res._id, (err, del) => {
                            if(err) {
                                done(err);
                                return;
                            }
                            done();
                        });
                    });
                });
            });
        });
    });
});