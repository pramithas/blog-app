var myApp = angular.module("myApp", [ 'ngRoute', 'ngResource' ]);

myApp.controller("myController", function($scope, $http) {

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

// a directive to auto-collapse long text
// in elements with the "dd-text-collapse" attribute
myApp
		.directive(
				'ddTextCollapse',
				[
						'$compile',
						function($compile) {

							return {
								restrict : 'A',
								scope : true,
								link : function(scope, element, attrs) {

									// start collapsed
									scope.collapsed = false;

									// create the function to toggle the
									// collapse
									scope.toggle = function() {
										scope.collapsed = !scope.collapsed;
									};

									// wait for changes on the text
									attrs
											.$observe(
													'ddTextCollapseText',
													function(text) {

														// get the length from
														// the attributes
														var maxLength = scope
																.$eval(attrs.ddTextCollapseMaxLength);

														if (text.length > maxLength) {
															// split the text in
															// two parts, the
															// first always
															// showing
															var firstPart = String(
																	text)
																	.substring(
																			0,
																			maxLength);
															var secondPart = String(
																	text)
																	.substring(
																			maxLength,
																			text.length);

															// create some new
															// html elements to
															// hold the separate
															// info
															var firstSpan = $compile(
																	'<span>'
																			+ firstPart
																			+ '</span>')
																	(scope);
															var secondSpan = $compile(
																	'<span ng-if="collapsed">'
																			+ secondPart
																			+ '</span>')
																	(scope);
															var moreIndicatorSpan = $compile(
																	'<span ng-if="!collapsed">... </span>')
																	(scope);
															var lineBreak = $compile(
																	'<br ng-if="collapsed">')
																	(scope);
															var toggleButton = $compile(
																	'<span class="collapse-text-toggle" ng-click="toggle()"><a href="">{{collapsed ? "(less)" : "(more)"}}</a></span>')
																	(scope);
															// remove the
															// current contents
															// of the element
															// and add the new
															// ones we created
															element.empty();
															element
																	.append(firstSpan);
															element
																	.append(secondSpan);
															element
																	.append(moreIndicatorSpan);
															element
																	.append(lineBreak);
															element
																	.append(toggleButton);
														} else {
															element.empty();
															element
																	.append(text);
														}
													});
								}
							};
						} ]);

myApp.controller('postDetailController', [ '$scope', '$routeParams',
		function(scope, routeParams) {
			var param = routeParams.param;
			scope.param = param;
		} ]);

/*
 * myApp.controller("myController", function($scope, $http) {
 * 
 * var baseUrl = "http://localhost:8080";
 * 
 * $http.get(baseUrl + "/tasks").success(function(data) { $scope.tasks = data; })
 * 
 * });
 */

myApp.controller("aboutController", function($scope) {
	$scope.title = "This is about page";
});

myApp.controller("postsController", function($scope) {
	$scope.title = "Top Stories";
});

myApp.config(function($routeProvider) {
	$routeProvider.when('/about', {
		templateUrl : './views/about.html',
		controller : 'aboutController'
	}).when('/posts', {
		templateUrl : "./views/posts.html",
		controller : 'postsController'
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
});
