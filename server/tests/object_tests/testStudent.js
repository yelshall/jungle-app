const { assert } = require('chai');
const mongoose = require('mongoose');
const student = require('../../Objects/student');
const event = require('../../Objects/event');
const host = require('../../Objects/host');
require('dotenv').config({path: '../../config/.env'});

mongoose.connect(process.env.DATABASE_ACCESS)

describe('Student Tests', () => {
    it(`studentSignup - Student is stored in the database and password is not returned.`, (done) => {
        let newStudent = {
            username: "test1",
            email: "test@mail.net",
            password: "testPassword",
            fullName: {
                firstName: "First",
                lastName: "Last"
            },
            birthDate: new Date(2002, 6, 11),
            gender: "Male"
        };

        student.studentSignup(newStudent, (err, data) => {
            //Might also have to make sure
            //that it returns a webtoken
            if (err) {done(err);}
            else {
                assert.equal(data.password, null, 'Make sure that the password is not returned.');
                student.deleteStudent(data._id, (err, del) => {
                    if(err) {done(err);}
                    else {
                        done();
                    }
                });
            } 
        });
    });

    it("studentLogin - Not implemented.", (done) => {
        //Implement later
        //But ig make sure that it returns a webtoken
        done();
    });

    it("retreiveStudentInfo - Get student info from database.", (done) => {
        let newStudent = {
            username: "test2",
            email: "test@mail.net",
            password: "testPassword",
            fullName: {
                firstName: "First",
                lastName: "Last"
            },
            birthDate: new Date(2002, 6, 11),
            gender: "Male"
        };
        
        student.studentSignup(newStudent, (err, res) => {
            if(err) {done(err);}
            else {
                student.retreiveStudentInfo(res._id, (err, res2) => {
                    if(err) {done(err);}
                    else {
                        assert.equal(res._id.equals(res2._id), true, "Make sure that the ids match.");
                        student.deleteStudent(res._id, (err, del) => {
                            if(err) {done(err);}
                            else {
                                done();
                            }
                        });
                    }
                });
            }
        });
    });

    it("deleteStudent - Delete student from database.", (done) => {
        let newStudent = {
            username: "test3",
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
            eventName: "eventTest3",
            dateTime: new Date(),
            endDateTime: new Date(),
            location: "123 Drive, etc.",
            description: "descriptionTest"
        };

        let newHost = {
            email: "test@mail.net3",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        event.createEvent(newEvent, (err, res) => {
            if(err) {done(err);}
            else {
                host.hostSignup(newHost, (err, res2) => {
                    if(err) {done(err);}
                    else{
                        student.studentSignup(newStudent, (err, res3) => {
                            if (err) done(err);
                            else {
                                student.followHost(res3._id, res2._id, (err, res4) => {
                                    if(err) {done(err);}
                                    else {
                                        student.addInterestedEvent(res3._id, res._id, (err, res5) => {
                                            if(err) {done(err);}
                                            else {
                                                student.deleteStudent(res3._id, (err, res6) => {
                                                    host.retreiveHostInfo(res2._id, (err, res7) => {
                                                        if(err) {done(err);}
                                                        else {
                                                            assert.equal(res7.followers.length, 0, "Make sure that the student has been removed from host followers.");
                                                            event.getEvent(res._id, (err, res8) => {
                                                                if(err) {done(err);}
                                                                else {
                                                                    assert.equal(res8.interestedStudents.length, 0, "Make sure that the student has been removed from event interestedStudents.");
                                                                    host.deleteHost(res2._id, (err, del) => {
                                                                        if(err) {done(err);}
                                                                        else {
                                                                            event.deleteEvent(res._id, (err, del) => {
                                                                                if(err) {done(err);}
                                                                                else {
                                                                                    done();
                                                                                }
                                                                            })
                                                                        }
                                                                    });
                                                                }
                                                            })
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
    
    it("addInterestedEvent - Add an event to the interestedEvents field in the student.", (done) => {
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

        let newEvent = {
            eventName: "eventTest4",
            dateTime: new Date(),
            endDateTime: new Date(),
            location: "123 Drive, etc.",
            description: "descriptionTest"
        };

        event.createEvent(newEvent, (err, res) => {
            if(err) done(err);
            else {
                student.studentSignup(newStudent, (err, res2) => {
                    if(err) done(err);
                    else {
                        student.addInterestedEvent(res2._id, res._id, (err, res3) => {
                            if(err) done(err);
                            else{
                                student.retreiveStudentInfo(res2._id, (err, res4) => {
                                    if(err) done(err);
                                    else {
                                        assert.equal(res4.interestedEvents[0].equals(res._id), true, "Make sure that the event added is equal to the actual event id"); 
                                        event.getEvent(res._id, (err, res5) => {
                                            if(err) done(err);
                                            else {
                                                assert.equal(res5.interestedStudents[0].equals(res2._id), true, "Make sure that the student added to the event is equal to the actual student id");
                                                student.deleteStudent(res4._id, (err, del) => {
                                                    if(err) {done(err);}
                                                    else {
                                                        event.deleteEvent(res5._id, (err, del) => {
                                                            if(err) {done(err);}
                                                            else {
                                                                done();
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                });
            };
        });
    });

    it("addConfirmedEvent - Add an event to the confirmedEvents field in the student.", (done) => {
        let newStudent = {
            username: "test5",
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
            eventName: "eventTest5",
            dateTime: new Date(),
            endDateTime: new Date(),
            location: "123 Drive, etc.",
            description: "descriptionTest"
        };

        event.createEvent(newEvent, (err, res) => {
            if(err) done(err);
            else {
                student.studentSignup(newStudent, (err, res2) => {
                    if(err) done(err);
                    else {
                        student.addConfirmedEvent(res2._id, res._id, (err, res3) => {
                            if(err) done(err);
                            else{
                                student.retreiveStudentInfo(res2._id, (err, res4) => {
                                    if(err) done(err);
                                    else {
                                        assert.equal(res4.confirmedEvents[0].equals(res._id), true, "Make sure that the event added is equal to the actual event id"); 
                                        event.getEvent(res._id, (err, res5) => {
                                            if(err) done(err);
                                            else {
                                                assert.equal(res5.confirmedStudents[0].equals(res2._id), true, "Make sure that the student added to the event is equal to the actual student id");
                                                student.deleteStudent(res4._id, (err, del) => {
                                                    if(err) {done(err);}
                                                    else {
                                                        event.deleteEvent(res5._id, (err, del) => {
                                                            if(err) {done(err);}
                                                            else {
                                                                done();
                                                            }
                                                        })
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                });
            };
        });
    });

    it("removeInterestedEvent - Remove an event from the interestedEvents field in the student.", (done) => {
        let newStudent = {
            username: "test6",
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
            eventName: "eventTest6",
            dateTime: new Date(),
            endDateTime: new Date(),
            location: "123 Drive, etc.",
            description: "descriptionTest"
        };

        event.createEvent(newEvent, (err, res) => {
            if(err) done(err);
            else {
                student.studentSignup(newStudent, (err, res2) => {
                    if(err) done(err);
                    else {
                        student.addInterestedEvent(res2._id, res._id, (err, res6) => {
                            if(err) done(err);
                            else {
                                student.removeInterestedEvent(res2._id, res._id, (err, res3) => {
                                    if(err) done(err);
                                    else{
                                        student.retreiveStudentInfo(res2._id, (err, res4) => {
                                            if(err) done(err);
                                            else {
                                                assert.equal(res4.interestedEvents.length, 0, "Make sure that the event is removed from this student"); 
                                                event.getEvent(res._id, (err, res5) => {
                                                    if(err) done(err);
                                                    else {
                                                        assert.equal(res5.interestedStudents.length, 0, "Make sure that the student is removed the event");
                                                        student.deleteStudent(res4._id, (err, del) => {
                                                            if(err) {done(err);}
                                                            else {
                                                                event.deleteEvent(res._id, (err, del) => {
                                                                    if(err) {done(err);}
                                                                    else {
                                                                        done();
                                                                    }
                                                                })
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                })
                            }
                        });
                    }
                });
            };
        });
    });

    it("removeConfirmedEvent - Remove an event from the confirmedEvents field in the student.", (done) => {
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

        event.createEvent(newEvent, (err, res) => {
            if(err) done(err);
            else {
                student.studentSignup(newStudent, (err, res2) => {
                    if(err) done(err);
                    else {
                        student.addConfirmedEvent(res2._id, res._id, (err, res6) => {
                            if(err) done(err);
                            else {
                                student.removeConfirmedEvent(res2._id, res._id, (err, res3) => {
                                    if(err) done(err);
                                    else{
                                        student.retreiveStudentInfo(res2._id, (err, res4) => {
                                            if(err) done(err);
                                            else {
                                                assert.equal(res4.confirmedEvents.length, 0, "Make sure that the event is removed from this student"); 
                                                event.getEvent(res._id, (err, res5) => {
                                                    if(err) done(err);
                                                    else {
                                                        assert.equal(res5.confirmedStudents.length, 0, "Make sure that the student is removed the event");
                                                        student.deleteStudent(res4._id, (err, del) => {
                                                            if(err) {done(err);}
                                                            else {
                                                                event.deleteEvent(res._id, (err, del) => {
                                                                    if(err) {done(err);}
                                                                    else {
                                                                        done();
                                                                    }
                                                                })
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                })
                            }
                        });
                    }
                });
            };
        });
    });

    it("followHost - Add a host to the following field in the student.", (done) => {
        let newStudent = {
            username: "test8",
            email: "test@mail.net",
            password: "testPassword",
            fullName: {
                firstName: "First",
                lastName: "Last"
            },
            birthDate: new Date(2002, 6, 11),
            gender: "Male"
        };

        let newHost = {
            email: "test@mail.net8",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        };

        host.hostSignup(newHost, (err, res) => {
            if(err) done(err);
            else {
                student.studentSignup(newStudent, (err2, res2) => {
                    if(err2) done(err2);
                    else {
                        student.followHost(res2._id, res._id, (err3, res3) => {
                            if(err3) done(err3);
                            else{
                                student.retreiveStudentInfo(res3._id, (err4, res4) => {
                                    if(err4) done(err4);
                                    else {
                                        assert.equal(res4.following[0].equals(res._id), true, "Make sure that the host added is the same as the actual host"); 
                                        student.deleteStudent(res4._id, (err, del) => {
                                            if(err) {done(err);}
                                            else {
                                                host.deleteHost(res._id, (err, del) => {
                                                    if(err) {done(err);}
                                                    else {
                                                        done();
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                });
            };
        });
    });

    it("unfollowHost - Remove a host from the following field in the student.", (done) => {
        let newStudent = {
            username: "test9",
            email: "test@mail.net",
            password: "testPassword",
            fullName: {
                firstName: "First",
                lastName: "Last"
            },
            birthDate: new Date(2002, 6, 11),
            gender: "Male"
        };

        let newHost = {
            email: "test@mail.net9",
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
                student.studentSignup(newStudent, (err2, res2) => {
                    if(err2) {done(err2);}
                    else {
                        student.followHost(res2._id, res._id, (err3, res3) => {
                            if(err3) {done(err3);}
                            else{
                                student.unfollowHost(res2._id, res._id, (err4, res4) => {
                                    if(err4) {done(err4);}
                                    else {
                                        student.retreiveStudentInfo(res2._id, (err5, res5) => {
                                            if(err5) {done(err5);}
                                            else {
                                                assert.equal(res5.following.length, 0, "Make sure that the host is removed from the student"); 
                                                student.deleteStudent(res5._id, (err, res6) => {
                                                    if(err) {done(err);}
                                                    else {
                                                        host.deleteHost(res._id, (err, res7) => {
                                                            if(err) {done(err);}
                                                            else {
                                                                done();
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                })
                            }
                        })
                    }
                });
            };
        });
    })
});