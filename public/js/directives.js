'use strict';

angular.module('ls.directives', []).
	directive('ngEnter', function () {
		return function(scope, elem, attrs) {
			elem.bind('keypress', function(key) {
				if(key.charCode == 13)
					scope.shorten();
			});
		};
	})
	.directive('ngClipcopy', function() {
        return function(scope, elem, attrs) {
            elem.bind('click',function(){
				
                var range = document.createRange();
                range.selectNode($('#link_elem')[0]);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                var successful = document.execCommand('copy');

                if(successful)
					alert('Copied address to clipboard!');
                window.getSelection().removeAllRanges();
            });
        }

    });
