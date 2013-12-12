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
					if (err == null) {
						res.json({
							guild : {
								guildId : guilds[0].id
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
		req.models.group.find({
			id : req.params.id
		}, function(err, guild){
			req.models.meeting.find({
				groupId : guild[0].id
			}, function(err, meetings){
				if (err == null && guild.length > 0){

					res.json({
						guild : guild[0],
						meetingList : viewMeetingModel(meetings)
					});
				} else {
					console.log(err);
					res.json({error : err});
				}
			})
		});
	} else {
		res.json({error : "ERROR"});
	}
}

exports.getGuilds = function(req, res){
	req.models.group.find({}, function (err, guilds){
		res.json(guilds);
	})
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
	((value != undefined && value != null && value.length >= 3) ? error = false : error = true); 
	return cb(error, value);
}
function checkGroupName (value, cb){
	var error;
	((value != undefined && value != null && value.length >= 3) ? error = false : error = true); 
	return cb(error, value);
}

function viewMeetingModel (model){
	var viewModel = [];
	for (var i = model.length - 1; i >= 0; i--) {
		var meeting = model[i];
		meeting.day = model[i].date.getDate();
		meeting.time = model[i].date.toLocaleTimeString();
		viewModel.push(meeting);
	};
	return viewModel
}