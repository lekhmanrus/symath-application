'use strict';

angular.module('symathApp.controllers', [])
  .controller('indexCtrl', ['$scope', '$modal', function($scope, $modal) {

    $scope.docs = function() {
      $scope.title = 'dsad';
      $scope.content = 'UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit UI for libsymath-js based on node-webkit';
      var docsModal = $modal({scope: $scope, template: 'partials/modal/docs.tpl.html', animation: 'scale-fade', position: 'center'});
    };

    $scope.about = function() {
      $scope.title = 'About';
      $scope.content = 'UI for libsymath-js based on node-webkit.';
      var docsModal = $modal({scope: $scope, template: 'partials/modal/about.tpl.html', animation: 'scale-fade', position: 'center'});
    };

  }]);