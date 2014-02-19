'use strict';
grunt.loadNpmTasks('grunt-node-webkit-builder');
grunt.registerTask('default', ['nodewebkit']);
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
}});
/*
grunt.loadNpmTasks('grunt-node-webkit-builder');
grunt.registerTask('default', ['nodewebkit']);

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    nodewebkit: {
      options: {
        build_dir: './build',
        mac_icns: './src/favicon.icns'
      },
      src: './src/***'
    },

  });
};*/