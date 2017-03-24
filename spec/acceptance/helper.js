import request from 'supertest';
import chai from 'chai';
import app from '../../app/app';

global.app = app;
global.request = request(app);
global.expect = chai.expect;
