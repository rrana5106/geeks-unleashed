// Get the button from the HTML
const searchBtn = document.querySelector("#searchBtn");
const divEl = document.querySelector(".container");

// assigning API key
// const APIkey = "rc_live_9c23ef7629df4055a2c031dcdc3b9f39";

// creating the element
const h1El = document.createElement("h1");
const imgEl = document.createElement("img");

/* // Function that runs when the button is clicked
function sendFetchRequest() {
  console.log("Button clicked");

  // Send a GET request to the API
  fetch("https://api.restcountries.com/countries/v5?q=canada", {
    headers: {
      // API authentication key
      Authorization: "Bearer " + APIkey,
    },
  })
    // Convert the response into JSON format
    .then((response) => response.json())

    // Work with the returned data
    .then((data) => {
      console.log(data);

      // Access the first country object
      const country = data.data.objects[0];

      // Display different country names
      console.log("Common Name:", country.names.common);

      // Official country name
      console.log("Official Name:", country.names.official);

      // Native English official name
      console.log(
        "Native English Official Name:",
        country.names.native.eng.official,
      );

      // Native French official name
      console.log(
        "Native French Official Name:",
        country.names.native.fra.official,
      );

      // Capital city
      console.log("Capital:", country.capitals[0].name);

      // Population
      console.log("Population:", country.population);

      // Region
      console.log("Region:", country.region);

      // testing the code to display in page
      h1El.textContent = country.names.common;
      // testing the img
      imgEl.src = country.flag.url_png;

      divEl.append(h1El, imgEl);
      // Flag image URL
      console.log("Flag:", country.flag.url_png);
    })

    // Catch and display any errors
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Add click event to the button
searchBtn.addEventListener("click", sendFetchRequest);
 */

// Function to get country data from a local JSON file
// This avoids exposing the API key in the frontend
function sendFetchRequest() {
  // Fetch country data from the local JSON file
  fetch("./data/countries.json")
    // Convert the response into JavaScript object format
    .then((response) => response.json())

    // Work with the returned data
    .then((data) => {
      // Access the first country object in the array
      const country = data.data.objects[0];

      // Set the country name as the heading text
      h1El.textContent = country.names.common;

      // Set the country flag image source
      imgEl.src = country.flag.url_png;

      // add alternative text for accessibility
      imgEl.alt = `${country.names.common} flag`;

      // Clear previous content from the container
      divEl.textContent = "";

      // Add the heading and image to the page
      divEl.append(h1El, imgEl);
    })

    // Handle any errors
    .catch((error) => {
      console.error("Error loading country data:", error);
    });
}

// Run the function when the search button is clicked
searchBtn.addEventListener("click", sendFetchRequest);
