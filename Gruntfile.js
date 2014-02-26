'use strict';
 
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.initConfig({
    nodewebkit: {
      options: {
        build_dir: './build',
        mac: false,
        win: true,
        linux32: true,
        linux64: true,
        version: '0.9.2'
      },
      src: ['./src/**/*']
    }
  });
  grunt.registerTask('default', ['nodewebkit']);
};