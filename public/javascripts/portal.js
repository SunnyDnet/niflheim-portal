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
				templateUrl : "/templates/index.html",
				controller : "RegistrCtrl"
			}).
			when("/user/:id",{
				templateUrl : "/templates/userProfile.html",
				controller : "UserCtrl"
			}).
			when("/user/:id/guilds",{
				templateUrl : "/templates/guildlist.html",
				controller : "GuildListCtrl"
			}).
			otherwise({
				redirecTo: '/'
			});
	}
]);