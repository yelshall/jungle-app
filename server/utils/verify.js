const mongoose = require('mongoose');
const schemas = require('../schemas/schemas');

//Check if email exists
var checkEmailExists = async (email, callback) => {
    let check = (await schemas.Student.exists({email: email})) || (await schemas.Host.exists({email: email}));
    if(callback)
        callback(check);
    else
        return check;
};

var checkTagExists = async (tagName, callback) => {
    let check = await schemas.Tag.exists({tagName: tagName});
    if(callback)
        callback(check);
    else
        return check;
};

module.exports = {
    checkEmailExists: checkEmailExists,
    checkTagExists: checkTagExists
};