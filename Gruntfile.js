/**
* Automatizacion de tareas de despliegue aplicacion front-end
*
* Tipo: Gruntfile
* Doc: http://gruntjs.com/
* Autor: 
*   - Maciej Ruckgaber <maciekrb@gmail.com>
**/

module.exports = function(grunt){
  'use strict';

  // Cargar modulos de tarea de grunt automaticamente
  require('load-grunt-tasks')(grunt);

  // Medicion de tiempo de ejecucion de tareas 
  require('time-grunt')(grunt);

  /**************************************************************************************************
  *  Configuracion de tareas
  **************************************************************************************************/
  grunt.initConfig({
    // Variables de configuracion generales
    yeoman: {
      app: 'src', // ruta fuentes de la aplicacion
      dist: 'dist' // ruta archivos de distribucion
    },

    // Ejecuta alunas tareas en paralelo
    concurrent: {
      server: [
        'compass:server',
        'copy:styles',
        'sass'
      ],
      test: [
        'compass',
        'copy:styles'
      ],
      dist: [
        'compass:dist',
        'copy:dist',
        'sass',
        'imagemin'
      ]
    },

    // Limpieza de directorios temorales y distribucion
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Copia diferentes assets de la aplicacion
    copy: {
      dist: {
        files: [
          // Favicon independiente
          {
            dest: '<%= yeoman.dist %>/images/favicon.ico',
            src: [
              'src/assets/images/favicon.ico'
            ]
          },
          // Imagenes
          {
            expand: false,
            dest: '<%= yeoman.dist %>/images',
            src: [
              '.tmp/generated/*'
            ]
          },
          // Fuentes
          {
            expand: true,
            flatten: true,
            filter: 'isFile',
            dest: '<%= yeoman.dist %>/fonts/',
            src: [
              'src/assets/fonts/*.{woff,otf,ttf,svg,eot}',
              'vendor/font-awesome/fonts/*.{woff,otf,ttf,svg,eot}'
            ]
          },
          // Imagenes vendor
          {
            expand: true,
            flatten: true,
            dest: '<%= yeoman.dist %>/styles/',
            src: [
              'vendor/select2/*.{gif,png,jpg}'
            ]
          }
        ]
      },

      // otros estilos a temporal de desarrollo
      styles: {
        expand: true,
        flatten: true,
        dest: '.tmp/styles/',
        src: [
          // Ace IE specific styles (not buildable with usemin because of IE if)
          'themes/ace/assets/css/uncompressed/font-awesome.css',
          'themes/ace/assets/css/uncompressed/font-awesome-ie7.css'
        ]
      }
    },

    // Tareas compass
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/assets/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/assets/images',
        javascriptsDir: '<%= yeoman.app %>/app',
        fontsDir: '<%= yeoman.app %>/assets/fonts',
        //importPath: 'vendor',
        httpImagesPath: '/assets/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/assets/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Saas build para foundation
    sass: {
      options: {
        loadPath: ['vendor/foundation/scss'],
        scss: true,
        sourcemap: 'none',
        style: 'expanded'
      },
      dist: {
        files: {
          '.tmp/styles/foundation.css': 'src/assets/foundation/settings.scss'
        }
      }
    },

    // Servidor local de desarrollo
    connect: {
      options: {
        port: 9000,
        // Cambiar a '0.0.0.0' para acceder al servidor desde otra maquina
        hostname: '127.0.0.1',
        livereload: 35729
      },
      rules: [],
      proxies: [
        // Proxy servicios REST Rails
        {
          context: ['/api'], //reemplazar por prefijo servicios Rails
          host: 'localhost',
          port: 3000,
          https: false,
          changeOrigin: true,
          xforward: false,
          ws: false
          /*headers: {
          }*/
        }
      ],
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>',
            'themes',
            'vendor'
          ],
          middleware: function(connect, options){
            var middlewares = [];

            // Rewrite rules
            var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
            middlewares.push(rewriteRulesSnippet);

            // Setup the proxy
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            middlewares.push(proxy);

            if(!Array.isArray(options.base)){
              options.base = [options.base];
            }

            var directory = options.directory || options.base[options.base.length - 1];
            options.base.forEach(function(base){
              // Serve static files.
              middlewares.push(connect['static'](base));
            });

            // Make directory browse-able.
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
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
      dist: {
        options: {
          base: '<%= yeoman.dist %>',
          middleware: function(connect, options){
            var middlewares = [];

            // Rewrite rules
            var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
            middlewares.push(rewriteRulesSnippet);

            // Setup the proxy
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            middlewares.push(proxy);

            if(!Array.isArray(options.base)){
              options.base = [options.base];
            }

            var directory = options.directory || options.base[options.base.length - 1];
            options.base.forEach(function(base){
              // Serve static files.
              middlewares.push(connect['static'](base));
            });

            // Make empty directories browsable.
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        }
      }
    },
    
    // Correccion de estilo
    jshint: {
      options: {
        curly: true, 
        strict: true,
        unused: true,
        globals: {
          "window": true,
          "angular": true,
          "document": true, 
          "console": true,
          "gapi": true
        },
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/{,*/}*.js'
      ],
      test: {
        options: {
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Ajusta la sintaxis de dependency injection de angular para que los archivos
    // puedan ser minificados sin causar errores de sintaxis
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: 'scripts.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Versionamiento de archivos de distribucion
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/main.css'
            //'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            //'<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Concatena y minifica archivos segun declaracion de bloques usemin en archivos HTML
    useminPrepare: {
      html: ['<%= yeoman.app %>/index.html'],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Realiza reescrituras con base en configuracion useminPrepare
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // Produce archivos de imagen minificados
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    // Minifica plantillas HTML 
    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
          // removeCommentsFromCDATA: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Monitorea cambios en los archivos y ejecuta tareas basadas en los cambios
    watch: {
      compass:{
        files: ['<%= yeoman.app %>/assets/styles/{,*/}*.scss'],
        tasks: ['compass']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      js: {
        files: ['{.tmp,<%= yeoman.app %>}/**/*.js'],
        tasks: ['newer:jshint:all']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/app/**/*.tpl.html',
          '<%= yeoman.app %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }

  });

  /**************************************************************************************************
  *  Registro de tareas
  **************************************************************************************************/

  // Modo de desarrollo
  grunt.registerTask('serve', function(target){
    var connectTask = grunt.config.get('connect');

    if(target === 'dist'){
      //connectTask.rules.push({from: '^/assets/images/(.*)$', to: '/images/$1'});
      //connectTask.rules.push({from: '^/templates/(.*)$', to: '/angular-ui-bootstrap/templates/$1'});
      grunt.config.set('connect', connectTask);

      return grunt.task.run([
        'configureRewriteRules',
        'configureProxies:dist',
        'build',
        'connect:dist:keepalive'
      ]);
    }

    // Se agrega dinamicamente una regla de reescritura para devel
    connectTask.rules.push({from: '^/fonts/(.*)$', to: '/assets/fonts/$1'});
    connectTask.rules.push({from: '^/images/(.*)$', to: '/assets/images/$1'});
    //connectTask.rules.push({from: '^/templates/common.js$', to: '/common/templates.js'});
    grunt.config.set('connect', connectTask);

    grunt.task.run([
      'clean:server',
      // 'concurrent:server',
        'compass:server',
        'copy:styles',
        'sass',
      'configureRewriteRules',
      'configureProxies:livereload',
      'connect:livereload',
      'watch'
    ]);
  });

  // Modo unittests
  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    //'autoprefixer',
    'connect:test',
    'karma'
  ]);

  // Modo de creación de distribución
  grunt.registerTask('build', [
    'clean:dist',
    // 'concurrent:dist',
        'compass:dist',
        'copy:dist',
        'sass',
        'imagemin',
    'useminPrepare',
    //'autoprefixer',
    'copy:dist',
    'concat:generated',
    'cssmin:generated',
    'ngAnnotate',
    'uglify:generated',
    'htmlmin:dist',
    'rev',
    'usemin'
  ]);

  // Modo predeterminado
  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};