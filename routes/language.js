
/*
 * GET users listing.
 */

exports.lang = function(req, res){
	var lang = req.params.lang
  	switch(lang){
  		case "eu":
  			res.json({hello:"Hi"});
  			break;
  		case "ukr":
  			res.json({hello:"Preved"});
  			break;
  	}
};