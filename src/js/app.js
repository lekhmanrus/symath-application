'use strict';

angular.module('symathApp', ['ngRoute', 'symathApp.filters', 'symathApp.services', 'symathApp.directives', 'symathApp.controllers', 'ui.bootstrap']).
  config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {templateUrl: 'partials/index.html', controller: 'indexCtrl'})
                    .when('/about', {templateUrl: 'partials/about.html', controller: 'aboutCtrl'})
                    .when('/docs', {templateUrl: 'partials/docs.html', controller: 'docsCtrl'})
                    .otherwise({redirectTo: '/'});
  }]);