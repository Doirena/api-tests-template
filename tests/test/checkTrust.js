require('mocha');
let settings = require('../modules/runtime/settings');
let env = require('../modules/runtime/environments');
let user = require('../modules/apis/users');
let utils = require('../modules/runtime/utils');
let chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('CHECK TRUST', function () {
  let data = settings.runtimeData;
  let options = settings.options;
  let expect = settings.expect;
  this.timeout(options.apiCallTimeout);

  before('Use config from server', function () {
    settings.setEnvironment('dev');
    return env.loadAndSetConfig();
  });

  after("Check Trsust cleanup.", function () {
  });

  describe('Check Trust Test Suite', function () {

    it('Should be able to get user by phone number ', async function () {
      // Given
      const code='370';
      const phone='67983554'
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('address');
      expect(response.body.phone_number).to.equal('67983554');
    });

    it('Should not be able to get user when country code is invalid ', async function () {
      // Given
      const code='99999';
      const phone='67983554'
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(603) country_code in path should be at most 4 chars long');
    });

    it('Should not be able to get user when phone is invalid ', async function () {
      // Given
      const code='370';
      const phone='6798355'
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('PHONE_NUMBER_INVALID');
      expect(response.body.message).to.equal('phone number invalid');
    });

    it('Should not be able to get user when phone is empty ', async function () {
      // Given
      const code='370';
      const phone=''
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(404);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(404) path /mth/v1/users/phone/370/ was not found');
    });

    it('Should not be able to get user when country code is empty ', async function () {
      // Given
      const code='';
      const phone='67983554'
      // When
      let response = await user.get(code, phone);
      // Then
      expect(response.statusCode).to.equal(404);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(404) path /mth/v1/users/phone/67983554 was not found');
    });

















  });
  
});
