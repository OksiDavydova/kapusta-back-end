var axios = require("axios");
var data = JSON.stringify({
  email: "wisart9@gmail.com",
  password: " ",
});

var config = {
  method: "get",
  url: "http://localhost:3030/api/v1/transactions/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDJmZGIyM2NmYzI3MzIzODQ1OWIxYiIsImlhdCI6MTY0NDM2MzE4NiwiZXhwIjoxNjQ0MzY2Nzg2fQ.RWQwZwIKwwhu3ofDFXxRMxYbLKVKP8xcinryLN7otL8",
    "Content-Type": "application/json",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
