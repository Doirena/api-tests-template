require("mocha");
let settings = require("../modules/runtime/settings");
let env = require("../modules/runtime/environments");
let user = require("../modules/apis/users");
let utils = require("../modules/runtime/utils");
let chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("USERS", function () {
  let data = settings.runtimeData;
  let options = settings.options;
  let expect = settings.expect;
  this.timeout(options.apiCallTimeout);

  before("Use config from server", function () {
    settings.setEnvironment("dev");
    return env.loadAndSetConfig();
  });

  this.afterEach("Data cleanup.", function () {
    data.user.country_code_iso = "EE";
    data.user.email = utils.randomEmail();
    data.user.first_name =
      utils.randomString(1, "QWERTYUIOPASDFGHJKLZXCVBNMĄČĘĖĮŠŲŪŽ") +
      utils.randomString(20, "qwertyuiopasdfghjklzxcvbnmąčęėįšųūž");
    data.user.last_name =
      utils.randomString(1, "QWERTYUIOPASDFGHJKLZXCVBNMĄČĘĖĮŠŲŪŽ") +
      utils.randomString(35, "qwertyuiopasdfghjklzxcvbnmąčęėįšųūž");
  });

  describe("Users Test Suite", function () {
    it("Should be able to update user", async function () {
      // Given
      data.user.address = utils.randomString(
        120,
        "QWERTYUIOPASDFGHJKLZXCVBNMĄČĘĖĮŠŲŪŽq -wertyuiopasdfghjklzxcvbnmąčęėįšųūž1234567890/+"
      );
      data.user.country_code_iso = randomContCode();
      data.user.email = utils.randomEmail();
      data.user.first_name =
        utils.randomString(1, "QWERTYUIOPASDFGHJKLZXCVBNMĄČĘĖĮŠŲŪŽ") +
        utils.randomString(20, "qwertyuiopasdfghjklzxcvbnmąčęėįšųūž");
      data.user.last_name =
        utils.randomString(1, "QWERTYUIOPASDFGHJKLZXCVBNMĄČĘĖĮŠŲŪŽ") +
        utils.randomString(35, "qwertyuiopasdfghjklzxcvbnmąčęėįšųūž");
      // When
      let response = await user.put();

      console.log(response.body);

      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property("address");
      expect(response.body.phone_number).to.equal("62614370");

      expect(response.body.address).to.equal(data.user.address);
      expect(response.body.country_code_iso).to.equal(
        data.user.country_code_iso
      );
      expect(response.body.email).to.equal(data.user.email);
      expect(response.body.first_name).to.equal(data.user.first_name);
      expect(response.body.last_name).to.equal(data.user.last_name);
    });

    it("Should not be able to update user when email is invalid", async function () {
      // Given
      data.user.email = "notv@alid.";
      // When
      let response = await user.put();

      //      console.log(response.body);

      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property("code");
      expect(response.body.code).to.equal("VALIDATION_ERROR");
      expect(response.body.message).to.equal(
        `(601) email in body must be of type email: "${data.user.email}"`
      );
    });

    it("Should not be able to update user when country code is invalid", async function () {
      // Given
      data.user.country_code_iso = "bbbb";
      // When
      let response = await user.put();

      //      console.log(response.body);

      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property("code");
      expect(response.body.code).to.equal("VALIDATION_ERROR");
      expect(response.body.message).to.equal("not valid country code ISO");
    });

    it("Should not be able to update user when first name is invalid", async function () {
      // Given
      data.user.first_name = ".,!@#$%&*{}[]-+=_";
      // When
      let response = await user.put();

      //      console.log(response.body);

      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property("code");
      expect(response.body.code).to.equal("INVALID_FIRST_NAME");
      expect(response.body.message).to.equal(
        "(605) first_name in body should match 'only letters'"
      );
    });

    it("Should not be able to update user when last name is invalid", async function () {
      // Given
      data.user.last_name = ".,!@#$%&*{}[]-+=_";
      // When
      let response = await user.put();

      //      console.log(response.body);

      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property("code");
      expect(response.body.code).to.equal("INVALID_LAST_NAME");
      expect(response.body.message).to.equal(
        "(605) last_name in body should match 'only letters'"
      );
    });

    it("Should not be able to update user when address is too long", async function () {
      // Given
      data.user.address = utils.randomString(256, "abcd");
      // When
      let response = await user.put();

      //      console.log(response.body);

      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property("code");
      expect(response.body.code).to.equal("VALIDATION_ERROR");
      expect(response.body.message).to.equal(
        "(603) address in body should be at most 255 chars long"
      );
    });
  });
});
