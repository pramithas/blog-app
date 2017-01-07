'use strict'

var myApp = angular.module("myApp", [ 'ngRoute', 'ngResource',
		'http-auth-interceptor' ]);

myApp.constant('USER_ROLES', {
	all : '*',
	admin : 'admin',
	user : 'user'
});

/*
 * myApp.controller("myController", function($scope, $http) {
 * 
 * var baseUrl = "http://localhost:8080";
 * 
 * $http.get(baseUrl + "/tasks").success(function(data) { $scope.tasks = data; })
 * 
 * });
 */

// You can inject providers and constants in config
/*
 * myapp.config(function($routeProvider, USER_ROLES) {
 * 
 * $routeProvider.when("/", { templateUrl : "views/home.html", controller :
 * 'myController', access : { loginRequired : true, authorizedRoles : [
 * USER_ROLES.all ] } }).when('/users', { templateUrl : 'partials/users.html',
 * controller : 'UsersController', access : { loginRequired : true,
 * authorizedRoles : [ USER_ROLES.admin ] } }).when('/login', { templateUrl :
 * 'partials/login.html', controller : 'LoginController', access : {
 * loginRequired : false, authorizedRoles : [ USER_ROLES.all ] }
 * }).when("/logout", { template : " ", controller : "LogoutController", access : {
 * loginRequired : false, authorizedRoles : [ USER_ROLES.all ] }
 * }).when("/error/:code", { templateUrl : "partials/error.html", controller :
 * "ErrorController", access : { loginRequired : false, authorizedRoles : [
 * USER_ROLES.all ] } }).otherwise({ redirectTo : '/error/404', access : {
 * loginRequired : false, authorizedRoles : [ USER_ROLES.all ] } }); });
 */

myApp
		.config(function($routeProvider, $httpProvider, USER_ROLES) {
			$routeProvider.when('/about', {
				templateUrl : './views/about.html',
				controller : 'aboutController'
			}).when('/posts', {
				templateUrl : "./views/posts.html",
				controller : 'myController'

			}).when('/login', {
				templateUrl : './views/login.html',
				controller : 'LoginController',
				access : {
					loginRequired : false,
					authorizedRoles : [ USER_ROLES.all ]
				}
			}).when("/logout", {
				template : " ",
				controller : "LogoutController",
				access : {
					loginRequired : false,
					authorizedRoles : [ USER_ROLES.all ]
				}
			}).when('/', {
				templateUrl : "./views/home.html",
				controller : 'postsController'
			}).when('/admin', {
				templateUrl : "./views/admin.html",
				controller : 'postsController'
			}).when('/posts/post/:param', {
				templateUrl : "./views/postdetail.html",
				controller : 'postDetailController'
			});
			$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		});

// You can inject only instances here but no providers
myApp
		.run(function($rootScope, $location, $http, AuthSharedService, Session,
				USER_ROLES, $q, $timeout) {

			$rootScope
					.$on(
							'$routeChangeStart',
							function(event, next) {
							//	alert("The value of the authenticated variable is "+ $rootScope.authenticated);
								if (next.originalPath === "/login"
										&& $rootScope.authenticated) {
									event.preventDefault();
								} else if (next.access
										&& next.access.loginRequired
										&& !$rootScope.authenticated) {
									event.preventDefault();
									$rootScope.$broadcast(
											"event:auth-loginRequired", {});
								} else if (next.access
										&& !AuthSharedService
												.isAuthorized(next.access.authorizedRoles)) {
									event.preventDefault();
									$rootScope.$broadcast(
											"event:auth-forbidden", {});
								}
							});

			$rootScope.$on('$routeChangeSuccess',
					function(scope, next, current) {
						$rootScope.$evalAsync(function() {
							$.material.init();
						});
					});

			// Call when the the client is confirmed
			$rootScope
					.$on(
							'event:auth-loginConfirmed',
							function(event, data) {
								//console.log('login confirmed start ' + data);
								$rootScope.loadingAccount = false;
								var nextLocation = ($rootScope.requestedUrl ? $rootScope.requestedUrl
										: "/");
								var delay = ($location.path() === "/loading" ? 1500
										: 0);

								$timeout(function() {
									Session.create(data);
									$rootScope.account = Session;
									$rootScope.authenticated = true;
									$location.path(nextLocation).replace();
								}, delay);

							});

			// Call when the 401 response is returned by the server
			$rootScope.$on('event:auth-loginRequired', function(event, data) {
				if ($rootScope.loadingAccount && data.status !== 401) {
					$rootScope.requestedUrl = $location.path()
					// $location.path('/loading');
				} else {
					Session.invalidate();
					$rootScope.authenticated = false;
					$rootScope.loadingAccount = false;
					$location.path('/login');
				}
			});

			// Call when the 403 response is returned by the server
			$rootScope.$on('event:auth-forbidden', function(rejection) {
				$rootScope.$evalAsync(function() {
					$location.path('/error/403').replace();
				});
			});

			// Call when the user logs out
			$rootScope.$on('event:auth-loginCancelled', function() {
				$location.path('/').replace();
			});

			// Get already authenticated user account
			AuthSharedService.getAccount();

		});
