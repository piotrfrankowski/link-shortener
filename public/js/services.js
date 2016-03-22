'use strict';

angular.module('ls.services', []).
	service('linkAddr', ['$location', function($location) {
		this.getUrl = function() {
			return $location.absUrl() + 'link/';
		};
	}]);
