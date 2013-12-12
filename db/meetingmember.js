/**
 *
 *	File that describes ORM User object
 *
 */
 module.exports = function (db, cb) {
    db.define('meetingmember', {
       userId : Number,
       meetingId : Number,
       status : Number,
       id : Number
    },{});
    return cb();
};