/**
 *
 * Routing GUILD REST API
 *
 */

exports.addGuild = function(req, res){
 	var guildModel = prePareGuildModel(req.body.guild);
 	if(guildModel.errors.length == 0){
		req.models.group.create(new Array(guildModel.guild), function (err, guilds){
			if (err == null) { 
				req.models.groupmember.create(new Array({
					userId : req.body.user.id,
					groupId : guilds[0].id
				}), function (err, members) {
					console.log(err);
					if (err != null) {
						res.json({
							guild : {
								id : guilds[0].id
							}
						});
					} else {
						console.log(err);
						res.json({error : err});
					}
				});
			} else {
				console.log(err);
				res.json({error : err});
			}
		});
	} else {
		console.log(guildModel.errors);
		res.json({error : guildModel.errors});
	}	
}

exports.getGuild = function(req, res){
	if (req.params.id != undefined && req.params.id != null){
		req.model.group.find({
			id : req.params.id
		}, 
		function(err, guild){
			if (err == null && guild.length > 0){
				res.json({
					guild : guildViewModel(guild[0])
				});
			} else {
				console.log(err);
				res.json({error : err});
			}
		});
	} else {
		res.json({error : "ERROR"});
	}
}

function prePareGuildModel(model){
 	var guildModel = {
			errors : []
		};

	guildModel.guild = {
			id : Math.floor(Math.random() * 10000000 + 1),
			description : checkDescription(model.descr, function(err, value){ 
				(err ? guildModel.errors.push("Invalid Description") : null);
				return value;
			}),
			creationDate : new Date(),
			groupName : checkGroupName(model.name, function(err, value){ 
				(err ? guildModel.errors.push("Invalid Group Name") : null);
				return value;
			}),
		}
	return guildModel; 
}

function checkDescription (value, cb){
	var error;
	((value != undefined && value != null && value.length >= 3 && value.length <= 10) ? error = false : error = true); 
	return cb(error, value);
}
function checkGroupName (value, cb){
	var error;
	((value != undefined && value != null && value.length >= 3 && value.length <= 10) ? error = false : error = true); 
	return cb(error, value);
}