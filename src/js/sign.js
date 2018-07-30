/* STYLE */
(function ($) {
  "use strict";
  //  [ Focus input ]
  $('.input100').each(function () {
    $(this).on('blur', function () {
      if ($(this).val().trim() != "") {
        $(this).addClass('has-val');
      } else {
        $(this).removeClass('has-val');
      }
    })
  })
})(jQuery);

const displayLeft = document.querySelector('#display-left');
const displayRight = document.querySelector('#display-right');
const leftContainer = document.querySelector('#left-container');
const rightContainer = document.querySelector('#right-container');
let auxDisplayContainer = 0;

displayOneContainer = () => {
  displayLeft.addEventListener('click', () => {
    if (auxDisplayContainer === 0) {
      leftContainer.style.display = 'flex';
      rightContainer.style.display = 'none';
      auxDisplayContainer = 1;
    } else {
      leftContainer.style.display = 'none';
      rightContainer.style.display = 'flex';
      auxDisplayContainer = 0;
    }
  })
  displayRight.addEventListener('click', () => {
    if (auxDisplayContainer === 0) {
      leftContainer.style.display = 'flex';
      rightContainer.style.display = 'none';
      auxDisplayContainer = 1;
    } else {
      leftContainer.style.display = 'none';
      rightContainer.style.display = 'flex';
      auxDisplayContainer = 0;
    }
  })
}
const widthWindow = window.matchMedia("(min-width: 768px)");
displayContainers = (x) => {
  if (x.matches) { // If media query matches
    leftContainer.style.display = 'flex';
    rightContainer.style.display = 'flex';
  } else {
    leftContainer.style.display = 'none';
    displayOneContainer();
  }
}
displayContainers(widthWindow) // Call listener function at run time
widthWindow.addListener(displayContainers)