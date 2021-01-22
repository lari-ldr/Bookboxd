const supertest = require('supertest');
const chai = require('chai');
const chaiExclude = require('chai-exclude');
const setupApp = require('../../src/app');

global.setupApp = setupApp;
global.supertest = supertest;
global.expect = chai.expect;
global.chaiExclude = chaiExclude;

chai.use(chaiExclude);