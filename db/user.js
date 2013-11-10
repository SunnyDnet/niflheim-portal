/**
 *
 *	File that describes ORM User object
 *
 */
module.exports = function (db, cb) {
    db.define('user', {
        firstName : String,
        lastName : String,
        age : Date,
        regDate : Date,
        birthDate : Date,
        male : Boolean,
        nickName : String,
        APIToken : String
    },{
    	methods : {
    		getUserGroups : function(){},
    		getUserMeeting : function(){},
    		createGroup : function(){}
    	}
    });
    return cb();
};