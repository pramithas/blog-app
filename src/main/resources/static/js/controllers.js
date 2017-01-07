'use strict';

myApp
		.controller(
				'LoginController',
				function($rootScope, $scope, AuthSharedService) {
					$scope.rememberMe = true;
					$scope.login = function() {
						$rootScope.authenticationError = false;
						AuthSharedService.login($scope.username,
								$scope.password, $scope.rememberMe);
					}
				})
		.controller('HomeController', function($scope, HomeService) {
			$scope.technos = HomeService.getTechno();
		})
		.controller('UsersController', function($scope, $log, UsersService) {
			$scope.users = UsersService.getAll();
		})
		.controller(
				'TokensController',
				function($scope, UsersService, TokensService, $q) {

					var browsers = [ "Firefox", 'Chrome', 'Trident' ]

					$q
							.all(
									[ UsersService.getAll().$promise,
											TokensService.getAll().$promise ])
							.then(
									function(data) {
										var users = data[0];
										var tokens = data[1];

										tokens
												.forEach(function(token) {
													users
															.forEach(function(
																	user) {
																if (token.userLogin === user.login) {
																	token.firstName = user.firstName;
																	token.familyName = user.familyName;
																	browsers
																			.forEach(function(
																					browser) {
																				if (token.userAgent
																						.indexOf(browser) > -1) {
																					token.browser = browser;
																				}
																			});
																}
															});
												});

										$scope.tokens = tokens;
									});

				}).controller('LogoutController', function(AuthSharedService) {
			AuthSharedService.logout();
		}).controller('ErrorController', function($scope, $routeParams) {
			$scope.code = $routeParams.code;

			switch ($scope.code) {
			case "403":
				$scope.message = "Oops! you have come to unauthorised page."
				break;
			case "404":
				$scope.message = "Page not found."
				break;
			default:
				$scope.code = 500;
				$scope.message = "Oops! unexpected error"
			}

		}).controller("myController", function($scope, $http) {

			$http.get('json/posts.json').success(function(response) {
				$scope.posts = response.posts;
			});

			$http.get('json/olderPosts.json').success(function(response) {
				$scope.olderPosts = response.olderPosts;
			});

			$http.get('json/comments.json').success(function(response) {
				$scope.comments = response.comments;
			});

			$scope.commentBody;

			$scope.addComment = function(commentBody) {
				$scope.comments = $scope.comments.concat([ {
					user : "Anonymous",
					body : commentBody
				} ]);
				/*
				 * $scope.commentForm.$setUntouched();
				 */}

			$scope.incrementUpvotes = function(post) {
				post.upvotes++;
			}

			$scope.isCommentBoxOpen = false;

		});
;

myApp.controller('postDetailController', [ '$scope', '$routeParams',
		function(scope, routeParams) {
			var param = routeParams.param;
			scope.param = param;
		} ]);

myApp.controller("aboutController", function($scope) {
	$scope.title = "This is about page";
});

myApp.controller("postsController", function($scope) {
	$scope.title = "Top Stories";
});