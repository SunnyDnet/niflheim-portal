
/*
 * GET users listing.
 */

exports.registration = function(req, res){
	req.models.user.create(new Array(req.body),function(err,items){
		console.log(err);
	});
};