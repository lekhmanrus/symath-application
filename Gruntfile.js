'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    nodewebkit: {
      options: {
        build_dir: './build',
        mac_icns: './src/favicon.icns'
      },
      src: './src/**/*'
    },

  });

  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-release');
  //grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  //grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  //grunt.registerTask('default', ['jshint', 'test']);

};