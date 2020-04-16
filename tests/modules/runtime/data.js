let utils = require('./utils');

(function () {
  // define global data and default values - subject to change during runtime
  let data = {
    global: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODg2Njg4NjgsImlhdCI6MTU4NjA3Njg2OCwibmJmIjoxNTg2MDc2ODY4LCJpZCI6NjYyOSwiY2lkIjo2NjQ5NCwiZGV2X2lkIjoic3RyaW5nIn0.6xfV3Gy39oENP38CysH7yFvMH0zGLeV3E5DlP3qIBt8'
    },
    user: {
      address:"Gedimino g. 19, Vilnius",
      country_code_iso:"LT",
      email: "barkauskaite.dovile@gmail.com",
      first_name: "Dovile",
      last_name: "B",
      device_id: "111"
    }
  };
  exports.getDefaultEmptyValue = function () {
    return null;
  };
  exports.getAll = function () {
    return data;
  };
})();
