var ctrl = angular.module("portalCtrl",[]);

ctrl.controller("RegistrCtrl",["$scope", "$http", "$location","LangPack",
	function ($scope, $http, $location, LangPack) {
		$scope.langPackage = LangPack.get({lang : "ru"});
		$scope.patters = {
			userFirstName : /^\s*\w*\s*$/,
			userLastName : /^\s*\w*\s*$/,
		};
		$scope.user = {};
		$scope.submit = function () {
			$http({
				method: "POST",
				url : "/user/registration",
				data : $scope.user,
			}).
			success(function(data){
				if (typeof(data.userId) === "number"){
					$location.path("/user/" + data.userId);
				}
			});
		}
	}
]);

ctrl.controller("UserCtrl",["$scope", "$http", "$location", "$routeParams", "LangPack", "userFuctions",
	function ($scope, $http, $location, $routeParams, LangPack, userFuctions) {
		LangPack.get({lang : "ru"}, function(data){
			$scope.langPackage = data;
		});
		userFuctions.getUser().get({id : $routeParams.id}, function(data){
			$scope.user = data.currentUser;
		});
	}
]);

