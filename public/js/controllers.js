'use strict';

angular.module('ls.controllers', []).
	controller('mainCtrl', function ($scope, $http, linkUrl) {
		$scope.addr = '';
		$scope.new_link = '';
		$scope.err_msg = '';

		$scope.shorten = function() {

			$http.post('/shorten', {link: $scope.addr})
			.success(function(res) {
				$scope.addr = '';
				$scope.new_link = linkUrl + res.addr;
			})
			.error(function(err) {
				$scope.err_msg = 'Error! ' + err;
				console.log(err);
			});
		};

		$scope.clear = function() {
			$scope.addr = '';
			$scope.new_link = '';
		};

	});
