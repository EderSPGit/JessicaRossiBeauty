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
  // console.log(scrollPos);

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

// ---------------------- Pricelist mytabs Function -------------------------------------------
function updateCurrentTabId() {
  let currentTab = null;
  // Add event listeners to update currentTab when a tab is selected
  const radioButtons = document.querySelectorAll('input[name="mytabs"]');
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", (event) => {
      currentTab = getCurrentPriceListTabId();
      console.log("Current Tab updated to: " + currentTab);
    });
  });
}
function getCurrentPriceListTabId() {
  let currentTabElement = document.querySelector(
    'input[name="mytabs"]:checked'
  );
  //if currentTabElement exists...
  if (currentTabElement) {
    return currentTabElement.id;
  } else {
    return null;
  }
}
// ---------------------- Pricelist Tab Btns END -------------------------------------------
// ---------------------- Policy Functions -------------------------------------------------
let englishContent = null;
let brazilianContent = null;
let englishRadio = null;
let brazilianRadio = null;

function showPolicyContent() {
  if (!englishRadio || !brazilianRadio || !englishContent || !brazilianContent) {
    // Attempt to find them again if they weren't found at initial load
    englishRadio = document.getElementById('policy-english-btn');
    brazilianRadio = document.getElementById('policy-brazilian-btn');
    englishContent = document.getElementById('policy-english-content');
    brazilianContent = document.getElementById('policy-brazilian-content');

    if (!englishRadio || !brazilianRadio || !englishContent || !brazilianContent) {
      console.error("Policy content elements not found in showPolicyContent.");
      return;
    }
  }

  if (englishRadio.checked) {
    englishContent.classList.add('active');
    brazilianContent.classList.remove('active');
  } else if (brazilianRadio.checked) {
    brazilianContent.classList.add('active');
    englishContent.classList.remove('active');
  } else {
    // Default to English if neither is checked (e.g., initial state)
    englishContent.classList.add('active');
    brazilianContent.classList.remove('active');
  }
}
function updateCurrentTabId() {
  let currentTab = null;
  // Add event listeners to update currentTab when a tab is selected
  const radioButtons = document.querySelectorAll('input[name="mytabs"]');
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", (event) => {
      currentTab = getCurrentPriceListTabId();
      console.log("Current Tab updated to: " + currentTab);
    });
  });
}

function getCurrentLanguage() {
  let currentLanguage = document.querySelector('input[name="policy-lang"]:checked');
  if (currentLanguage) {
    return currentLanguage.id;
  } else {
    return null;
  }
}

function openPolicyDialog(languageIdToShow) {

  const policyDialog = document.getElementById('policy-dialog');
  if (!policyDialog) {
    console.error("Policy dialog with ID 'policy-dialog' not found.");
    return;
  }

  const targetRadioButton = document.getElementById(languageIdToShow);
  if (!targetRadioButton) {
    console.error(`Radio button with ID ${languageIdToShow} not found.`);
    return;
  }
  targetRadioButton.checked = true;

  showPolicyContent();
  policyDialog.showModal(targetRadioButton.click());
  updateCurrentLanguageId();
}

function updateCurrentLanguageId() {
  let currentLanguage = null;
  // Add event listeners to update currentLanguage when a radio btn is selected
  const radioButtons = document.querySelectorAll('input[name="policy-lang"]');
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", (event) => {
      currentLanguage = getCurrentLanguage();
      console.log("Current language updated to: " + currentLanguage);
    });
  });
}

function getCurrentLanguage() {
  let currentLanguage = document.querySelector(
    'input[name="policy-lang"]:checked'
  );
  //if currentLanguage exists...
  if (currentLanguage) {
    return currentLanguage.id;
  } else {
    return null;
  }
}
// ---------------------- Policy Functions END-------------------------------------------
//---------------------- Pricelist Functions --------------------------------------------
function openPriceListDialog(tabId) {
  fetch("pricelist-content.html")
    .then((response) => response.text())
    .then((data) => {
      const priceListDialog = document.getElementById("pricelist-dialog");
      priceListDialog.innerHTML = data;

      const tabElement = document.getElementById(tabId);
      if (tabElement) {
        priceListDialog.showModal(tabElement.click());
        updateCurrentTabId();
      } else {
        console.error(`Element with ID ${tabId} not found.`);
      }

      assignDataNames();
      addSelectBtnsEventListener();

      // Book button listener
      const bookBtn = document.getElementById("book-btn");
      if (bookBtn) {
        bookBtn.addEventListener("click", () => {
          if (selectedTreatments.length === 0) {
            alert("Please select at least one treatment.");
            return;
          }
          openCalendar();
        });
      }
    })
    .catch((error) =>
      console.error("Error loading price-list content:", error)
    );
}

let selectedTreatments = [];

function addSelectBtnsEventListener() {
  const selectBtns = document.querySelectorAll(".select-btn");

  selectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");

      if (selectedTreatments.includes(name)) {
        // Unselect
        selectedTreatments = selectedTreatments.filter(item => item !== name);
        btn.classList.remove("selected");
        btn.textContent = "Select";
      } else {
        // Select
        selectedTreatments.push(name);
        btn.classList.add("selected");
        btn.textContent = "Selected";
      }

      console.log("Selected Treatments:", selectedTreatments);
    });
  });
}

function assignDataNames() {
  document.querySelectorAll('.treatment').forEach(treatment => {
    const itemName = treatment.querySelector('.item_name')?.innerText?.trim();
    const btn = treatment.querySelector('.select-btn');

    if (itemName && btn) {
      btn.setAttribute('data-name', itemName);
    }
  });
}
//---------------------- Pricelist Functions END --------------------------------------------
//---------------------- FLATPICKR LOGIC ----------------------------------------------------
function openCalendar() {
  const dialog = document.getElementById("fpickr-dialog");
  dialog.showModal();

  const calendarBox = document.querySelector(".fpickr-box");
  calendarBox.innerHTML = '<input id="fp-input" type="text" placeholder="Select date and time" />';


  // Wait for DOM to update before attaching Flatpickr
  setTimeout(() => {
    const fpInput = document.getElementById("fp-input");

    flatpickr(fpInput, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      minDate: "today",
      appendTo: calendarBox,
      disableMobile: true,
      onClose: (selectedDates, dateStr) => {
        selectedDate = dateStr;
      },
    }).open();
  }, 0);
}


document.getElementById("confirm-btn").addEventListener("click", () => {
  if (!selectedDate || selectedTreatments.length === 0) {
    alert("Please select treatments and a date.");
    return;
  }

  const phone = "353830110511";
  const services = selectedTreatments.map(item => `✔️ ${item}`).join("\n");
  const formattedDate = formatDate(selectedDate);
  const message = `Hi Jessica! I'd like to book the following services:\n\n${services}\n\nPreferred Date & Time:\n${formattedDate}`;
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

  // Reset
  selectedTreatments = [];
  selectedDate = null;
});

document.getElementById("cancel-btn").addEventListener("click", () => {
  const dialog = document.getElementById("fpickr-dialog");
  dialog.close();
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} at ${hours}:${minutes}`;
}
//---------------------- FLATPICKR LOGIC END ----------------------------------------------------
//---------------------- DIALOG LOGIC ----------------------------------------------------
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

// Reusable function to open/close dialog
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

// Future update
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