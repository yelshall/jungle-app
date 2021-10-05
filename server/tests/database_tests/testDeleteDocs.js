const mongoose = require('mongoose');
const schemas = require('../../schemas/schemas');

describe("Delete Documents", () => {
    it("Try to Delete Student Document", (done) => {
        schemas.Student.deleteMany({email: "test@mail.net"}, (err) => {
            if(err) done(err);
            else done();
        });
    });

    it("Try to Delete Host Document", (done) => {
        schemas.Host.deleteMany({email: "test@mail.net"}, (err) => {
            if(err) done(err);
            else done();
        });
    });

    it("Try to Delete Event Document", (done) => {
        schemas.Event.deleteMany({location: "123 Drive, etc."}, (err) => {
            if(err) done(err);
            else done();
        });
    });

    it("Try to Delete Tag Document", (done) => {
        schemas.Tag.deleteMany({tagName: "test tag"}, (err) => {
            if(err) done(err);
            else done();
        });
    });

    it("Try to Delete Update Document", (done) => {
        schemas.Update.deleteMany({event: mongoose.Types.ObjectId('578df3efb618f5141202a196')}, (err) => {
            if(err) done(err);
            else done();
        });
    });

    it("Try to Delete Notification Document", (done) => {
        schemas.Notification.deleteMany({triggerTime: new Date(2021, 9, 29, 12)}, (err) => {
            if(err) done(err);
            else done();
        });
    });
});