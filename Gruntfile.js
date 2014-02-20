'use strict';
 
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.initConfig({
    nodewebkit: {
      options: {
        build_dir: './build',
        mac_icns: './src/favicon.icns',
        mac: false,
        win: false,
        linux32: false,
        linux64: true
      },
      src: ['./src/**/*']
    }
  });
  grunt.registerTask('default', ['nodewebkit']);
};