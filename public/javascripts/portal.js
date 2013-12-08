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
				templateUrl : "/templates/userprofile.html",
				controller : "UserCtrl"
			}).
			when("/user/:id/guilds",{
				templateUrl : "/templates/guildlist.html",
				controller : "GuildListCtrl"
			}).
			when("/user/:id/guild/add",{
				templateUrl : "/templates/addguild.html",
				controller : "GuildAddCtrl"
			}).
			otherwise({
				redirecTo: '/'
			});
	}
]);