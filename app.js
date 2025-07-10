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

function openCalendar() {
  // Get the dialog element
  const dialog = document.getElementById("fpickr-dialog");
  // Show the dialog
  dialog.showModal();

  // Get the calendar container
  // const calendarContainer = document.querySelector(".fpickr-calendar");
  const calendarBox = document.querySelector(".fpickr-box");

  const fp = flatpickr(dialog, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",
    onClose: [
      // Handle selected date and time
      (selectedDates, dateStr, instance) => {
        console.log("Selected Date:", selectedDates[0]);
        console.log("Formatted Date:", dateStr);
        // Store the selected dateStr
        selectedDate = dateStr;
      },
    ],
  });

  fp.open();
}

// // Step 1: Fetch events from Google Calendar
// async function fetchGoogleCalendarEvents() {
//   const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
//     headers: {
//       'Authorization': Bearer ${accessToken} // Use the OAuth 2.0 access token
//     }
//   });
//   const data = await response.json();
//   return data.items;
// }

// // Step 2: Parse events to get unavailable times
// function getUnavailableTimes(events) {
//   return events.map(event => {
//     return {
//       from: new Date(event.start.dateTime),
//       to: new Date(event.end.dateTime)
//     };
//   });
// }

// // Step 3: Initialize Flatpickr with unavailable times
// async function initializeFlatpickr() {
//   const events = await fetchGoogleCalendarEvents();
//   const unavailableTimes = getUnavailableTimes(events);

//   flatpickr("#calendar", {
//     enableTime: true,
//     disable: unavailableTimes
//   });
// }

// // Call the function to initialize Flatpickr
// initializeFlatpickr();

let selectedDate = "";
// Cancel button functionality
document.getElementById("cancel-btn").addEventListener("click", () => {
  const dialog = document.getElementById("fpickr-dialog");
  dialog.close();
});

// Confirm button functionality
document.getElementById("confirm-btn").addEventListener("click", () => {
  if (selectedDate) {
    const whatsappURL = `https://api.whatsapp.com/send?phone=353830110511&text=I%20would%20like%20to%20book%20an%20appointment%20for%20the%20date:%20${encodeURIComponent(
      selectedDate
    )}`;
    window.open(whatsappURL, "_blank");
  }
});

//dynamically set the buttons to be able to tell which the user has clicked, giving the treatment.item_name
function addBookBtnsEventListener() {
  const bookBtns = document.querySelectorAll(".item_btn");

  bookBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const treatmentName = getTreatmentName(button);
      console.log("Treatment name: '" + treatmentName + "'.");
      openCalendar();
    });
  });
}
//Global var to know which item_name the user last clicked 'Book' btn
let bookedClicked = null;

function getLastClickedBookedBtn() {
  return bookedClicked;
}

//get item_name out of the tratment div
function getTreatmentName(button) {
  const treatmentDiv = button.closest(".treatment");
  const itemNameDiv = treatmentDiv.querySelector(".item_name");
  const itemName = itemNameDiv.textContent.trim();

  //save last 'book' btn user clicked in 'bookedClicked' global variable
  bookedClicked = itemName;
  return itemName;
}

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
