'use strict';
 
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.initConfig({
    nodewebkit: {
      options: {
        build_dir: './build',
        mac_icns: './src/favicon.icns',
        mac: true,
        win: true,
        linux32: true,
        linux64: true
      },
      src: ['./src/**/*']
    }
  });
  grunt.registerTask('default', ['nodewebkit']);
};