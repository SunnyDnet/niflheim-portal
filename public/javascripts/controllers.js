var ctrl = angular.module("portalCtrl",[]);

ctrl.controller("RegistrCtrl", ["$scope", "$http", "$location", "$cookies", "langPack", "userFunctions", "globalPrefs",
	function ($scope, $http, $location, $cookies, langPack, userFunctions, globalPrefs) {
		langPack.get({
			lang : "ru"
		},function(data){
			$scope.langPackage = data;
		});
		$scope.patterns = {
			userYYYY : /^(19|20)\d{2}$/,
			userMM : /\b(?:1[0-2]|[1-9])\b/,
			userDD : /^([1-9]|[12]\d|3[0-1])$/,
			userEmail : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			userFirstName : /^\s*\w*\s*$/,
			userLastName : /^\s*\w*\s*$/
		};
		$scope.user = {};
		$scope.signInfo = {};
		$scope.step = 0;
		$scope.forward = function (){
			$scope.step++;
		};
		$scope.backword = function (){
			$scope.step--;
		};
		$scope.submit = function () {
			$http({
				method: "POST",
				url : "/user/registration",
				data : $scope.user,
			}).
			success(function(data){
				if (data.user != undefined && data.user != null){
					if (typeof(data.user.userId) === "number"){
						globalPrefs.setUser(data.user.userId);
						$cookies.UUID = data.user.UUID;
						$cookies.userId = data.user.userId.toString();
						$location.path(globalPrefs.getUserLinks("user"));
					}
				}
			});
		};
		$scope.signIn = function (){
			$http({
				method: "POST",
				url : "/user/checkuser",
				data : $scope.signInfo
			})
			.success(function(data){
				if(data.exist != undefined && data.exist != null && data.exist === true){
					$cookies.userId = data.userId.toString();
					$cookies.UUID = data.UUID;
					globalPrefs.setUser(data.userId);
					$location.path(globalPrefs.getUserLinks("user"));
				}
			});
		};
	}
]);

ctrl.controller("UserCtrl",["$scope", "$http", "$location", "$cookies", "$routeParams", "langPack", "userFunctions", "globalPrefs",
	function ($scope, $http, $location, $cookies, $routeParams, langPack, userFunctions, globalPrefs) {
		langPack.get({lang : "ru"}, function(data){
			$scope.langPackage = data;
		});
		if ($cookies.UUID){
			userFunctions.getUser().get({
				id : $routeParams.id, 
				UUID : $cookies.UUID
			},
			function(data){
				if(!data.hasOwnProperty("error")){
					globalPrefs.setUser(data.currentUser.id);
					$location.path(globalPrefs.getUserLinks("user"));
					$scope.user = data.currentUser;
				} else {
					$cookies.UUID = null;
					$location.path("/");
				}
			});
		} else {
			$location.path("/");
		};
		$scope.meeting = function (){
			$location.path(globalPrefs.getUserLinks("meeting"));
		}
		$scope.guilds = function (){
			$location.path(globalPrefs.getUserLinks("guilds"));
		}
		$scope.calendar = function (){
			$location.path(globalPrefs.getUserLinks("calendar"));
		}
		$scope.user = function (){
			$location.path(globalPrefs.getUserLinks("user"));
		}
	}
]);
ctrl.controller("GuildListCtrl",["$scope", "$http", "$location", "$cookies", "$routeParams", "langPack", "userFunctions", "globalPrefs",
	function ($scope, $http, $location, $cookies, $routeParams, langPack, userFunctions, globalPrefs) {
		$scope.data = {};
		langPack.get({lang : "ru"}, function(data){
			$scope.langPackage = data;
		});
		$http({
				method: "POST",
				url : "/guild/list"
			})
			.success(function (data){
				console.log(data);
				$scope.data.guilds = data;
			});
		$scope.view = function (id){
			$location.path("/guild/" + id);
		}
		$scope.meeting = function (){
			$location.path(globalPrefs.getUserLinks("meeting"));
		}
		$scope.guilds = function (){
			$location.path(globalPrefs.getUserLinks("guilds"));
		}
		$scope.calendar = function (){
			$location.path(globalPrefs.getUserLinks("calendar"));
		}
		$scope.user = function (){
			$location.path(globalPrefs.getUserLinks("user"));
		}
		$scope.addingGuild = function(){
			$location.path(globalPrefs.getUserLinks("user") + "/guild/add");
		}
	}
]);
ctrl.controller("GuildAddCtrl",["$scope", "$http", "$location", "$cookies", "$routeParams", "langPack", "userFunctions", "globalPrefs",
	function ($scope, $http, $location, $cookies, $routeParams, langPack, userFunctions, globalPrefs) {
		langPack.get({lang : "ru"}, function(data){
			$scope.langPackage = data;
		});
		$scope.guild = {};
		$scope.meeting = function (){
			$location.path(globalPrefs.getUserLinks("meeting"));
		};
		$scope.guilds = function (){
			$location.path(globalPrefs.getUserLinks("guilds"));
		};
		$scope.calendar = function (){
			$location.path(globalPrefs.getUserLinks("calendar"));
		};
		$scope.user = function (){
			$location.path(globalPrefs.getUserLinks("user"));
		};
		$scope.guildadd = function(){
			$http({
				method: "POST",
				url : "/guild/add",
				data : {
					guild : $scope.guild,
					user : {
						id : $routeParams.id,
						UUID : $cookies.UUID
					}
				}
			})
			.success(function (data){
				if (data.guild != undefined && data.guild != null){
					if (typeof(data.guild.guildId) === "number"){
						$location.path("/guild/" + data.guild.guildId);
					}
				}
			});
		}
	}
]);
ctrl.controller("GuildCrtl",["$scope", "$http", "$location", "$cookies", "$routeParams", "langPack", "userFunctions", "globalPrefs", "guildFunctions",
	function ($scope, $http, $location, $cookies, $routeParams, langPack, userFunctions, globalPrefs, guildFunctions) {
		$scope.data = {};
		langPack.get({lang : "ru"}, function(data){
			$scope.langPackage = data;
		});
		guildFunctions.get({
			id : $routeParams.id
		}, function (data){
			console.log(data);
			$scope.data = data;
		})
		$scope.status = function (id, status){
			$http({
				url : "meeting/status",
				method : "POST",
				data : {
					meetingId : id,
					userId : $cookies.userId,
					userUUID : $cookies.UUID,
					status : status
				}
			}).success(function(data){

			});

		}	
		$scope.addmeeting = function (){
			$location.path("/guild/" + $routeParams.id + "/meeting/add");
		}		
		$scope.meeting = function (){
			$location.path(globalPrefs.getUserLinks("meeting"));
		}
		$scope.guilds = function (){
			$location.path(globalPrefs.getUserLinks("guilds"));
		}
		$scope.calendar = function (){
			$location.path(globalPrefs.getUserLinks("calendar"));
		}
		$scope.user = function (){
			$location.path(globalPrefs.getUserLinks("user"));
		}
	}
]);
ctrl.controller("MeetingAddCtrl",["$scope", "$http", "$location", "$cookies", "$routeParams", "langPack", "userFunctions", "globalPrefs", 
	function ($scope, $http, $location, $cookies, $routeParams, langPack, userFunctions, globalPrefs) {
		$scope.data = {
			meeting : {}
		};
		langPack.get({lang : "ru"}, function(data){
			$scope.langPackage = data;
		});
		$scope.addMeeting = function(){
			$http({
				method: "POST",
				url : "/meeting/add",
				data : {
					meeting : $scope.data.meeting,
					guildId : $routeParams.id
				}
			})
			.success(function (data){
				if (data.guild != undefined && data.guild != null){
					if (typeof(data.guild.guildId) === "number"){
						$location.path("/guild/" + data.guild.guildId);
					}
				}
			});
		}
		$scope.meeting = function (){
			$location.path(globalPrefs.getUserLinks("meeting"));
		}
		$scope.guilds = function (){
			$location.path(globalPrefs.getUserLinks("guilds"));
		}
		$scope.calendar = function (){
			$location.path(globalPrefs.getUserLinks("calendar"));
		}
		$scope.user = function (){
			$location.path(globalPrefs.getUserLinks("user"));
		}
	}
]);


