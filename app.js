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

// const galleryDialog = document.querySelector("[gallery-dialog]");
// const swiperContainer = document.getElementById("galleryDialog");
const galleryDialog = document.getElementById("galleryDialog");
const galleryContentDiv = galleryDialog.querySelector(".gallery-content");

let galleryContentLoaded = false;

function openGalleryDialog() {
  if (!galleryContentLoaded) {
    fetch("gallery-content.html") //load page
      .then((response) => response.text())
      .then((data) => {
        galleryContentDiv.innerHTML = data; //inject page into dialog within index.html
        galleryContentLoaded = true; // set flag to true
      })
      .catch((error) => console.error("Error loading gallery content:", error));
  }
  showDialog(galleryDialog);
  const swiperContainer = galleryContentDiv.querySelector(".mySwiper");
  if (swiperContainer) {
    setSwiperAttributes(); // Initialize Swiper after content is loaded
  }
}

function hideGalleryDialog() {
  const galleryDialog = document.getElementById("galleryDialog");
  hideDialog(galleryDialog);
}

// Function to show the dialog
function showDialog(dialog) {
  dialog.style.display = "block";
}

// Function to hide the
function hideDialog(dialog) {
  dialog.style.display = "none";
}

function setSwiperAttributes() {
  // Dynamically set Swiper attributes
  const swiperContainer = galleryContentDiv.querySelector(".mySwiper");

  // Initialize Swiper instance with options
  const swiper = new Swiper(swiperContainer, {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    direction: "vertical",
    spaceBetween: 30,
    mousewheel: true,
  });
}

// class GalleryDialog extends HTMLElement {
//   showModal() {
//     // Add your custom implementation here
//     this.style.display = "block";
//   }
// }

// const priceListDialog = document.getElementById('price-list-content');
const policyDialog = document.querySelector("[appointment-policy]");
const priceListDialog = document.getElementById("pricelist-dialog");

function openPriceListDialog(tabId) {
  fetch("pricelist-content.html") //load page
    .then((response) => response.text())
    .then((data) => {
      priceListDialog.innerHTML = data; //inject page into dialog within index.html
      //handler to show modal only if element of id provided exists
      const tabElement = document.getElementById(tabId);
      if (tabElement) {
        priceListDialog.showModal(tabElement.click());
      } else {
        console.error(`Element with ID ${tabId} not found.`);
      }
    })
    .catch((error) =>
      console.error("Error loading price-list content:", error)
    );
}

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
function checkDialogBounds(dialogName, dialogDimensions, e) {
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right
    // e.clientY < dialogDimensions.top ||
    // e.clientY > dialogDimensions.bottom
  ) {
    console.log("OUT OF BOUND, X: " + e.clientX + " Y: " + e.clientY);
    dialogName.close();
  } else {
    console.log("X: " + e.clientX + " Y: " + e.clientY);
  }
}
