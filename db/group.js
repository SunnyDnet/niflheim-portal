/**
 *
 *	File that describes ORM Group object
 * 		
 */

module.exports = function (db, cb) {
    db.define('group', {
        id : Number,
        groupName : String,
        description : String,
        creationDate : Date
    },{});
    return cb();
};