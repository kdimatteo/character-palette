module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
     connect: {
      server: {
        options: {
          base:       './',
          port:       4201,
          livereload: true
        }
      }
    },
    watch: {
      files: ['src/**'],
      options: {
        livereload:        4202,
        interrupt:         true,
        livereloadOnError: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect', 'watch']);
};