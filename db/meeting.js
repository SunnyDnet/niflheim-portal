/**
 *
 *	File that describes ORM Meeting object
 * 		
 */

module.exports = function (db, cb) {
    db.define('group', {
        description : String,
        date : Date,
        creationDate : Date
    },{
    	methods : {
    		getMembers : function(){}
    	}
    });
    return cb();
};