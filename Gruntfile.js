const sass = require('node-sass');

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    // Plugins
    //
    // Assemble
    assemble: {
      options: {
        production: true,
        data: 'src/tokens/*.json',
        assets: 'dist/assets',
        layoutdir: 'src/tpl/layouts',
        partials: [
          'src/tpl/partials/*.hbs',
          'src/tpl/partials/**/*.hbs'
        ]
      },
      site: {
        options: {
          layout: 'default.hbs'
        },
        files: [{
          expand: true,
          cwd: 'src/tpl/pages',
          src: ['*.hbs'],
          dest: 'dist/'
        }]
      }
    },

    // HTML Minify
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          src: ['dist/*.html'],
          dest: ''
        }]
      }
    },

    // Image minify
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/gfx/',
          src: ['*.{png,jpg,svg}'],
          dest: 'dist/assets/gfx/'
        }]
      }
    },

    // Uglify for javascript
    uglify: {
      options: {
        report: 'gzip'
      },
      my_target: {
        files: {
          'dist/assets/js/app.min.js': 'src/js/app.js'
        }
      }
    },

    // Sass
    sass: {
      options: {
        implementation: sass
      },
      dist: {
        files: {  
          'dist/assets/css/styles.min.css': 'src/scss/index.scss'
        }
      }
    },

    // CSS Minify
    cssmin: {
      options: {
        report: 'gzip'
      },
      target: {
        files: {
          'dist/assets/css/styles.min.css': 'dist/assets/css/styles.min.css'
        }
      }
    }

  });

  // Load project tasks
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Grunt tasks
  grunt.registerTask('default', ['assemble', 'htmlmin', 'imagemin', 'sass', 'cssmin', 'uglify']);

};