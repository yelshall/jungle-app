/*
 * This will be test file to see if everything is being saved in the database successfully.
 * Make sure that after you save, to delete everything.
 * There are edge cases that need to be written as well.
 *
 */
const mongoose = require('mongoose');
const schemas = require('../schemas/schemas');
const verify = require('../utils/verify');
require('dotenv').config({path: '../config/.env'});

mongoose.connect(process.env.DATABASE_ACCESS, () => {
    console.log('Connected to database successfully')
});

var studentSave = () => {
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
        console.log('Student saved successfully');
    })
    .catch(err => {
        console.log(err);
    });
};
//Make tests for adding events and hosts to all the subfields

var hostSave = () => {
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
        console.log('Host saved successfully');
    })
    .catch(err => {
        console.log(err);
    });
};
//Test for not inputting non-required items

var eventSave = () => {
    let event = new schemas.Event({
        eventName: "eventTest",
        location: "123 Drive, etc.",
        tags: [],
        description: "descriptionTest"
    });

    event.save()
    .then(data => {
        console.log('Event saved successfully');
    })
    .catch(err => {
        console.log(err);
    });
};

var tagSave = () => {
    let tag = new schemas.Tag({
        tagName: "Sports"
    });

    tag.save()
    .then(data => {
        console.log('Tag saved successfully');
    })
    .catch(err => {
        console.log(err);
    });
};

var updateSave = () => {
    let update = new schemas.Update({
        title: "TEST",
        message: "This is a test update",
        notifyAll: false
    });

    update.save()
    .then(data => {
        console.log('Update saved successfully');
    })
    .catch(err => {
        console.log(err);
    });
};

var notificationSave = () => {
    let notification = new schemas.Notification({
        notificationType: "TEST_TYPE",
        message: "This is a test notification",
        triggerTime: new Date(2021, 9, 29, 12)
    })

    notification.save()
    .then(data => {
        console.log('Notification saved successfully');
    })
    .catch(err => {
        console.log(err);
    });
};

studentSave();
hostSave();
eventSave();
tagSave();
updateSave();
notificationSave();
verify.checkEmailExists('tevfdkjbdfbjvkdfbst@mail.net', (res) => {console.log(res)});
verify.checkUsernameExists('test', (res) => {console.log(res)});