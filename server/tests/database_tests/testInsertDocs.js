const mongoose = require('mongoose');
const schemas = require('../../schemas/schemas');

describe('Insert Documents', () => {
    it('Try to Insert Valid Student Document', (done) => {
        let student = new schemas.Student({
            username: "test",
            email: "test@mail.net",
            password: "testPassword",
            fullName: {
                firstName: "First",
                lastName: "Last"
            },
            birthDate: new Date(2002, 6, 11),
            gender: "Male",
        });
        
        student.save()
        .then(data => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it('Try to Insert Invalid Student Document', (done) => {
        let student = new schemas.Student({
            invalidField: "test",
            email: "test@mail.net",
            password: "testPassword",
            fullName: {
                firstName: "First",
                lastName: "Last"
            },
            birthDate: new Date(2002, 6, 11),
            gender: "Male",
        });
        
        student.save()
        .then(data => {
            done({err: "Invalid document inserted"});
        })
        .catch(err => {
            done();
        });
    });

    it('Try to Insert Insert Valid Host Document', (done) => {
        let host = new schemas.Host({
            email: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        });
        
        host.save()
        .then(data => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it('Try to Insert Invalid Host Document', (done) => {
        let host = new schemas.Host({
            invalidField: "test@mail.net",
            password: "testPassword",
            hostName: "hostNameTest",
            description: "descriptionTest",
            phoneNumber: "+1 (999) 1234 567",
            website: "www.host.com",
            tags: []
        });
        
        host.save()
        .then(data => {
            done({err: "Invalid document inserted"});
        })
        .catch(err => {
            done();
        });
    });

    it('Try to Insert Insert Event Document', (done) => {
        let event = new schemas.Event({
            eventName: "eventTest",
            dateTime: new Date(),
            location: "123 Drive, etc.",
            tags: [],
            description: "descriptionTest"
        });
        
        event.save()
        .then(data => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it('Try to Insert Invalid Event Document', (done) => {
        let event = new schemas.Event({
            invalidField: "eventTest",
            location: "123 Drive, etc.",
            tags: [],
            description: "descriptionTest"
        });
        
        event.save()
        .then(data => {
            done({err: "Invalid document inserted"});
        })
        .catch(err => {
            done();
        });
    });

    it('Try to Insert Valid Tag Document', (done) => {
        let tag = new schemas.Tag({
            tagName: "test tag"
        });
        
        tag.save()
        .then(data => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it('Try to Insert Invalid Tag Document', (done) => {
        let tag = new schemas.Tag({
            invalidField: "test tag"
        });
        
        tag.save()
        .then(data => {
            done({err: "Invalid document inserted"});
        })
        .catch(err => {
            done();
        });
    });

    it('Try to Insert Valid Update Document', (done) => {
        let update = new schemas.Update({
            title: "test title",
            message: "This is a test update",
            event: mongoose.Types.ObjectId('578df3efb618f5141202a196'),
            notifyAll: false
        });
        
        update.save()
        .then(data => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it('Try to Insert Invalid Update Document', (done) => {
        let update = new schemas.Update({
            title: "test title",
            message: "This is a test update",
            notifyAll: false,
            invalidField: "invalid field"
        });
        
        update.save()
        .then(data => {
            done({err: "Invalid document inserted"});
        })
        .catch(err => {
            done();
        });
    });

    it('Try to Insert Valid Notification Document', (done) => {
        let notification = new schemas.Notification({
            notificationType: "test type",
            message: "This is a test notification",
            triggerTime: new Date(2021, 9, 29, 12)
        });
        
        notification.save()
        .then(data => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it('Try to Insert Invalid Notification Document', (done) => {
        let notification = new schemas.Notification({
            notificationType: "test type",
            message: "This is a test notification",
            invalidField: new Date(2021, 9, 29, 12)
        });
        
        notification.save()
        .then(data => {
            done({err: "Invalid document inserted"});
        })
        .catch(err => {
            done();
        });
    });
});