/**
	File that describes ORM User object
 */
module.exports = function (db, cb) {
    db.define('user', {
        firstName : String,
        lastName : String,
        age : Date,
        registrationDate : Date,
        male : Boolean
    });
    return cb();
};