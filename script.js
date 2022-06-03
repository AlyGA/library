// TODO: For the layout of the main content screen, make a table and style it nicely. Then, when the modal is prompted, make sure the modal asks for name, title, number of pages, and make a button of if it has been read or not. After that, hit submit. On each row of the column there should be:
// -- Name of Author (requirements: more than two letters must be typed. And, there can be no numbers)
// -- Title (requirements: more than two letters)
// -- Number of Pages (requirements: numbers ONLY. Try to get the one where users can choose numbers by scrolling up and down)
// -- Have read or not (requirements: In the form, this should just be a checkbox button. But in the actual table, it should be a button that can switch on and off.)
// -- Delete button (requirements: it should ONLY delete the row that has been chosen)

// Retrieving all items for the modal buttons
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
// Retrieiving all items for the book
let authorName;
let bookTitle;
let pageNumber;
let yesButton;
let noButton;
let readingStatus;
const bodyOfTable = document.querySelector("tbody");

// Opening the modal
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

// Removing the overlay
overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".newButtonModal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

// Closing the modal
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".newButtonModal");
    closeModal(modal);
  });
});

// Opening the modal
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

// Closing the modal
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

//Prevent the form from automatically going to a page
document.querySelector("#submit").addEventListener("click", function (event) {
  event.preventDefault();
  authorName = document.getElementById("author").value;
  bookTitle = document.getElementById("title").value;
  pageNumber = document.getElementById("num").value;
  yesButton = document.getElementById("yes");
  noButton = document.getElementById("no");
  if (yesButton.checked) {
    readStatus = "Yes";
  } else if (noButton.checked) {
    readStatus = "No";
  }
  addBookToLibrary(authorName, bookTitle, pageNumber, readStatus);
});

// Below is the function defining the book class and array.
let myLibrary = [];

// Book Constructor
function Book(author, title, pageNumber, readStatus) {
  this.author = author;
  this.title = title;
  this.pageNumber = pageNumber;
  this.readStatus = readStatus;
}

// Add the book to the array
function addBookToLibrary(author, title, page, status) {
  newBook = new Book(author, title, page, status);
  myLibrary.push(newBook);
  updateTable(author, title, page, status);
}

// Update the book's information to the table.
function updateTable(author, title, page, status) {
  const tableRow = document.createElement("tr");
  const tableAuthorData = document.createElement("td");
  const tableTitleData = document.createElement("td");
  const tablePageData = document.createElement("td");
  const tableStatusData = document.createElement("td");
  const tableDelData = document.createElement("td");
  //TODO: Allow checkbox function to work so that when the 'yes' button is pressed, it will be check, or if it's 'no', it will not be checked
  const yesChecked = document.createElement("input");
  yesChecked.type = "checkbox";
  yesChecked.checked = "true";
  const noChecked = document.createElement("input");
  noChecked.type = "checkbox";
  noChecked.checked = "true";
  const deleteButton = document.createElement("button");

  bodyOfTable.append(tableRow);
  tableAuthorData.textContent = author;
  tableTitleData.textContent = title;
  tablePageData.textContent = page;
  if (status.value == "Yes") {
    tableStatusData.append(yesChecked);
  } else {
    tableStatusData.append(noChecked);
  }
  // tableStatusData.textContent = status;
  deleteButton.innerHTML = `<svg style="width: 24px; height: 24px" viewBox="0 0 24 24"><path
    fill="currentColor"
    d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
  />
</svg>`;

  tableRow.append(tableAuthorData);
  tableRow.append(tableTitleData);
  tableRow.append(tablePageData);
  tableRow.append(tableStatusData);
  tableDelData.append(deleteButton);
  tableRow.append(tableDelData);
}
