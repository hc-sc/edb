import { assert } from 'chai';
//import { jsdom } from 'mocha-jsdom';

var jsdom = require('mocha-jsdom');
var module = require('angular-mocks').module;
var inject = require('angular-mocks').inject;


import config from '../../app/app.constants';
import app from '../../app';
import { FileSystemService } from './fs.service';

describe('fsservice', () => {

  jsdom();

  beforeEach(module('app'));
/*
  describe('fsservice', () => {
    it('should ....', inject((_$service_) => {
      var fsservice = _$service_(FileSystemService);
      assert.equal(config.projectsFoldername, fsservice.getBaseURL);
    }));
  });
*/  
});