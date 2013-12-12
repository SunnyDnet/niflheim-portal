/**
 *
 *	File that describes ORM Meeting object
 * 		
 */

module.exports = function (db, cb) {
    db.define('meeting', {
        id : Number,
        description : String,
        date : Date,
        creationDate : Date,
        name : String,
        groupId : Number
    },{});
    return cb();
};