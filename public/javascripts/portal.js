var portal = angular.module("portal",[
	"ngResource",
	"ngCookies",
	"ngRoute",
	"portalCtrl",
	"portalServices"
]);

portal.config(["$routeProvider", 
	function($routeProvider) {
		$routeProvider.
			when("/",{
				templateUrl : "/templates/registration.html",
				controller : "RegistrCtrl"
			}).
			when("/user/:id",{
				templateUrl : "/templates/userProfile.html",
				controller : "UserCtrl"
			}).
			otherwise({
				redirecTo: '/'
			});
	}
]);