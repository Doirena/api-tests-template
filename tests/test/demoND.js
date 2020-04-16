require('mocha');
let chai = require('chai'), chaiHttp = require('chai-http');
let settings = require('../modules/runtime/settings');
chai.use(chaiHttp);
describe('Test Group', function () {
  let expect = settings.expect;
  before('Before', function () {
    console.log("Ivyksta pries testa");
  });
  after("After", function () {
    console.log("Ivyksta po testa");
  });
  describe('Test suite', function () {
    it('Test step 1', async function () {
    
      // Given
      // When
      // Then
      expect("A").to.equal("A");
    });
    it('Test 2+2=4', async function () {
      // Given
      let fvar=2;
      let svar=2;
      // When 
      let sum = fvar+svar
      // Then
      expect(sum).to.equal(4);
    });
    it('Test "1010"+10="101010"', async function () {
      let sum = "1010"+10
      expect(sum).to.equal("101010");
    });
    it('Test "100010"-10=100000', async function () {
      let sum = "100010"-10
      expect(sum).to.equal(100000);
    });
    it('Test 17*35=595', async function () {
      let dau = 17*35
      expect(dau).to.equal(595);
    });
    it('Test 1000/2=500', async function () {
      let dal = 1000/2
      expect(dal).to.equal(500);
    });
    it('Test 10 + "1"="101"', async function () {
      let sum = 10 + "1"
      expect(sum).to.equal("101");
    });

  });

});