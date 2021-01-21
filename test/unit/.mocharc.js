'use strict'

module.exports = {
    require: ['@babel/register', 'test/unit/helpers.js'],
    reporter: 'spec',
    slow: 5000,
    timeout: 5000
}