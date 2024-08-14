const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 960 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeNav = document.querySelector('#home-navbar');
  const aboutNav = document.querySelector('#about-navbar');
  const servicesNav = document.querySelector('#services-navbar');
  const contactNav = document.querySelector('#contact-navbar');
  let scrollPos = window.scrollY;
  console.log(scrollPos);
  // console.log(scrollPos);

  // adds 'highlight' class to my menu items
  if (window.innerWidth > 960 && scrollPos < 600) {
    homeNav.classList.add('highlight');
    aboutNav.classList.remove('highlight');
    servicesNav.classList.remove('highlight');
    contactNav.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 1800) {
    aboutNav.classList.add('highlight');
    homeNav.classList.remove('highlight');
    servicesNav.classList.remove('highlight');
    contactNav.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 2700) {
    servicesNav.classList.add('highlight');
    homeNav.classList.remove('highlight');
    aboutNav.classList.remove('highlight');
    contactNav.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 4300) {
    contactNav.classList.add('highlight');
    servicesNav.classList.remove('highlight');
    homeNav.classList.remove('highlight');
    aboutNav.classList.remove('highlight');
    return;
  }

  if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
    elem.classList.remove('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);


// const priceListDialog = document.getElementById('price-list-content');
const priceListDialog = document.querySelector("[price-list]");

function openPriceListDialog(tabId) {
  fetch('price-list-content.html')//load page
    .then(response => response.text())
    .then(data => {
      priceListDialog.innerHTML = data;//inject page into dialog within index.html
      
      //handler to show modal only if element of id provided exists
      const tabElement = document.getElementById(tabId);
      if (tabElement) {
        priceListDialog.showModal(tabElement);
      } else {
        console.error(`Element with ID ${tabId} not found.`);
      }
    })
    .catch(error => console.error('Error loading gallery content:', error));
}

// listener to get bounds to close if user clicks outside of dialog
priceListDialog.addEventListener("click", e => {
const dialogDimensions = priceListDialog.getBoundingClientRect();
checkDialogBounds(priceListDialog, dialogDimensions, e);
});



const policyDialog = document.querySelector("[appointment-policy]");
policyDialog.addEventListener("click", e => {
const dialogDimensions = policyDialog.getBoundingClientRect();       
checkDialogBounds(policyDialog, dialogDimensions, e);
});

// const galleryDialog = document.querySelector("[gallery-dialog]");
// galleryDialog.addEventListener("click", e => {
// const dialogDimensions = galleryDialog.getBoundingClientRect();       
// checkDialogBounds(galleryDialog, dialogDimensions, e);
// });

//reusable function to open/close dialog
function checkDialogBounds(dialogName, dialogDimensions, e) {
  if (e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom) {
      console.log("OUT OF BOUND, X: "+ e.clientX + " Y: "+e.clientY );
      dialogName.close();
  }
  else {
      console.log("X: "+ e.clientX + " Y: "+e.clientY );
  }
}