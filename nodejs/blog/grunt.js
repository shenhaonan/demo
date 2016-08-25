module.exports = function (grunt) {

grunt.initConfig({
    critical: {
        dist: {
            options: {
                base: './'
            },
            // The source file
            src: 'page.html',
            // The destination file
            dest: 'result.html'
        }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-critical');

  // Default tasks.
  grunt.registerTask('default', ['critical']);
};
