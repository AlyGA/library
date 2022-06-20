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
const delButton = document.querySelectorAll(".deleteButton");

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

  document.getElementById("userForm").reset();
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

  let statusCheck = document.createElement("input");
  statusCheck.type = "checkbox";
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");

  //When the 'yes' button is pressed, it will be check, or if it's 'no', it will not be checked
  if (status == "Yes") {
    statusCheck.checked = true;
    tableStatusData.append(statusCheck);
  } else if (status == "No") {
    tableStatusData.append(statusCheck);
  }

  bodyOfTable.append(tableRow);
  tableRow.classList.add("tableBody");
  tableAuthorData.textContent = author;
  tableTitleData.textContent = title;
  tablePageData.textContent = page;

  // Check if any values are empty. If there are empty values, make a popup message. If not, append it.
  if (
    tableAuthorData.textContent === "" ||
    tableTitleData.textContent === "" ||
    tablePageData.textContent === ""
  ) {
    window.alert("Please make sure all values are filled!");
  } else {
    tableStatusData.append(statusCheck);
    deleteButton.setAttribute("class", "deleteButton");
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

    const bodyData = document.querySelectorAll(".tableBody");
    bodyData.forEach((tablerows, i) => tablerows.setAttribute("data-index", i));

    // Listener event when a row is removed
    deleteButton.addEventListener("click", () => {
      tableRow.remove();
      myLibrary.splice([tableRow.dataset.index], 1);
      tableRow.removeAttribute("data-index");
    });
  }
}
