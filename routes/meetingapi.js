/**
 *
 * Routing GUILD REST API
 *
 */

 exports.addMeeting = function(req, res){
 	var meetingModel = prePareMeetingModel(req.body.meeting);
 	meetingModel.meeting.groupId = req.body.guildId;
 	if(meetingModel.errors.length == 0){
		req.models.meeting.create(new Array(meetingModel.meeting), function (err, meetings){
			if (err == null) { 
				res.json({
					guild : {
						guildId : parseInt(meetings[0].groupId)
					}
				});
			} else {
				console.log(err);
				res.json({error : err});
			}
		});
	} else {
		console.log(meetingModel.errors);
		res.json({error : meetingModel.errors});
	}	
}

exports.setStatus = function(req, res){
	var response = {};
	console.log(req.models.groupmember)
	req.models.user.find({
		id : req.body.userId, 
		APIToken : req.body.userUUID
	}, function(err, users){
		if (err == null && users.length > 0) {
			req.models.meetingmember.find({
				userId : parseInt(req.body.userId),
				meetingId : req.body.meetingId
			}, function(err, meeting){
				var meet = meeting[0];
				console.log(meet);
				if (err == null && meeting != undefined && meeting.length == 0) {
					req.models.meetingmember.create(new Array({
						userId : users[0].id,
						meetingId : req.body.meetingId,
						status : req.body.status
					}), function(err, meeting){
						response = {"OK" : "OK"};
					})
				} else if (err == null && meeting.length > 0) {
					meeting[0].status = req.body.status
					meeting[0].save(function(){})
				} else {
					console.log(err);
					response = {error : err};
				}
			
			});
			res.json(response);
		} else {
			console.log(err);
			res.json({error : err});
		}
	})
}

function prePareMeetingModel(model){
 	var meetingModel = {
			errors : []
		};

	meetingModel.meeting = {
			id : Math.floor(Math.random() * 10000000 + 1),
			description : checkDescription(model.desc, function(err, value){ 
				(err ? meetingModel.errors.push("Invalid Description") : null);
				return value;
			}),
			date : checkDate(model.YYYY, model.MM, model.DD, function(err, value){ 
				(err ? userModel.errors.push("Date invalid") : null);
				return value;
			}),
			creationDate : new Date(),
			name : checkGroupName(model.name, function(err, value){ 
				(err ? meetingModel.errors.push("Invalid Name") : null);
				return value;
			}),
		}
	return meetingModel; 
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

function checkDate (yyyy, mm, dd, cb){
	try{
		var date = new Date(parseInt(yyyy), parseInt(mm), parseInt(dd)),
			error = false;	
	} catch(e){
		error = true;
	} finally {
		return cb(error, date);
	}
}