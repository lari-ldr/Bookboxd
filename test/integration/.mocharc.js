'use strict'

module.exports = {
    require: '@babel/register',
    file: ['test/integration/helpers.js', 'test/integration/global.js'],
    reporter: 'spec',
    slow: 5000,
    timeout: 5000
}