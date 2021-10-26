/* istanbul ignore file */
import 'mocha';
import * as fs from 'fs';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { ConfigService } from './config.service';

describe('ConfigService', () => {

  var sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be created', () => {
    let configService = new ConfigService();
    expect(configService).not.to.be.null;
  });

  it('getConfig should raise exception if error found', (done) => {
    let configService = new ConfigService();
    sandbox.stub(fs, 'readFile').yields(new Error("test error"));
    configService.getConfig("config.json")
      .then(_ => { throw new Error("Should have raised exception.") })
      .catch(ex => { 
        expect(ex.message).to.equal("test error");
        done();
      });
  });

  it('getConfig should return file data', (done) => {
    let configService = new ConfigService();
    sandbox.stub(fs, 'readFile').yields(null, JSON.stringify({success:true}));
    configService.getConfig("config.json").then((rslt: any) => {
      expect(rslt.success).to.be.true;
      done();
    });
  });

})