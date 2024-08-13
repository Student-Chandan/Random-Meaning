console.log("Hello");
displayMeanings();
showCategories();
defaultCategory();

function defaultCategory() {
  const defaultArray = [
    "Tiger",
    "Lion",
    "Elephant",
    "Panther",
    "Jackel",
    "Jiraffe",
    "Camel",
  ];

  localStorage.setItem("All", JSON.stringify(defaultArray));
}

// Global variables start here
let play = document.getElementById("play");
let pause = document.getElementById("pause");
let selectCategory = document.getElementById("selectCategory");
// Global variables aend here

function createInput() {
  let inputBox = document.querySelector(".box");
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "input");
  inputBox.append(input);
  showInputBox(inputBox);
}

function showInputBox() {
  inputBox.lastElementChild.addEventListener("click", (e) => {
    createInput();
    inputBox = document.querySelector(".box");
  });
}
let inputBox = document.querySelector(".box");
showInputBox(inputBox);
let addMeaning = document.getElementById("addMeanings");
let Input = document.getElementsByClassName("input");

// disable enable add button start here
Array.from(Input).forEach(function (Input) {
  addMeaning.setAttribute("disabled", true);
  Input.addEventListener("input", () => {
    addMeaning.removeAttribute("disabled", true);
    if (Input.value != "") {
      addMeaning.classList.remove("disable");
      addMeaning.removeAttribute("disabled", true);
    } else {
      addMeaning.classList.add("disable");
      addMeaning.setAttribute("disabled", true);
    }
  });
});
// disable enable add button end here

function storeInputInLocalStorage() {
  let select = document.getElementById("select");

  Array.from(Input).forEach(function (Input, index) {
    if (Input.value != "") {
      // Store input value in the selected option
      let selectedOption = select.options[select.selectedIndex].text; // Get the text of the selected option
      let existingData = localStorage.getItem(selectedOption); // Get existing data for the selected category
      let newData = existingData ? JSON.parse(existingData) : []; // Parse existing data or initialize an empty array
      newData.push(Input.value); // Add new input value to the array
      localStorage.setItem(selectedOption, JSON.stringify(newData)); // Store updated data back to local storage

      // Store input value in the "All" option
      let allData = localStorage.getItem("All")
        ? JSON.parse(localStorage.getItem("All"))
        : []; // Retrieve existing data for "All" option
      allData.push(Input.value); // Add new input value to the array
      localStorage.setItem(
        selectedOption != "All" ? "All" : "",
        JSON.stringify(allData)
      ); // Store updated data back to local storage

      // Optionally, clear the input field here if needed
      Input.value = "";

      console.log(
        "Input stored successfully in category:",
        selectedOption,
        "and All"
      );
    } else {
      console.log("Input value is empty, nothing stored.");
    }
  });
}

// Add event listener to the specific button
addMeaning.addEventListener("click", function () {
  storeInputInLocalStorage(); // Call the function to store input in local storage
});

// Function to display meanings for the selected option
function displayMeanings() {
  let select = document.getElementById("selectMeanings");
  let selectedOption = select.options[select.selectedIndex].text; // Get the text of the selected option
  let showMyMeanings = document.getElementById("showMyMeanings"); // Assuming there's a container element for displaying meanings
  // Clear previous meanings displayed
  showMyMeanings.innerHTML = "";
  // Retrieve meanings for the selected option from local storage
  let storedMeanings;
  storedMeanings = JSON.parse(localStorage.getItem(selectedOption)) || [];

  if (storedMeanings.length > 0) {
    // Add each meaning to the list
    storedMeanings.forEach(function (meaning, index) {
      showMyMeanings.innerHTML += `<li>
            <span>${meaning}</span>
            <img src="/trash3.svg" id=${index} alt="delete" style="cursor: pointer;" onclick="deleteAddedMeaning(this.id)">
          </li>`;
    });
  } else {
    // If no meanings found for the selected option, display a message
    showMyMeanings.textContent = "No meanings found for this category.";
  }
}

// Add event listener to the select element
document
  .getElementById("selectMeanings")
  .addEventListener("change", displayMeanings);

// Function to delete a meaning
function deleteAddedMeaning(index) {
  let select = document.getElementById("selectMeanings");
  let selectedOption = select.options[select.selectedIndex].text;
  let storedMeanings = JSON.parse(localStorage.getItem(selectedOption)) || [];

  // Remove the meaning at the specified index
  storedMeanings.splice(index, 1);

  // Update the local storage with the modified meanings
  localStorage.setItem(selectedOption, JSON.stringify(storedMeanings));

  // Re-display the meanings
  displayMeanings();
}

// Initial call to display meanings based on the initial selection

let hideMeaningBox = document.getElementById("hideMeaningBox");
hideMeaningBox.addEventListener("click", () => {
  let addMeaningBox = document.getElementById("addMeaningBox");
  addMeaningBox.style.display = "none";
  let Input = document.getElementsByClassName("input");
  Array.from(Input).forEach(function (Input, index) {
    Input.value = "";
  });

  // Enabled disabled options
  Array.from(showMeaningBox).forEach((element) => {
    element.removeAttribute("disabled", true);
    element.classList.remove("disable");
  });
  selectCategory.removeAttribute("disabled", true);
  play.classList.remove("disable");
  play.removeAttribute("disabled", true);
});

let closeButton = document.getElementById("closeButton");
let showMeaningBox = document.getElementsByClassName("showMeaningBox");
closeButton.addEventListener("click", () => {
  let addMeaningBox = document.getElementById("addMeaningBox");
  addMeaningBox.style.display = "none";
  let Input = document.getElementsByClassName("input");
  Array.from(Input).forEach(function (Input, index) {
    Input.value = "";
  });

  // Enabled disabled options
  Array.from(showMeaningBox).forEach((element) => {
    element.removeAttribute("disabled", true);
    element.classList.remove("disable");
  });
  selectCategory.removeAttribute("disabled", true);
  play.classList.remove("disable");
  play.removeAttribute("disabled", true);
});

play.addEventListener("click", () => {
  play.classList.add("disable");
  play.setAttribute("disabled", true);
  setTimeout(() => {
    pause.classList.remove("disable");
    pause.removeAttribute("disabled", true);
  }, 6000);
  selectCategory.setAttribute("disabled", true);

  Array.from(showMeaningBox).forEach((element) => {
    element.classList.add("disable");
    element.setAttribute("disabled", true);
  });
  let mainBox = document.querySelector(".main-box");
  mainBox.classList.add("mainBoxanimation");
  let randomWord = document.getElementById("randomWord");

  let select = document.getElementById("selectCategory");
  let selectedOption = select.options[select.selectedIndex].text;

  let Meanings = JSON.parse(localStorage.getItem(selectedOption)) || [];
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("!! Are You Ready? !!");
    }, 1000);
  })
    .then((value) => {
      randomWord.innerText = value;
      randomWord.classList.add("play-animation1");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("3");
        }, 1000);
      });
    })
    .then((value) => {
      randomWord.innerText = value;
      randomWord.classList.add("play-animation1");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("2");
        }, 1000);
      });
    })
    .then((value) => {
      randomWord.innerText = value;
      randomWord.classList.add("play-animation1");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("1");
        }, 1000);
      });
    })
    .then((value) => {
      randomWord.innerText = value;
      randomWord.classList.add("play-animation1");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Go");
        }, 1000);
      });
    })
    .then((value) => {
      randomWord.classList.add("play-animation2");
      randomWord.innerText = value;
    });
  let randomMean = setInterval(() => {
    let randomMeaning = Math.floor(Math.random() * Meanings.length);
    let finalMeaning = Meanings[randomMeaning];
    randomWord.classList.add("play-animation2");
    randomWord.innerText = finalMeaning;
  }, 4000);
  pause.addEventListener("click", () => {
    // Disabale/ enable start
    play.classList.remove("disable");
    pause.classList.add("disable");
    play.removeAttribute("disabled", true);
    pause.setAttribute("disabled", true);
    selectCategory.removeAttribute("disabled", true);
    Array.from(showMeaningBox).forEach((element) => {
      element.classList.remove("disable");
      element.removeAttribute("disabled", true);
    });
    // Disabale/ enable end

    clearInterval(randomMean);
    randomWord.classList.remove("play-animation2");
    randomWord.classList.remove("play-animation1");
    randomWord.innerText = "Play";
    let mainBox = document.querySelector(".main-box");
    mainBox.classList.remove("mainBoxanimation");
  });
});

// onclick event start here
let addMeaningBox = document.getElementById("addMeaningBox");
let showOurMeanings = document.getElementsByClassName("showOurMeanings");
showMeaningBox = document.getElementsByClassName("showMeaningBox");
let tabs = document.getElementsByClassName("tabs");
function addMeaningsBox() {
  Array.from(showMeaningBox).forEach((element) => {
    element.setAttribute("disabled", true);
    element.classList.add("disable");
  });
  selectCategory.setAttribute("disabled", true);
  play.classList.add("disable");
  play.setAttribute("disabled", true);

  addMeaningBox.style.display = "block";
  for (a of showMeaningBox) {
    a.classList.remove("active-showMeaningBox");
  }
  for (b of showOurMeanings) {
    b.classList.remove("menuBar-active");
  }
  for (c of tabs) {
    c.classList.remove("changetab");
  }
  let i = Array.from(showMeaningBox).indexOf(event.target);
  showMeaningBox[i].classList.add("active-showMeaningBox");
  showOurMeanings[i].classList.add("menuBar-active");
  tabs[i].classList.add("changetab");
}

showOurMeanings = document.getElementsByClassName("showOurMeanings");
tabs = document.getElementsByClassName("tabs");
function showOurMeaning() {
  for (a of showOurMeanings) {
    a.classList.remove("menuBar-active");
  }
  for (b of tabs) {
    b.classList.remove("changetab");
  }
  let i = Array.from(showOurMeanings).indexOf(event.target);
  tabs[i].classList.add("changetab");
  showOurMeanings[i].classList.add("menuBar-active");
}

// onclick event end here

// showMyMeanings logic start here
// showMyMeanings logic end here

// delete Meanings logic start here
function deleteMeaning(index) {
  let Meanings = localStorage.getItem("Meanings");
  let meaningObj;
  if (Meanings == null) {
    meaningObj = [];
  } else {
    meaningObj = JSON.parse(Meanings);
  }
  meaningObj.splice(index, 1);
  localStorage.setItem("Meanings", JSON.stringify(meaningObj));
  showMyMeanings();
}

// delete Meanings logic end here

// <!-- category Logic start here  -->

// Show Category Window
let showCategory = document.getElementById("showCategory");
let showCategoryWindow = document.querySelector(".showCategory");
showCategory.addEventListener("click", () => {
  showCategoryWindow.classList.remove("d-none");
  addMeaningBox.setAttribute("disabled", true);
});
// Closing Category window
let categoryCloseButton = document.getElementById("categoryCloseButton");
categoryCloseButton.addEventListener("click", () => {
  showCategoryWindow.classList.add("d-none");
});

// Adding categories logic start here
let addCategory = document.getElementById("addCategory");
let categoryName = document.getElementById("categoryName");
let categoryDesc = document.getElementById("description");

// Class for storing category names and description in localStorage
class addInLocaStorage {
  constructor(clickedButton, firstArgument, secondArugment) {
    this.clickedButton = clickedButton;
    this.firstArgument = firstArgument;
    this.secondArugment = secondArugment;
  }
  addCategory() {
    this.clickedButton.addEventListener("click", () => {
      let meaningCategories = localStorage.getItem("meaningCategories");
      let meaningCategoryobj;
      if (meaningCategories == null) {
        meaningCategoryobj = [];
      } else {
        meaningCategoryobj = JSON.parse(meaningCategories);
      }
      let myobj = {
        name: this.firstArgument.value,
        desc: this.secondArugment.value,
      };
      meaningCategoryobj.push(myobj);
      //Storing the category of meanings in localStorage
      if (this.firstArgument.value != "" && this.secondArugment.value != "") {
        localStorage.setItem(
          "meaningCategories",
          JSON.stringify(meaningCategoryobj)
        );
        this.firstArgument.value = "";
        this.secondArugment.value = "";
        showCategories();
      }
    });
  }
}

// Creating a new element for class
let addNewCategory = new addInLocaStorage(
  addCategory,
  categoryName,
  categoryDesc
);

// Calling a class
addNewCategory.addCategory();

// function for showing Categories
function showCategories() {
  let meaningCategories = localStorage.getItem("meaningCategories");
  let meaningCategoryobj;
  if (meaningCategories == null) {
    meaningCategoryobj = [];
  } else {
    meaningCategoryobj = JSON.parse(meaningCategories);
  }
  let html = "";
  let html2 = "";
  meaningCategoryobj.forEach(function (element, index) {
    html += `
    <li>
      <div class="categoryTitle" id=${index} onclick="showCategoryDetailsFunc(this.id)">
        <span>${element.name}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id=${index} onclick="deleteCategory(this.id)"
      fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
      <path
        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z">
      </path>
    </svg>
    </li>
    `;
    html2 += `<option value=${element.name}>${element.name}</option>
    `;
  });

  let categoryContainer = document.querySelector(".categoryContainer");
  let select = document.getElementById("select");
  let selectMeanings = document.getElementById("selectMeanings");
  let selectCategory = document.getElementById("selectCategory");
  // Showing category names in show meaning category section
  if (meaningCategoryobj.length != 0) {
    categoryContainer.innerHTML = html;
  } else {
    categoryContainer.innerHTML = `<p style="margin-left:10px;">Nothing is here(Add first).</p>`;
  }

  // Showing category names in Drop Down lists
  if (meaningCategoryobj.length != 0) {
    select.innerHTML += html2;
    selectMeanings.innerHTML += html2;
    selectCategory.innerHTML += html2;
  }
}

// function for deleting Categories
function deleteCategory(index) {
  console.log(index);
  let meaningCategories = localStorage.getItem("meaningCategories");
  let meaningCategoryobj;
  if (meaningCategories == null) {
    meaningCategoryobj = [];
  } else {
    meaningCategoryobj = JSON.parse(meaningCategories);
  }
  console.log(meaningCategoryobj);
  console.log(meaningCategoryobj.splice(index, 1));
  meaningCategoryobj.splice(index, 1);
  localStorage.setItem("meaningCategories", JSON.stringify(meaningCategoryobj));
  showCategories();
}

// Show category details window
let showCategoryDetails = document.querySelector(".showCategoryDetails");
// Function for Showing category details (Category name and description)
function showCategoryDetailsFunc(index) {
  let meaningCategories = localStorage.getItem("meaningCategories");
  let meaningCategoryobj;
  if (meaningCategories == null) {
    meaningCategoryobj = [];
  } else {
    meaningCategoryobj = JSON.parse(meaningCategories);
  }
  showCategoryDetails.classList.remove("d-none");
  let categoryDetails = document.querySelector(".categoryDetails");
  categoryDetails.children[0].innerText = meaningCategoryobj[index].name;
  categoryDetails.children[1].innerText = meaningCategoryobj[index].desc;
}

// Close Category details window
let closeShowCategory = document.getElementById("closeShowCategory");
closeShowCategory.addEventListener("click", () => {
  showCategoryDetails.classList.add("d-none");
});

// <!-- category Logic end here  -->
