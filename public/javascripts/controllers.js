var ctrl = angular.module("portalCtrl",[]);

ctrl.controller("RegistrCtrl", ["$scope", "$http", "$location", "$cookies", "langPack", "userFunctions",
	function ($scope, $http, $location, $cookies, langPack, userFunctions) {
		langPack.get({
			lang : "ru"
		},function(data){
			$scope.langPackage = data;
		});
		$scope.patters = {
			userFirstName : /^\s*\w*\s*$/,
			userLastName : /^\s*\w*\s*$/,
		};
		$scope.user = {};
		$scope.signInfo = {};
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
					if (typeof(data.user.id) === "number"){
						$cookies.UUID = data.user.UUID;
						$location.path("/user/" + data.userId);
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
					$location.path("/user/" + data.userId);
				}
			});
		};
	}
]);

ctrl.controller("UserCtrl",["$scope", "$http", "$location", "$cookies", "$routeParams", "langPack", "userFunctions",
	function ($scope, $http, $location, $cookies, $routeParams, langPack, userFunctions) {
		langPack.get({lang : "ru"}, function(data){
			$scope.langPackage = data;
		});
		if ($cookies.UUID){
			userFunctions.getUser().get({id : $routeParams.id, UUID : $cookies.UUID}, function(data){
				if(!data.hasOwnProperty("error")){
					$scope.user = data.currentUser;
				} else {
					$cookies.UUID = null;
					$location.path("/");
				}
			});
		} else {
			$location.path("/");
		}
	}
]);

