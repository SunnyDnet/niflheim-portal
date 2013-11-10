/**
 *
 * Routing REST API
 *
 */

exports.registration = function(req, res){
	req.models.user.create(new Array(req.body),function(err,items){
		(err != null ? console.log(err) : res.json(items[0]));
	});
};