let utils = require("./utils");

(function () {
  // define global data and default values - subject to change during runtime
  let data = {
    global: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODg3NTE1NzgsImlhdCI6MTU4NjE1OTU3OCwibmJmIjoxNTg2MTU5NTc4LCJpZCI6NjYzMCwiY2lkIjo2NjQ5NSwiZGV2X2lkIjoic3RyaW5nIn0.-8l5flNvm_PeywZUk0R4c-9PUWnGKWCBzAZfu_UbQcY",
    },
    user: {
      address: "paupio 15, Vilnius, Lietuva",
      country_code_iso: "LT",
      email: "sadsad@gmail.com",
      country_code: "370",
      first_name: "Vytautas",
      last_name: "Gra",
      device_id: "null",
      phone_number: "62614370",
    },
  };
  exports.getDefaultEmptyValue = function () {
    return null;
  };
  exports.getAll = function () {
    return data;
  };
})();
