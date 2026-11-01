'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category || (selectedValue === "ai" && filterItems[i].dataset.category === "ai")) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Submit contact messages through Formspree.
if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const note = form.querySelector(".form-note");
    const submitButton = formBtn;
    const buttonText = submitButton.querySelector("span");
    const originalButtonText = buttonText ? buttonText.textContent : "Send Message";

    submitButton.disabled = true;
    if (buttonText) buttonText.textContent = "Sending...";
    if (note) {
      note.textContent = "Sending your message...";
      note.setAttribute("role", "status");
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        form.reset();
        if (note) note.textContent = "Thanks for reaching out! Your message has been sent successfully.";
        if (buttonText) buttonText.textContent = "Message Sent";
      } else {
        const result = await response.json().catch(() => ({}));
        const details = result.errors?.map(error => error.message).join(" ") || "Please try again in a moment.";
        if (note) note.textContent = "Sorry, your message could not be sent. " + details;
        if (buttonText) buttonText.textContent = originalButtonText;
      }
    } catch (error) {
      if (note) note.textContent = "A network error prevented sending your message. Please check your connection and try again.";
      if (buttonText) buttonText.textContent = originalButtonText;
    } finally {
      submitButton.disabled = !form.checkValidity();
      if (buttonText && buttonText.textContent === "Message Sent") {
        buttonText.textContent = originalButtonText;
      }
    }
  });
}

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
