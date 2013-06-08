
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    component: grunt.file.readJSON('component.json'),

    clean: ['dist', 'test/tests.tap'],

    concat: {
      options: {
        banner:'/*!\n'+
               ' * Recipe.js  Cook your javascript with recipe.js\n'+
               ' * Author     sideroad\n'+
               ' * License    MIT\n'+
               ' *\n'+
               ' * Version    <%= component.version %>\n'+
               ' * https://github.com/sideroad/recipe/\n'+
               ' */\n'
      },
      main: {
        files: {
          'dist/recipe.unpack.js': ['lib/head.load.js', 'src/recipe.js']
        }
      }
    },

    min: {
      main: {
        files: {
          'dist/recipe.js': ['dist/recipe.unpack.js']
        }
      }
    },

    jshint: ['src/recipe.js'],

    testem: {
      options: {
        launch_in_ci: ['safari', 'chrome', 'firefox', 'PhantomJS']
      },
      main: {
        files: {
          'test/tests.tap': ['test/*.html']
        }
      }
    },

    'qunit-cov': {
      main: {
        minimum: 0.9,
        srcDir: 'src',
        depDirs: ['lib', 'test'],
        outDir: 'cov',
        testFiles: ['test/*.html']
      }
    },

    plato: {
      main: {
        files: {
          'metrics': ['src/recipe.js']
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-testem');
  grunt.loadNpmTasks('grunt-qunit-cov');
  grunt.loadNpmTasks('grunt-plato');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['clean', 'concat', 'min', 'jshint', 'testem', 'qunit-cov', 'plato']);
  grunt.registerTask('test', ['clean', 'testem', 'qunit-cov']);

};
