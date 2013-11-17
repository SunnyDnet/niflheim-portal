/**
 *
 *	File that describes ORM User object
 *
 */
module.exports = function (db, cb) {
    db.define('user', {
        id : String,
        firstName : String,
        lastName : String,
        password : String,
        email : String,
        regDate : Date,
        birthDate : Date,
        male : Boolean,
        nickName : String,
        APIToken : String
    },{});
    return cb();
};
