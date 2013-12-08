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
				xsrfHeaderName : "UUID",
				xsrfCookieName : "UUID",
				data : $scope.user,
			}).
			success(function(data){
				if (data.user != undefined && data.user != null){
					if (typeof(data.user.userId) === "number"){
						globalPrefs.setUser(data.user.userId);
						$cookies.UUID = data.user.UUID;
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
		langPack.get({lang : "ru"}, function(data){
			$scope.langPackage = data;
		});
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
		$scope.addguild = function(){
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
			.success(function(data){
				if (data.guild != undefined && data.guild != null){
					if (typeof(data.guild.guildId) === "number"){
						$location.path("/guild/" + data.guild.guildId);
					}
				}
			});
		}
	}
]);
ctrl.controller("GuildCrtl",["$scope", "$http", "$location", "$cookies", "$routeParams", "langPack", "userFunctions", "globalPrefs",
	function ($scope, $http, $location, $cookies, $routeParams, langPack, userFunctions, globalPrefs) {
		langPack.get({lang : "ru"}, function(data){
			$scope.langPackage = data;
		});
		$scope.guild = {};
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
		$scope.addguild = function(){
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
			.success(function(data){
				if (data.guild != undefined && data.guild != null){
					if (typeof(data.guild.guildId) === "number"){
						$location.path("/guild/" + data.guild.guildId);
					}
				}
			});
		}
	}
]);

