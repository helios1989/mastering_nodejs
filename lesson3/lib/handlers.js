/*
 * 
 * this file will handle the routing
 * for request
 */

const handlers = {};

const _data = require('./data'),
    helpers = require('./helpers')

handlers.ping = (data, callback) => {
    callback(200);
}

handlers.notFound = (data, callback) => {
    callback(404);
};
handlers._users = (data, callback) => {

};
handlers.users = (data, callback) => {
    let acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {

    } else {
        callback(405);
    }
}

handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
// users -post
handlers._users.post = (data, callback) => {
    // Check that all required fields are filled out
    let firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    let lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    let phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    let password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    let tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // Make sure the user doesnt already exist
        _data.read('users', phone, function(err, data) {
            // Hash the password
            var hashedPassword = helpers.hash(password);

            // Create the user object
            if (hashedPassword) {
                var userObject = {
                    'firstName': firstName,
                    'lastName': lastName,
                    'phone': phone,
                    'hashedPassword': hashedPassword,
                    'tosAgreement': true
                };

                // Store the user
                _data.create('users', phone, userObject, function(err) {
                    if (!err) {
                        callback(200);
                    } else {
                        console.log(err);
                        callback(500, { 'Error': 'Could not create the new user' });
                    }
                });
            } else {
                callback(500, { 'Error': 'Could not hash the user\'s password.' });
            }
        });
    } else {
        callback(400, { 'Error': 'users that phone number already exist' })
    };
};
// users - put
handlers._users.put = (data, callback) => {

};
// users-get
handlers._users.get = (data, callback) => {

};
// users-delete
handlers._users.delete = (data, callback) => {

};

module.exports = handlers;