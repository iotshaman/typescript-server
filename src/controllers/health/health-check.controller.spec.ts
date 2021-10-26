/* istanbul ignore file */
import 'reflect-metadata';
import 'mocha';
import * as sinon from 'sinon';
import * as express from "express";
import { expect } from 'chai';
import { HealthCheckController } from './health-check.controller';

describe('ConfigService', () => {

  var sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be created', () => {
    let configService = new HealthCheckController(express());
    expect(configService).not.to.be.null;
  });

  it('getStatus should return health check', (done) => {
    let configService = new HealthCheckController(express());
    let mockResponse: any = {
			json: (data) => {
				expect(data.status).to.equal('healthy');
				done();
			}
    }
		configService.getStatus(null, mockResponse, null);
  });

})