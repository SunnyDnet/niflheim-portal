var ctrl = angular.module("portalCtrl",[]);

ctrl.controller("RegistrCtrl",["$scope", "$http", "LangPack",
	function ($scope, $http, LangPack) {
		$scope.langPackage = LangPack.get({lang : "ru"});
		$scope.submit = function () {
			$http({
				method: "POST",
				url : "/user/registration",
				data : userObject,
				responseType : "json"
			}).
			success(function(data){
				console.log(data);
			});
		}
	}
]);
