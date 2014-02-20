'use strict';

angular.module('symathApp.controllers', [])
  .controller('indexCtrl', ['$scope', '$modal', function($scope, $modal) {

    $scope.docs = function() {
      $scope.title = 'dsad';
      $scope.items = [
                        {index: 0, title: 'some', content: 'tra'},
                        {index: 1, title: '11111', content: '1111111111111111111111111'},
                        {index: 2, title: '2', content: '222'}
                    ];
      $scope.current = 0;
      $scope.content = $scope.items[$scope.current].content;
      $scope.show = function(id) {
        $scope.current = id;
        $scope.content = $scope.items[id].content;
      };
      var docsModal = $modal({scope: $scope, template: 'partials/modal/docs.tpl.html', animation: 'scale-fade', position: 'center'});
    };

    $scope.about = function() {
      $scope.title = 'About';
      $scope.content = 'UI for libsymath-js based on node-webkit.';
      var docsModal = $modal({scope: $scope, template: 'partials/modal/about.tpl.html', animation: 'scale-fade', position: 'center'});
    };

  }]);