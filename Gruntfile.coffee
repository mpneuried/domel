module.exports = (grunt) ->
	# Project configuration.
	grunt.initConfig
		pkg: grunt.file.readJSON('package.json')
			
		browserify:
			base:
				options:
					transform: ["coffeeify"]
					browserifyOptions:
						extensions: ".coffee"
						standalone: "domel"
						external: true
				files:
					'lib/main.js': "_src/lib/main.coffee"
			dev:
				options:
					watch: true
					keepAlive: true
					transform: ["coffeeify"]
					browserifyOptions:
						extensions: ".coffee"
						standalone: "domel"
						external: true
				files:
					'lib/main.js': "_src/lib/main.coffee"
					
		uglify:
			options:
				banner: '/*!<%= pkg.name %> - v<%= pkg.version %>\n*/\n'
			base:
				files:
					"dist/main.min.js": [ "lib/main.js" ]
		
		copy:
			options:
				banner: '/*!<%= pkg.name %> - v<%= pkg.version %>\n*/\n'
			base:
				files:
					"dist/main.js": [ "lib/main.js" ]
		
		clean:
			base:
				src: [ "lib", "test" ]

		
		mochacli:
			options:
				require: [ "should" ]
				reporter: "spec"
				bail: false
				timeout: 3000
				slow: 3

			main:
				src: [ "test/main.js" ]
				options:
					env:
						severity_heartbeat: "debug"
		
		
		docker:
			serverdocs:
				expand: true
				src: ["_src/**/*.coffee", "README.md"]
				dest: "_docs/"
				options:
					onlyUpdated: false
					colourScheme: "autumn"
					ignoreHidden: false
					sidebarState: true
					exclude: false
					lineNums: true
					js: []
					css: []
					extras: []
		

	# Load npm modules
	grunt.loadNpmTasks "grunt-contrib-copy"
	grunt.loadNpmTasks "grunt-contrib-uglify"
	grunt.loadNpmTasks "grunt-contrib-clean"
	grunt.loadNpmTasks "grunt-mocha-cli"
	grunt.loadNpmTasks "grunt-docker"
	grunt.loadNpmTasks "grunt-browserify"

	# just a hack until this issue has been fixed: https://github.com/yeoman/grunt-regarde/issues/3
	grunt.option('force', not grunt.option('force'))
	
	# ALIAS TASKS
	grunt.registerTask "watch", "browserify:dev"
	grunt.registerTask "default", "build"
	grunt.registerTask "docs", "docker"
	grunt.registerTask "clear", [ "clean:base" ]
	grunt.registerTask "test", [ "mochacli:main" ]

	# build the project
	grunt.registerTask "build", [ "clear", "browserify:base", "uglify:base", "copy:base" ]
	grunt.registerTask "build-dev", [ "clear", "browserify:base", "docs", "test" ]
