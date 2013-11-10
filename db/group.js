/**
 *
 *	File that describes ORM Group object
 * 		
 */

module.exports = function (db, cb) {
    db.define('group', {
        groupName : String,
        description : String,
        creationDate : Date
    },{
    	methods : {
    		getMembers : function(){}
    	}
    });
    return cb();
};