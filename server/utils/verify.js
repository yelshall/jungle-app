const mongoose = require('mongoose');
const schemas = require('../schemas/schemas');

//Check if username exists
var checkUsernameExists = async (username, callback) => {
    let check = await schemas.Student.exists({username: username});
    if(callback)
        callback(check)
    else
        return check;
};
//Check if email exists
var checkEmailExists = async (email, callback) => {
    let check = (await schemas.Student.exists({email: email})) && (await schemas.Host.exists({email: email}));
    if(callback)
        callback(check)
    else
        return check;
};

module.exports = {
    checkUsernameExists: checkUsernameExists,
    checkEmailExists: checkEmailExists
};