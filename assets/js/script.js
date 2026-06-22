// START

// 1. Get the HTML elements
//    - Flag image
//    - Answer buttons
//    - Submit button
//    - Answer box

// 2. Hide the answer box initially

// 3. Create variables
//    - countries array
//    - current country
//    - selected answer

// 4. Load country data from the JSON file

// 5. Loop through all countries
//    - Ignore countries without capitals
//    - Store country name, flag, and capital in the countries array

// 6. Show the first question

// SHOW QUESTION

// 7. Hide the answer box

// 8. Clear the previously selected answer

// 9. Reset button colours

// 10. Pick a random country

// 11. Display the country's flag

// 12. Create an array of answer options
//     - Add the correct capital
//     - Add three random capitals
//     - Make sure there are no duplicates

// 13. Shuffle the answer options

// 14. Display the options on the four buttons

// USER SELECTS ANSWER

// 15. Save the selected answer

// 16. Highlight the selected button

// USER CLICKS SUBMIT

// 17. Show the answer box

// 18. Check whether the selected answer matches the capital

// 19. If correct
//       Display "Your answer is correct!"

// 20. Otherwise
//       Display "Your answer is incorrect"
//       Show the correct answer

// 21. Wait 2 seconds

// 22. Load the next question

// END

// Get the flag image
const flagImg = document.querySelector(".flagImg");

// Get all four option buttons
const answerButtons = document.querySelectorAll(".option");

// Get the submit button
const submitBtn = document.querySelector("#submit");

// Get the answer box
const answerBox = document.querySelector("#answerBox");

// Get the paragraph inside the answer box
const answerText = document.querySelector("#answerBox p");

// Hide the answer box when the page first loads
answerBox.style.display = "none";

// Store all countries
let countries = [];

// Store the current question country
let currentCountry;

// Store the answer selected by the user
let selectedAnswer = "";

// API key
const APIkey = "rc_live_9c23ef7629df4055a2c031dcdc3b9f39";

// Load country data
function loadQuestion() {

   fetch("https://api.restcountries.com/countries/v5?limit=100", {
    headers: {
      Authorization: "Bearer " + APIkey,
    },
  })
  // fetch("./data/countries.json")
    .then((response) => response.json())
    .then((data) => {
      countries = [];

      // Create a simple country array from the JSON data
      for (const country of data.data.objects) {
        if (country.capitals && country.capitals.length > 0) {
          countries.push({
            name: country.names.common,
            flag: country.flag.url_png,
            capital: country.capitals[0].name,
          });
        }
      }

      // Show the first question
      showQuestion();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Show one quiz question
function showQuestion() {
  // Hide answer box for the new question
  answerBox.style.display = "none";

  // Clear previous selected answer
  selectedAnswer = "";

  // Reset the answer button for the next question  
  for (const button of answerButtons) {
  button.classList.remove("selected");
}

  // Pick a random country
  let randomNumber = Math.floor(Math.random() * countries.length);
  currentCountry = countries[randomNumber];

  // Display the flag
  flagImg.src = currentCountry.flag;
  flagImg.alt = currentCountry.name + " flag";

  // Create answer options
  let options = [];

  // Add the correct answer
  options.push(currentCountry.capital);

  // Add three wrong answers
  while (options.length < 4) {
    let randomIndex = Math.floor(Math.random() * countries.length);
    let randomCapital = countries[randomIndex].capital;

    // Avoid duplicate answers
    if (!options.includes(randomCapital)) {
      options.push(randomCapital);
    }
  }

  // Shuffle the answers
  options.sort(() => Math.random() - 0.5);

  // Put answers into the buttons
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = options[i];
  }
}

// Save selected answer
for (const button of answerButtons) {
  button.addEventListener("click", function () {
    // Save the answer selected by the user
    selectedAnswer = button.textContent;

    // Remove selected style from all buttons
    for (const btn of answerButtons) {
      btn.classList.remove("selected");
    }

    // Add selected style to the clicked button
    button.classList.add("selected");
  });
}

// Check answer
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Show answer box only after submit
  answerBox.style.display = "flex";

  if (selectedAnswer === "") {
    answerText.textContent = "Please select an answer.";
    return;
  }

  if (selectedAnswer === currentCountry.capital) {
    answerText.textContent = "Your answer is correct!";
  } else {
    answerText.textContent =
      "Your answer is incorrect. Correct answer is " + currentCountry.capital;
  }

  // Load next question after 2 seconds
  setTimeout(function () {
    showQuestion();
  }, 2000);
});

// Start quiz
loadQuestion();
