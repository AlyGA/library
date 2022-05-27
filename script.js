// Retrieving all items for the modal buttons
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

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
