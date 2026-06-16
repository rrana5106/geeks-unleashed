function sendFetchRequest() {
  console.log("i have been click");
  fetch("https://api.restcountries.com/countries/v5?q=canada", {
    headers: {
      Authorization: "Bearer rc_live_9c23ef7629df4055a2c031dcdc3b9f39",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

document.getElementById("fetch").addEventListener("click", sendFetchRequest);
