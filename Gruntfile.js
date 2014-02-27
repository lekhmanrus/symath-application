'use strict';
 
module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask('npm-install', 'install the application dependencies', function() {
    // adapted from http://www.dzone.com/snippets/execute-unix-command-nodejs
    var exec = require('child_process').exec,
        sys  = require('sys');

    function puts(error, stdout, stderr) { console.log(stdout); sys.puts(stdout) }

    // assuming this command is run from the root of the repo
    exec('npm install', {cwd: './src'}, puts);
  });
  
  grunt.initConfig({ });
  
  grunt.config.set('nodewebkit', {
    options: {
      build_dir: './build',
      mac: false,
      win: true,
      linux32: true,
      linux64: true,
      version: '0.9.1'
    },
    src: ['./src/**/*']
  });
  
  grunt.config.set('clean', {
    MathJax: [ 'src/lib/MathJax/fonts', 'src/lib/MathJax/unpacked' ]
  });
  
  grunt.registerTask('default', ['npm-install', 'clean', 'nodewebkit']);
};