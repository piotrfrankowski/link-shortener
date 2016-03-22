'use strict';

angular.module('ls', [
	'ls.controllers',
	'ls.services',
	'ls.directives'
]).
config(function ($routeProvider, $locationProvider) {
	$routeProvider.
	when('/', {
		controller: 'mainCtrl'
	}).
	otherwise({
		redirectTo: '/',
	});

	$locationProvider.html5Mode(true);
});
