'use strict'

require('babel-register')({
	presets: ['react', 'es2015'],
	plugins: ['transform-object-rest-spread']
})

var server = require('./server');