'use strict';

/* Directives */


angular.module('symathApp.directives', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}])

.directive('appSymathSave', [function() {
  return function(scope, elm, attrs) {
    $(elm).on('change', function(evt) {
      var fs = require('fs'),
          gui = require('nw.gui'),
          win = gui.Window.get(),
          filepath = $(this).val();
    win.capturePage(function(img) {
      var svg = $('.MathJax_SVG_Display svg'),
          c = document.createElement('canvas');
      if(svg.offset()) {
        c.width  = svg.width();
        c.height = svg.height();
        var ctx = c.getContext("2d");
        var image = new Image();
        image.src = img;
        image.onload = function() {
          var sourceX = svg.offset().left;
          var sourceY = svg.offset().top;
          var sourceWidth = svg.width();
          var sourceHeight = svg.height();
          var destWidth = sourceWidth;
          var destHeight = sourceHeight;
          var destX = c.width / 2 - destWidth / 2;
          var destY = c.height / 2 - destHeight / 2;
          ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
          var imgdata = c.toDataURL('image/jpeg');
          var base64Data = imgdata.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
          console.log(filepath);
          fs.writeFile(filepath, base64Data, 'base64', function(err) {
            if(err)
              throw err;
          });
        };
      }
    }, { format: 'jpeg', datatype: 'datauri' });
    });
  };
}])

.directive('appSymathInput', ['$timeout', function($timeout) {
  return function(scope, elm, attrs) {
    $(elm).on('keydown', function(event) {
      event = event || window.event
      if((event.shiftKey == false && ((event.which || event.charCode) == 61 || (event.which || event.charCode) == 187)) || // =
          (event.ctrlKey == true && (event.which || event.charCode) == 69) || // ctrl+e
          (event.which || event.charCode) == 13
        ) {
        $timeout(function() {
          scope.calculate();
        });
        return false;
      }
      else if(event.ctrlKey == true && (event.which || event.charCode) == 83) { // ctrl+s
        $timeout(function() {
          scope.save();
        });
        return false;
      }
      else if(event.ctrlKey == true && (event.which || event.charCode) == 82) { // ctrl+r
        $timeout(function() {
          scope.clear();
        });
        return false;
      }
      else if((event.ctrlKey == true && (event.which || event.charCode) == 72) || // ctrl+h
          (event.keyCode == 112) // F1
        ) {
        $timeout(function() {
          scope.docs();
        });
        return false;
      }
      else if(event.ctrlKey == true && (event.which || event.charCode) == 73) { // ctrl+i
        $timeout(function() {
          scope.about();
        });
        return false;
      }
    });
  };
}]);