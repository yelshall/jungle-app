const { assert } = require('chai');
const mongoose = require('mongoose');
const student = require('../../Objects/student');
const event = require('../../Objects/event');
const host = require('../../Objects/host');
const tag = require('../../Objects/tag');
// require('dotenv').config({path: '../../config/.env'});

mongoose.connect(process.env.DATABASE_ACCESS)

describe('Host Tests', () => {
    it('hostSignup - Host is stored in the database and password is not returned.', (done) => {
        let newHost = {
            email: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        host.hostSignup(newHost, (err, res) => {
            if(err) {done(err);}
            else {
                assert.equal(res.password, null, 'Make sure that the password is not returned.');
                host.deleteHost(res._id, (err, del) => {
                    if(err) {done(err)}
                    else {
                        done();
                    }
                });
            }
        });
    });

    it('hostLogin - Not implemented.', (done) => {
        done();
    });

    it('deleteHost - Delete host from database.', (done) => {
        let newHost = {
            email: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        let newStudent = {
            username: "test7",
            email: "test@mail.net",
            password: "testPassword",
            fullName: {
                firstName: "First",
                lastName: "Last"
            },
            birthDate: new Date(2002, 6, 11),
            gender: "Male"
        };

        let newEvent = {
            eventName: "eventTest7",
            dateTime: new Date(),
            endDateTime: new Date(),
            location: "123 Drive, etc.",
            description: "descriptionTest"
        };

        host.hostSignup(newHost, (err, res) => {
            if(err) {done(err)}
            else {
                student.studentSignup(newStudent, (err, res2) => {
                    if(err) {done(err)}
                    else {
                        host.createEventHost(res._id, newEvent, (err, res3) => {
                            if(err) {done(err)}
                            else {
                                student.followHost(res2._id, res._id, (err, res4) => {
                                    if(err) {done(err)}
                                    else {
                                        host.deleteHost(res._id, (err, del) => {
                                            if(err) {done(err)}
                                            else {
                                                event.getEvent(res3._id, (err, res) => {
                                                    if(err) {done(err)}
                                                    else {
                                                        assert.equal(res, null, "Make sure the host's event are deleted.");
                                                        student.retreiveStudentInfo(res2._id, (err, res) => {
                                                            if(err) done(err);
                                                            else {
                                                                assert.equal(res.following.length, 0, 'Make sure to remove the host from any students.');
                                                                student.deleteStudent(res2._id, (err, res) => {
                                                                    if(err) {done(err)}
                                                                    else {
                                                                        done();
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        });
                    }
                });
            }
        })
    });

    it("retreiveHostInfo -  Get host info from database.", (done) => {
        let newHost = {
            email: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        host.hostSignup(newHost, (err, res) => {
            if(err) {done(err)}
            else {
                host.retreiveHostInfo(res._id, (err, res2) => {
                    if(err) {done(err)}
                    else {
                        assert.equal(res._id.equals(res2._id), true, "Make sure that ids match.")
                        host.deleteHost(res._id, (err, del) => {
                            if(err) {done(err)}
                            else {
                                done();
                            }
                        });
                    }
                });
            }
        });
    });

    it("createEventHost - Create an event for a host.", (done) => {
        let newHost = {
            email: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        let newEvent = {
            eventName: "eventTest7",
            dateTime: new Date(),
            endDateTime: new Date(),
            location: "123 Drive, etc.",
            description: "descriptionTest"
        };

        host.hostSignup(newHost, (err, res) => {
            if(err) {done(err)}
            else {
                host.createEventHost(res._id, newEvent, (err, res2) => {
                    if(err) {
                        done(err);
                        return;
                    }
                    assert.equal(res2.eventHost.equals(res._id), true, 'Make sure that the event host is the same as the host.');
                    host.retreiveHostInfo(res._id, (err, res3) => {
                        if(err) {
                            done(err);
                            return;
                        }
                        assert.equal(res3.events[0]._id.equals(res2._id), true, "Make sure that the event stored is the same as the event created.");
                        host.deleteHost(res._id, (err, res4) => {
                            if(err) {
                                done(err);
                                return;
                            }
                            done();
                        });
                    });
                });
            }
        });
    });

    //Implement update event tests later

    it("deleteEventHost - Delete an event from a host.", (done) => {
        let newHost = {
            email: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        let newEvent = {
            eventName: "eventTest7",
            dateTime: new Date(),
            endDateTime: new Date(),
            location: "123 Drive, etc.",
            description: "descriptionTest"
        };

        host.hostSignup(newHost, (err, res) => {
            if(err) {done(err)}
            else {
                host.createEventHost(res._id, newEvent, (err, res2) => {
                    if(err) {
                        done(err);
                        return;
                    }
                    assert.equal(res2.eventHost.equals(res._id), true, 'Make sure that the event host is the same as the host.');
                    
                    host.deleteEventHost(res._id, res2._id, (err, del) => {
                        if(err) {
                            done(err);
                            return;
                        }
                        
                        host.retreiveHostInfo(res._id, (err, res3) => {
                            if(err) {
                                done(err);
                                return;
                            }
                            assert.equal(res3.events.length, 0, "Make sure that the event is deleted from the host.");
                            event.getEvent(res2._id, (err, res5) => {
                                if(err){
                                    done(err);
                                    return;
                                }
                                assert.equal(res5, null, "Make sure that the event is deleted from the database.");
                                host.deleteHost(res._id, (err, res4) => {
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
            }
        });
    });

    it("addFollower - Add a follower to a host.", (done) => {
        let newHost = {
            email: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        let newStudent = {
            username: "test4",
            email: "test@mail.net",
            password: "testPassword",
            fullName: {
                firstName: "First",
                lastName: "Last"
            },
            birthDate: new Date(2002, 6, 11),
            gender: "Male"
        };

        host.hostSignup(newHost, (err, res) => {
            if(err) {
                done(err);
                return;
            }
            student.studentSignup(newStudent, (err, res2) => {
                if(err) {
                    done(err);
                    return;
                }

                host.addFollower(res._id, res2._id, (err, res3) => {
                    if(err) {
                        done(err);
                        return;
                    }

                    host.retreiveHostInfo(res._id, (err, res4) => {
                        if(err) {
                            done(err);
                            return;
                        }

                        assert.equal(res4.followers[0].equals(res2._id), true, "Make sure that the follower is the same as the actual student.");
                        host.deleteHost(res._id, (err, res5) => {
                            if(err) {
                                done(err);
                                return;
                            }

                            student.deleteStudent(res2._id, (err, res6) => {
                                if(err){
                                    done(err);
                                    return;
                                }

                                done();
                            })
                        });
                    });
                });
            });
        });
    });

    it("removeFollower - Remove a follower from a host.", (done) => {
        let newHost = {
            email: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        let newStudent = {
            username: "test4",
            email: "test@mail.net",
            password: "testPassword",
            fullName: {
                firstName: "First",
                lastName: "Last"
            },
            birthDate: new Date(2002, 6, 11),
            gender: "Male"
        };

        host.hostSignup(newHost, (err, res) => {
            if(err) {
                done(err);
                return;
            }
            student.studentSignup(newStudent, (err, res2) => {
                if(err) {
                    done(err);
                    return;
                }

                host.addFollower(res._id, res2._id, (err, res3) => {
                    if(err) {
                        done(err);
                        return;
                    }
                    host.removeFollower(res._id, res2._id, (err, res6) => {
                        if(err) {
                            done(err);
                            return;
                        }
                        host.retreiveHostInfo(res._id, (err, res4) => {
                            if(err) {
                                done(err);
                                return;
                            }
    
                            assert.equal(res4.followers.length, 0, "Make sure that the follower is removed from the host.");
                            host.deleteHost(res._id, (err, res5) => {
                                if(err) {
                                    done(err);
                                    return;
                                }
                                student.deleteStudent(res2._id, (err, res7) => {
                                    if(err) {
                                        done(err);
                                        return;
                                    }

                                    done();
                                })
                            });
                        });
                    });
                });
            });
        });
    });

    it("addTag - Add a tag to a host.", (done) => {
        let newHost = {
            email: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        let newTag = 'testTag';

        host.hostSignup(newHost, (err, res) => {
            if(err) {
                done(err);
                return;
            }
            tag.createTag(newTag, (err, res2) => {
                if(err) {
                    done(err);
                    return;
                }

                host.addTag(res._id, res2._id, (err, res3) => {
                    if(err) {
                        done(err);
                        return;
                    }

                    host.retreiveHostInfo(res._id, (err, res4) => {
                        if(err) {
                            done(err);
                            return;
                        }

                        assert.equal(res4.tags[0].equals(res2._id), true, "Make sure that the tag is the same as the actual tag.");
                        host.deleteHost(res._id, (err, res5) => {
                            if(err) {
                                done(err);
                                return;
                            }
                            tag.deleteTag(res2._id, (err, del) => {
                                if(err) {
                                    done(err);
                                    return;
                                }
                                done();
                            })
                        });
                    });
                });
            });
        });
    });

    it("removeTag - Remove a tag from a host.", (done) => {
        let newHost = {
            email: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        let newTag = 'testTag';

        host.hostSignup(newHost, (err, res) => {
            if(err) {
                done(err);
                return;
            }
            tag.createTag(newTag, (err, res2) => {
                if(err) {
                    done(err);
                    return;
                }

                host.addTag(res._id, res2._id, (err, res3) => {
                    if(err) {
                        done(err);
                        return;
                    }

                    host.removeTag(res._id, res2._id, (err, rem) => {
                        if(err) {
                            done(err);
                            return;
                        }

                        host.retreiveHostInfo(res._id, (err, res4) => {
                            if(err) {
                                done(err);
                                return;
                            }
    
                            assert.equal(res4.tags.length, 0, "Make sure that the tag is removed from the host.");
                            host.deleteHost(res._id, (err, res5) => {
                                if(err) {
                                    done(err);
                                    return;
                                }
                                tag.deleteTag(res2._id, (err, del) => {
                                    if(err) {
                                        done(err);
                                        return;
                                    }
                                    done();
                                })
                            });
                        });
                    })
                });
            });
        });
    });
});