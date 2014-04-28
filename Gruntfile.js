// Generated on 2014-04-25 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: [
        '/**',
        ' * <%= pkg.description %>',
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * @link <%= pkg.homepage %>',
        ' * @author <%= pkg.author %>',
        ' * @license MIT License, http://www.opensource.org/licenses/MIT',
        ' */'
      ].join('\n')
    },

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      appDist: 'dist-app',
      dist: 'dist',
      staging: 'staging'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      dev: {
        files: [
          '<%= yeoman.app %>/scripts/{,*/}*.js',
          'test/spec/{,*/}*.js'
        ],
        tasks: [
          'newer:jshint:all',
          'newer:jshint:test',
          'karma'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      appDist: {
        options: {
          base: '<%= yeoman.appDist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ],
      gruntfile: [
        'Gruntfile.js'
      ],
      source: [
        '<%= yeoman.app %>/scripts/services/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      },
      dist: {
        src: ['<%= yeoman.dist %>/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      appDist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.appDist %>/*',
            '!<%= yeoman.appDist %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      staging: '<%= yeoman.staging %>',
      dist: '<%= yeoman.dist %>'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      appDist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: '<%= yeoman.app %>/'
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: '<%= yeoman.app %>/bower_components/'
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      appDist: {
        options: {
          generatedImagesDir: '<%= yeoman.appDist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      appDist: {
        files: {
          src: [
            '<%= yeoman.appDist %>/scripts/{,*/}*.js',
            '<%= yeoman.appDist %>/styles/{,*/}*.css',
            '<%= yeoman.appDist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.appDist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.appDist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.appDist %>/{,*/}*.html'],
      css: ['<%= yeoman.appDist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.appDist %>']
      }
    },

    // The following *-min tasks produce minified files in the appDist folder
    cssmin: {
      options: {
        root: '<%= yeoman.app %>'
      }
    },

    imagemin: {
      appDist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.appDist %>/images'
        }]
      }
    },

    svgmin: {
      appDist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.appDist %>/images'
        }]
      }
    },

    htmlmin: {
      appDist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.appDist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.appDist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      appDist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      },
      staging: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.staging %>',
          src: '<%= pkg.name %>.js',
          dest: '<%= yeoman.staging %>/ngmin'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      appDist: {
        html: ['<%= yeoman.appDist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      appDist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.appDist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.appDist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.staging %>/ngmin',
          dest: '<%= yeoman.dist %>',
          src: [
            '<%= pkg.name %>.js'
          ]
        }]
      },
      staging: {
        files: [{
          expand: true,
          dot: true,
          flatten: true,
          filter: 'isFile',
          cwd: '<%= yeoman.app %>/scripts',
          dest: '<%= yeoman.staging %>/',
          src: [
            '**'
          ]
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      appDist: [
        'compass:appDist',
        'imagemin',
        'svgmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   appDist: {
    //     files: {
    //       '<%= yeoman.appDist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },

    //Minify the release code
    uglify: {
      dist: {
        options: {
          sourceMap: '<%= yeoman.dist %>/<%= pkg.name %>.map'
        },
        files: {
          '<%= yeoman.dist %>/<%= pkg.name %>.min.js': ['<%= yeoman.dist %>/<%= pkg.name %>.js']
        }
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: [
          '<%= meta.banner %>',
          '(function(){',
          '\t\'use strict\';',
          ''
        ].join('\n'),
        footer: '\n}());',
        process: function(src){
          return src
              .replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
              .replace(/(^|\n)/g, '\n\t');
        }
      },
      staging: {
        src: [
          '<%= yeoman.staging %>/stateManager.js'
        ],
        dest: '<%= yeoman.dist %>/<%= pkg.name %>.js'
      }
    },

    //bumps the version before a release
    bump: {
      options: {
        files:          ['package.json',  'bower.json'],
        updateConfigs:  ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'dist'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('dev', 'watch:dev');

  grunt.registerTask('serve', function (target) {
    if (target === 'appDist') {
      return grunt.task.run(['build', 'connect:appDist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test-app', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build-app', [
    'clean:appDist',
    'bowerInstall',
    'useminPrepare',
    'concurrent:appDist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:appDist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('add-dist-git', function(){
    return exec('git add dist').then(function (result) {
      if (result.stdout.trim() !== ''){
        throw 'Unable to add dist directory';
      }
    });
  });

  grunt.registerTask('compile', [
    'clean',            //Runs all clean tasks to clean staging and dist directories
    'copy:staging',     //Copies files to the staging directory
    'concat',           //Concatenates specified files in the staging directory
    'ngmin',            //Makes concatenated Angular code in staging directory min-safe
    'copy:dist',        //Copies concatenated, min-safe code to dist directory
    'jshint:dist',      //Lints the code in dist directory
    'uglify',           //Minifies the code in dist directory and creates a source map
    'clean:staging'     //Removes the staging directory
  ]);

  grunt.registerTask('unit-test', [
    'lint',             //Runs jshint on development code (src, test, gruntfile)
    'karma'             //Runs unit-test using karma
  ]);

  grunt.registerTask('e2e-test', []);

  grunt.registerTask('lint', [
    'jshint:gruntfile', //Lints the gruntfile
    'jshint:source',    //Lints all the files in /app/scripts
    'jshint:test'       //Lints all the test code in /test/spec using .jshintrc file in test directory
  ]);

  grunt.registerTask('build', [
    'unit-test',        //Runs unit tests
    'e2e-test',         //Runs end-to-end tests
    'compile'           //Generates distributable files
  ]);

  grunt.registerTask('release', function (releaseType) {

    if (['major', 'minor', 'patch'].indexOf(releaseType) === -1) {
      return grunt.util.error('Release type was ' + releaseType + ' but it must be either major, minor, or patch');
    }

    promising(this,
        ensureCleanMaster().then(function () {
          return grunt.task.run(
                  'bump-only:' + releaseType,
              'build',
              'add-dist-git',
              'bump-commit'
          );
        })
    );
  });

  grunt.registerTask('ci', [
    'build'            //test and compile the code
  ]);

  grunt.registerTask('develop', [
    'watch:dev'             //Watches /app/scripts and /test/spec for changes and runs unit-test task
  ]);

  grunt.registerTask('default', [
    'develop'           //Shortcut to develop task
  ]);

  // Helpers for custom tasks, mainly around promises / exec
  var exec = require('faithful-exec');

  function promising(task, promise) {
    var done = task.async();
    promise.then(function () {
      done();
    }, function (error) {
      grunt.log.write(error + '\n');
      done(false);
    });
  }

  function ensureCleanMaster() {
    return exec('git symbolic-ref HEAD').then(function (result) {
      if (result.stdout.trim() !== 'refs/heads/master') {
        throw 'Not on master branch, aborting';
      }
      return exec('git status --porcelain');
    }).then(function (result) {
      if (result.stdout.trim() !== '') {
        throw 'Working copy is dirty, aborting';
      }
    });
  }

};
