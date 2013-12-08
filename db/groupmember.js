/**
 *
 *	File that describes ORM GroupMember object
 * 		
 */

module.exports = function (db, cb) {
    db.define('groupmember', {
        userId : Number,
        groupId : Number
    },{});
    return cb();
};