// import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js";

const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navLogo = document.querySelector("#navbar__logo");

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
};

menu.addEventListener("click", mobileMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector(".is-active");
  if (window.innerWidth <= 960 && menuBars) {
    menu.classList.toggle("is-active");
    menuLinks.classList.remove("active");
  }
};

menuLinks.addEventListener("click", hideMobileMenu);
navLogo.addEventListener("click", hideMobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector(".highlight");
  const homeNav = document.querySelector("#home-navbar");
  const aboutNav = document.querySelector("#about-navbar");
  const servicesNav = document.querySelector("#services-navbar");
  const contactNav = document.querySelector("#contact-navbar");
  let scrollPos = window.scrollY;
  console.log(scrollPos);

  // adds 'highlight' class to my menu items
  if (window.innerWidth > 960 && scrollPos < 600) {
    homeNav.classList.add("highlight");
    aboutNav.classList.remove("highlight");
    servicesNav.classList.remove("highlight");
    contactNav.classList.remove("highlight");
    return;
  } else if (window.innerWidth > 960 && scrollPos < 1800) {
    aboutNav.classList.add("highlight");
    homeNav.classList.remove("highlight");
    servicesNav.classList.remove("highlight");
    contactNav.classList.remove("highlight");
    return;
  } else if (window.innerWidth > 960 && scrollPos < 2700) {
    servicesNav.classList.add("highlight");
    homeNav.classList.remove("highlight");
    aboutNav.classList.remove("highlight");
    contactNav.classList.remove("highlight");
    return;
  } else if (window.innerWidth > 960 && scrollPos < 4300) {
    contactNav.classList.add("highlight");
    servicesNav.classList.remove("highlight");
    homeNav.classList.remove("highlight");
    aboutNav.classList.remove("highlight");
    return;
  }

  if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
    elem.classList.remove("highlight");
  }
};

window.addEventListener("scroll", highlightMenu);
window.addEventListener("click", highlightMenu);

// const priceListDialog = document.getElementById("price-list-content");
const policyDialog = document.querySelector("[appointment-policy]");

function getCurrentTabId() {
  let currentTabElement = document.querySelector(
    'input[name="mytabs"]:checked'
  );

  //if currentTabElement exists...
  if (currentTabElement) {
    return currentTabElement.id;
  } else {
    return null;
  }
  // return currentTabElement ? currentTabElement.id : null;
}

// let currentTabElement = document.querySelector('input[name="mytabs"]:checked');
// let currentTab = currentTabElement ? currentTabElement.id : null;

function updateCurrentTabId() {
  let currentTab = null;
  // Add event listeners to update currentTab when a tab is selected
  const radioButtons = document.querySelectorAll('input[name="mytabs"]');
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", (event) => {
      currentTab = getCurrentTabId();
      console.log("Current Tab updated to: " + currentTab);
    });
  });
}

function openPriceListDialog(tabId) {
  console.log("Tab ID: " + tabId); //print the page name user clicked

  fetch("pricelist-content.html") //load page
    .then((response) => response.text())
    .then((data) => {
      const priceListDialog = document.getElementById("pricelist-dialog");
      priceListDialog.innerHTML = data; //inject page into dialog within index.html
      //handler to show modal only if element of id provided exists
      const tabElement = document.getElementById(tabId);
      if (tabElement) {
        priceListDialog.showModal(tabElement.click());
        updateCurrentTabId();
        // console.log("Current Tab: " + currentTab); //testing
      } else {
        console.error(`Element with ID ${tabId} not found.`);
      }

      addBookBtnsEventListener();
      // openCalendar();
    })
    .catch((error) =>
      console.error("Error loading price-list content:", error)
    );
}

//dynamically set the buttons to be able to tell which the user has clicked, giving the treatment.item_name
function addBookBtnsEventListener() {
  const bookBtns = document.querySelectorAll(".item_btn");

  bookBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const treatmentName = getTreatmentName(button);
      console.log("Treatment name: '" + treatmentName + "'.");
      // set;
    });
  });
}

let bookedClicked = null;

function getLastClickedBookedBtn() {
  return bookedClicked;
}
//treatment book button *test
function getTreatmentName(button) {
  const treatmentDiv = button.closest(".treatment");
  const itemNameDiv = treatmentDiv.querySelector(".item_name");
  const itemName = itemNameDiv.textContent.trim();

  bookedClicked = itemName;
  return itemName;
}

// function setClickedTreatment(treatment) {
//   let treatment = treatment;
// }

// function getClickedTreatment() {
//   return;
// }

function openCalendar() {
  // Create a div to hold the flatpickr calendar with a high z-index

  const calendarContainer = document.createElement("div");
  // calendarContainer.style.zIndex = "99"; // Set the desired z-index here

  calendarContainer.style.position = "fixed";
  calendarContainer.style.top = "35%";
  calendarContainer.style.left = "35%";
  calendarContainer.style.transform = "translate(-35%, -35%)";
  // calendarContainer.style.zIndex = "99";
  // Ensure styles are applied to flatpickr elements within this container
  calendarContainer.classList.add("centered-flatpickr");
  document.body.appendChild(calendarContainer);

  const fp = flatpickr(calendarContainer, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",
    // position: "center", // Ensures the calendar is positioned correctly
    onClose: [
      // Handle selected date and time
      (selectedDates, dateStr, instance) => {
        console.log("Selected Date:", selectedDates[0]);
        console.log("Formatted Date:", dateStr);
        // Replace this with your booking logic
        alert(`You have booked Eyebrow design for ${dateStr}`);
      },
    ],
  });

  //close the dialog just to cover the bug that flatpickr won't open forward (z-index lower)
  const priceListDialog = document.getElementById("pricelist-dialog");

  //get which pricelist part it was so that after booking, it opens back up where it waw
  priceListDialog.close();
  fp.open();
}

// // Function to update the currentTab variable when a tab is clicked
// function updateCurrentTab() {
//   let currentTab = document.querySelector('input[name="mytabs"]:checked').id;
//   currentTab = this.id; // 'this' refers to the clicked radio button
//   console.log("Current tab:", currentTab); // For debugging
// }

// addDialogEventListener(priceListDialog);

// Select all dialogs and add event listeners
const dialogs = document.querySelectorAll("dialog");
dialogs.forEach((dialog) => addDialogEventListener(dialog));

// Reusable listener for all dialogs
function addDialogEventListener(dialog) {
  dialog.addEventListener("click", (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    checkDialogBounds(dialog, dialogDimensions, e);
  });
}

//reusable function to open/close dialog
function checkDialogBounds(dialog, dialogDimensions, e) {
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    console.log("OUT OF BOUND, X: " + e.clientX + " Y: " + e.clientY);
    dialog.close();
  } else {
    console.log("X: " + e.clientX + " Y: " + e.clientY);
  }
}

// Example usage:
// const bookButtons = document.querySelectorAll(".item_btn");

// bookButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const treatmentName = getTreatmentName(button);
//     console.log("Treatment name:", treatmentName);
//   });
// });
