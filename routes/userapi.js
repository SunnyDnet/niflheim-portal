/**
 *
 * Routing USER REST API
 *
 */

exports.registration = function(req, res){
	var reqBody = prepareUserModel(req.body);
	if(reqBody.errors.length == 0){
		req.models.user.create(new Array(reqBody.user), function(err,items){
			(err != null ? console.log(err) : res.json({userId : items[0].id}));
		});
	} else {
		res.json(reqBody.errors);
	}	
};
exports.loginUser = function(req, res){
	req.models.user.get(req.params.id,function(err, user){
		(err != null ? console.log(err) : res.json({currentUser : user}));
	});
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function prepareUserModel (model){
	var userModel = {
			errors : []
		};

	userModel.user = {
			id : Math.floor(Math.random() * 10000000 + 1),
			firstName : checkNames(model.firstName, function(err, value){ 
				(err ? userModel.errors.push("First Name invalid") : null);
				return value;
			}),
			lastName : checkNames(model.lastName, function(err, value){ 
				(err ? userModel.errors.push("Last Name invalid") : null);
				return value;
			}),
			email : checkEmail(model.email, function(err, value){ 
				(err ? userModel.errors.push("Email invalid") : null);
				return value;
			}),
			password : checkPassword(model.password, function(err, value){ 
				(err ? userModel.errors.push("Password invalid") : null);
				return value;
			}),
			regDate : new Date(),
			birthDate : checkBirthDate(model.YYYY, model.MM, model.DD, function(err, value){ 
				(err ? userModel.errors.push("Birth Date invalid") : null);
				return value;
			}),
			male : checkGender(model.male, function(err, value){ 
				(err ? userModel.errors.push("Gender invalid") : null);
				return value;
			}),
			nickName : checkNames(model.nickName, function(err, value){ 
				(err ? userModel.errors.push("Nick Name invalid") : null);
				return value;
			}),
			APIToken : guid()
		}
	return userModel; 
}

function checkNames (value, cb){
	var error;
	((value.length > 3 && value.length < 10) ? error = false : error = true); 
	return cb(error, value);
}

function checkPassword (value, cb){
	var error;
	((value.length > 3) ? error = false : error = true); 
	return cb(error, value);
}

function checkBirthDate (yyyy, mm, dd, cb){
	try{
		var date = new Date(parseInt(yyyy), parseInt(mm), parseInt(dd)),
			error = false;	
	} catch(e){
		error = true;
	} finally {
		return cb(error, date);
	}
}

function checkGender (value,cb){
	var gender = false;
	((value === "F") ? gender = false : gender = true);
	return cb(false, gender);
}

function checkEmail (value, cb){
	return cb(false, value);
}