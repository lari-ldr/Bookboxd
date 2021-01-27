import supertest from 'supertest';
import chai from 'chai';
import chaiExclude from 'chai-exclude';
import setupApp from '../../src/app';

global.setupApp = setupApp;
global.supertest = supertest;
global.expect = chai.expect;
global.chaiExclude = chaiExclude;

chai.use(chaiExclude);
