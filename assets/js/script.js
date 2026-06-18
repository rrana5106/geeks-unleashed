// Pseudo Code

// 2. Check that the data has loaded correctly

// 3. Create quiz questions from the country data
// Each question should have:
// - country name
// - flag image
// - correct capital answer
// - four answer options

// 4. Load the first question on the page
// Show the flag image
// Show "Guess the capital"
// Show four answer buttons

// 5. Let the user click one answer button
// Store the selected answer

// 6. When the user clicks Submit Answer:
// Check if the selected answer matches the correct capital

// 7. If the answer is correct:
// Display "Correct!"

// 8. If the answer is wrong:
// Display "Wrong! The correct answer is ..."

// 9. After a short delay:
// Move to the next question

// 10. When there are no more questions:
// Display "Quiz finished!"
/* 
// Select HTML elements
const flagImg = document.querySelector("#flagImg");
const answerButtons = document.querySelectorAll(".answer");
const submitBtn = document.querySelector("#submit");
const answerBox = document.querySelector("#answerBox");
const answerText = answerBox.querySelector("p");

// API key
const APIkey = "rc_live_9c23ef7629df4055a2c031dcdc3b9f39";

// Quiz variables
let countries = [];
let currentQuestion = {};
let selectedAnswer = "";

// Hide answer box when page loads
answerBox.style.display = "none";

// Load question when page loads
// loadQuestion();

function loadQuestion() {
  fetch("https://api.restcountries.com/countries/v5?limit=100", {
    headers: {
      Authorization: "Bearer " + APIkey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      countries = [];

      for (const country of data.data.objects) {
        if (country.capitals && country.capitals.length > 0) {
          countries.push({
            name: country.names.common,
            flag: country.flag.url_png,
            capital: country.capitals[0].name,
          });
        }
      }

      createQuestion();
    })
    .catch((error) => {
      console.error("Error loading countries:", error);
    });
}

function createQuestion() {
  // Hide answer box before user submits
  answerBox.style.display = "none";

  // Reset selected answer
  selectedAnswer = "";

  // Pick random country
  const randomIndex = Math.floor(Math.random() * countries.length);
  currentQuestion = countries[randomIndex];

  // Show flag
  flagImg.src = currentQuestion.flag;
  flagImg.alt = `${currentQuestion.name} flag`;

  // Get correct answer
  const correctAnswer = currentQuestion.capital;

  // Get 3 wrong answers
  const wrongAnswers = countries
    .filter((country) => country.capital !== correctAnswer)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((country) => country.capital);

  // Create 4 options
  const options = [correctAnswer, ...wrongAnswers].sort(
    () => Math.random() - 0.5,
  );

  // Add options to buttons
  answerButtons.forEach((button, index) => {
    button.textContent = options[index];
    button.style.backgroundColor = "black";

    button.addEventListener("click", function () {
      selectedAnswer = button.textContent;

      answerButtons.forEach((btn) => {
        btn.style.backgroundColor = "black";
      });

      button.style.backgroundColor = "gray";
    });
  });
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Show answer box only after submit
  answerBox.style.display = "flex";

  if (selectedAnswer === "") {
    answerText.textContent = "Please select an answer.";
    return;
  }

  if (selectedAnswer === currentQuestion.capital) {
    answerText.textContent = "Your answer is correct!";
  } else {
    answerText.textContent = `Your answer is incorrect. Correct answer: ${currentQuestion.capital}`;
  }

  // Move to next question after 2 seconds
  setTimeout(() => {
    createQuestion();
  }, 2000);
});
 */

// Get elements from the page that we need to work with
const flagImg = document.querySelector(".flagImg");
const answerButtons = document.querySelectorAll(".answer");
const submitBtn = document.querySelector(".submit");
const answerText = document.querySelector(".answerBox p");

// Hide the answer box until the user submits an answer
document.querySelector(".answerBox").style.display = "none";

// Store all countries from the API
let countries = [];

// Store the current question
let currentCountry;

// Store the answer selected by the user
let selectedAnswer = "";

// API key
const APIkey = "rc_live_9c23ef7629df4055a2c031dcdc3b9f39";

function loadQuestion() {
  /* // Fetch country data from the API
  fetch("https://api.restcountries.com/countries/v5?limit=100", {
    headers: {
      Authorization: "Bearer " + APIkey,
    },
  }) */
  // Fetch country data from the local JSON file
  fetch("./data/countries.json")
    // Convert the response into JSON
    .then((response) => response.json())

    // Work with the returned data
    .then((data) => {
      // Loop through all countries and create a simpler array
      for (const country of data.data.objects) {
        // Skip countries that don't have a capital
        if (country.capitals && country.capitals.length > 0) {
          countries.push({
            name: country.names.common,
            flag: country.flag.url_png,
            capital: country.capitals[0].name,
          });
        }
      }

      // Display the first question
      showQuestion();
    })

    // Show any errors in the console
    .catch((error) => {
      console.log(error);
    });
}

function showQuestion() {
  // Hide the answer box for the new question
  document.querySelector("#answerBox").style.display = "none";

  // Clear previous answer
  selectedAnswer = "";

  // Reset all buttons when loading a new question
  for (const button of answerButtons) {
    button.style.backgroundColor = "black";
  }

  // Pick a random country
  let randomNumber = Math.floor(Math.random() * countries.length);

  // Save that country as the current question
  currentCountry = countries[randomNumber];

  // Display the flag image
  flagImg.src = currentCountry.flag;

  // Start with the correct answer
  let options = [];

  options.push(currentCountry.capital);

  // Add three wrong answers
  while (options.length < 4) {
    let randomIndex = Math.floor(Math.random() * countries.length);

    let randomCapital = countries[randomIndex].capital;

    // Prevent duplicate answers
    if (!options.includes(randomCapital)) {
      options.push(randomCapital);
    }
  }

  // Shuffle the answers so the correct answer isn't always first
  options.sort(() => Math.random() - 0.5);

  // Put the answers onto the buttons
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = options[i];
  }
}

// Save the user's selected answer
// Listen for a click on each answer button
for (const button of answerButtons) {
  button.addEventListener("click", function () {
    // Save the answer selected by the user
    selectedAnswer = button.textContent;

    // Reset all buttons to their original colour
    for (const btn of answerButtons) {
      btn.style.backgroundColor = "black";
    }

    // Highlight the selected button so the user knows which answer they picked
    button.style.backgroundColor = "green";
  });
}
// Check the answer when the submit button is clicked
submitBtn.addEventListener("click", function (event) {
  // Prevent the form from refreshing the page
  event.preventDefault();

  // Show the answer box
  document.querySelector("#answerBox").style.display = "flex";

  // Compare the selected answer with the correct answer
  if (selectedAnswer === currentCountry.capital) {
    answerText.textContent = "Your answer is correct!";
  } else {
    answerText.textContent =
      "Your answer is incorrect. Correct answer is " + currentCountry.capital;
  }
  // Automatically load the next question after 2 seconds
  setTimeout(function () {
    showQuestion();
  }, 2000);
});

// Start the quiz when the page loads
loadQuestion();
