document.querySelector('#log-out').addEventListener('click', (e) => {
  console.log('holaaaa')
  firebase.auth().signOut().then(function () {
    if (e.preventDefault) {
      window.location.assign('index.html')
    }
  }).catch(function (error) {

  });
})
'use strict'

//Preloader
var preloader = $('#spinner-wrapper');
$(window).on('load', function () {
  var preloaderFadeOutTime = 500;

  function hidePreloader() {
    preloader.fadeOut(preloaderFadeOutTime);
  }
  hidePreloader();
});

jQuery(document).ready(function ($) {

  //Incremental Coutner
  if ($.isFunction($.fn.incrementalCounter))
    $('#incremental-counter').incrementalCounter();

  //For Trigering CSS3 Animations on Scrolling
  if ($.isFunction($.fn.appear))
    $('.slideDown, .slideUp').appear();

  $('.slideDown, .slideUp').on('appear', function (event, $all_appeared_elements) {
    $($all_appeared_elements).addClass('appear');
  });

  //For Header Appearing in Homepage on Scrolling
  var lazy = $('#header.lazy-load')

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      lazy.addClass('visible');
    } else {
      lazy.removeClass('visible');
    }
  });

  //Initiate Scroll Styling
  if ($.isFunction($.fn.scrollbar))
    $('.scrollbar-wrapper').scrollbar();

  if ($.isFunction($.fn.masonry)) {

    // fix masonry layout for chrome due to video elements were loaded after masonry layout population
    // we are refreshing masonry layout after all video metadata are fetched.
    var vElem = $('.img-wrapper video');
    var videoCount = vElem.length;
    var vLoaded = 0;

    vElem.each(function (index, elem) {

      //console.log(elem, elem.readyState);

      if (elem.readyState) {
        vLoaded++;

        if (count == vLoaded) {
          $('.js-masonry').masonry('layout');
        }

        return;
      }

      $(elem).on('loadedmetadata', function () {
        vLoaded++;
        //console.log('vLoaded',vLoaded, this);
        if (videoCount == vLoaded) {
          $('.js-masonry').masonry('layout');
        }
      })
    });


    // fix masonry layout for chrome due to image elements were loaded after masonry layout population
    // we are refreshing masonry layout after all images are fetched.
    var $mElement = $('.img-wrapper img');
    var count = $mElement.length;
    var loaded = 0;

    $mElement.each(function (index, elem) {

      if (elem.complete) {
        loaded++;

        if (count == loaded) {
          $('.js-masonry').masonry('layout');
        }

        return;
      }

      $(elem).on('load', function () {
        loaded++;
        if (count == loaded) {
          $('.js-masonry').masonry('layout');
        }
      })
    });

  } // end of `if masonry` checking


  //Fire Scroll and Resize Event
  $(window).trigger('scroll');
  $(window).trigger('resize');
});

/** function for attaching sticky feature **/
function attachSticky() {
  // Sticky Chat Block
  $('#chat-block').stick_in_parent({
    parent: '#page-contents',
    offset_top: 70
  });

  // Sticky Right Sidebar
  $('#sticky-sidebar').stick_in_parent({
    parent: '#page-contents',
    offset_top: 70
  });

}

// Disable Sticky Feature in Mobile
$(window).on('resize', function () {

  if ($.isFunction($.fn.stick_in_parent)) {
    // Check if Screen wWdth is Less Than or Equal to 992px, Disable Sticky Feature
    if ($(this).width() <= 992) {
      $('#chat-block').trigger('sticky_kit:detach');
      $('#sticky-sidebar').trigger('sticky_kit:detach');

      return;
    } else {

      // Enabling Sticky Feature for Width Greater than 992px
      attachSticky();
    }

    // Firing Sticky Recalculate on Screen Resize
    return function (e) {
      return $(document.body).trigger('sticky_kit:recalc');
    };
  }
});

// Desarrollo de La publicacion de Post

const buttonPublish = document.querySelector('#buttonPublish')
const postEntrada = document.querySelector('#exampleTextarea');
const dataBase = document.querySelector('#create-post');
const posts = document.querySelector('#posts');

function reload_page() {
  window.location.reload();
};

buttonPublish.addEventListener('click', () => {
  if (postEntrada.value !== '') {
    const userId = firebase.auth().currentUser.uid;
    // writeNewPost(userId, postEntrada.value);
    writeNewPost(userId, postEntrada.value);
    postEntrada.value = '';
    // paintNewPost(userId, newPost);
    reload_page();
  } else {
    alert('Ingresar texto a publicar')
  }


});

window.onload = (() => {
  // if (postEntrada.value !== '') {
  let userId = firebase.auth().currentUser.uid;
  // let postId = writeNewPost(userId, postEntrada.value);
  // const newPost = writeNewPost(userId, postEntrada.value);
  firebase.database().ref().child('user-posts').child(userId).once('value', postKey => {
    postKey.forEach(keys => {
      let postId = keys.key;
      keys.forEach(body => {
        const buttonUpdate = document.createElement('i');
        // buttonUpdate.setAttribute('value', 'Update');
        buttonUpdate.setAttribute('class', 'far fa-edit post-icon');
        // buttonUpdate.setAttribute('type', 'button');
        const buttonDelete = document.createElement('i');
        buttonDelete.setAttribute('class', 'far fa-trash-alt post-icon');
        // buttonDelete.setAttribute('value', 'Delete');
        // buttonDelete.setAttribute('type', 'button');
        const buttonLike = document.createElement('i');
        buttonLike.setAttribute('class', 'far fa-heart post-icon');
        // buttonLike.setAttribute('src', 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4MC44NTIgNDgwLjg1MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgwLjg1MiA0ODAuODUyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTM0Ny43ODYsMTcxLjM2di0yLjA4Yy0yLjA1LTI3LjA3Mi0yNC42MS00Ny45OTQtNTEuNzYtNDhjLTMuOTY1LDAuMDYyLTcuOTEsMC41NzItMTEuNzYsMS41MiAgICBjLTE2Ljg3LTMxLjA2MS01NS43MjYtNDIuNTY0LTg2Ljc4Ni0yNS42OTRjLTEwLjg2Nyw1LjkwMi0xOS43OTIsMTQuODI3LTI1LjY5NCwyNS42OTRjLTMuOTI4LTAuOTY2LTcuOTU1LTEuNDc2LTEyLTEuNTIgICAgYy0yOC43MDEsMC4wNDQtNTEuOTU2LDIzLjI5OS01Miw1MmMwLDEuMzYsMCwyLjY0LDAsNGMtMTcuNjczLDEzLjI1NS0yMS4yNTUsMzguMzI3LTgsNTZjNy41NTQsMTAuMDcyLDE5LjQxLDE2LDMyLDE2aDU4LjQ4ICAgIGwyMiw1OC44YzEuMTcyLDMuMTM2LDQuMTcyLDUuMjExLDcuNTIsNS4yaDQ4YzQwLjUyOSwwLjA0MSw3NC41OTEtMzAuNDM1LDc5LjA0LTcwLjcydi0yLjg4ICAgIGMxMC42MDctOC4yNzcsMTYuODUzLTIwLjk0NiwxNi45Ni0zNC40QzM2My43OCwxOTIuMTUzLDM1Ny45MTMsMTc5LjcxNCwzNDcuNzg2LDE3MS4zNnogTTIyNS4zMDYsMjk3LjI4bC0xOC00OGgyMi45NmwxOCw0OCAgICBIMjI1LjMwNnogTTI2Ny43ODYsMjk3LjI4aC0yLjQ4bC02LTE2aDUwLjY0QzI5OC4zMzEsMjkxLjYwMywyODMuMzI2LDI5Ny4yOTcsMjY3Ljc4NiwyOTcuMjh6IE0zMjIuOTA2LDI2NS4yOGgtNjkuNmwtNi0xNmg3Mi40OCAgICBjMy4zMTEtMC4wMDgsNi42MTItMC4zODQsOS44NC0xLjEyQzMyOC4xOTEsMjU0LjE1MSwzMjUuOTMsMjU5LjkxMywzMjIuOTA2LDI2NS4yOHogTTM0My4wMjksMjIwLjgzOCAgICBjLTUuMTg4LDcuNzYzLTEzLjkwNSwxMi40My0yMy4yNDIsMTIuNDQyaC03NmMtMTUuNDY0LDAtMjgtMTIuNTM2LTI4LTI4czEyLjUzNi0yOCwyOC0yOHYtMTZjLTI0LjI4MiwwLjA0NC00My45NTYsMTkuNzE4LTQ0LDQ0ICAgIGMtMC4wMjgsMTAuMjI3LDMuNTQsMjAuMTM4LDEwLjA4LDI4aC0yMi4wOGMwLTIyLjA5MS0xNy45MDktNDAtNDAtNDB2MTZjMTMuMjU1LDAsMjQsMTAuNzQ1LDI0LDI0aC00MGMtMTMuMjU1LDAtMjQtMTAuNzQ1LTI0LTI0ICAgIHMxMC43NDUtMjQsMjQtMjR2LTE2Yy0yLjY4Ny0wLjAwMy01LjM2NywwLjI2NS04LDAuOGMxLjY2Mi0xOC42MjMsMTcuMzAzLTMyLjg3NCwzNi0zMi44YzQuNDMyLTAuMDE2LDguODI4LDAuNzk4LDEyLjk2LDIuNCAgICBjNC45NDQsMS45NzEsOS4zOTUsNS4wMDIsMTMuMDQsOC44OGMtMy45MSw2LjIwNC01Ljk5LDEzLjM4Ni02LDIwLjcyaDE2YzAtMTMuMjU1LDEwLjc0NS0yNCwyNC0yNHYtMTYgICAgYy04LjMyOCwwLjAzMS0xNi40MzgsMi42NTktMjMuMiw3LjUyYy0yLjk2OS0zLjA2LTYuMy01Ljc0Ny05LjkyLThjMTMuNjc1LTIyLjcxLDQzLjE3MS0zMC4wMzUsNjUuODgxLTE2LjM2ICAgIGMxNC4zMzYsOC42MzIsMjMuMTQxLDI0LjEwNywyMy4yMzksNDAuODRoMTZjLTAuMDA5LTUuMjM3LTAuNjgxLTEwLjQ1Mi0yLTE1LjUyYzEuOTg0LTAuMzE5LDMuOTktMC40NzksNi0wLjQ4ICAgIGMxOS44NTEsMCwzNS45NTYsMTYuMDY5LDM2LDM1LjkydjIuMTZjLTAuMDA0LDIuNjYxLDEuMzE1LDUuMTUsMy41Miw2LjY0QzM0OC4xNjQsMTkwLjU5MiwzNTEuNjIxLDIwNy45OCwzNDMuMDI5LDIyMC44Mzh6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjc1Ljc4NiwxNjkuMjh2MTZjMTMuMjU1LDAsMjQsMTAuNzQ1LDI0LDI0aDE2QzMxNS43ODYsMTg3LjE4OSwyOTcuODc4LDE2OS4yOCwyNzUuNzg2LDE2OS4yOHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NjEuMDY2LDMzLjI4Yy0xMi45MzItMi4yMTgtMjMuMDYyLTEyLjM0OC0yNS4yOC0yNS4yOGMwLTQuNDE4LTMuNTgyLTgtOC04cy04LDMuNTgyLTgsOCAgICBjLTIuMjE4LDEyLjkzMi0xMi4zNDgsMjMuMDYyLTI1LjI4LDI1LjI4Yy00LjQxOCwwLTgsMy41ODItOCw4czMuNTgyLDgsOCw4YzEyLjkzMiwyLjIxOCwyMy4wNjIsMTIuMzQ4LDI1LjI4LDI1LjI4ICAgIGMwLDQuNDE4LDMuNTgyLDgsOCw4czgtMy41ODIsOC04YzIuMjE4LTEyLjkzMiwxMi4zNDgtMjMuMDYyLDI1LjI4LTI1LjI4YzQuNDE4LDAsOC0zLjU4Miw4LThTNDY1LjQ4NSwzMy4yOCw0NjEuMDY2LDMzLjI4eiAgICAgTTQyNy43ODYsNTIuNzJjLTMuMTA0LTQuNDYzLTYuOTc3LTguMzM2LTExLjQ0LTExLjQ0YzQuNDYzLTMuMTA0LDguMzM2LTYuOTc3LDExLjQ0LTExLjQ0YzMuMTA0LDQuNDYzLDYuOTc3LDguMzM2LDExLjQ0LDExLjQ0ICAgIEM0MzQuNzY0LDQ0LjM4NCw0MzAuODksNDguMjU3LDQyNy43ODYsNTIuNzJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNODUuMDY2LDQwMS4yOGMtMTIuOTMyLTIuMjE4LTIzLjA2Mi0xMi4zNDgtMjUuMjgtMjUuMjhjMC00LjQxOC0zLjU4Mi04LTgtOHMtOCwzLjU4Mi04LDggICAgYy0yLjIxOCwxMi45MzItMTIuMzQ4LDIzLjA2Mi0yNS4yOCwyNS4yOGMtMy45MTIsMC42MzQtNi43NzEsNC4wMzctNi43Miw4Yy0wLjA1MSwzLjk2MywyLjgwOCw3LjM2Niw2LjcyLDggICAgYzEyLjkzMiwyLjIxOCwyMy4wNjIsMTIuMzQ4LDI1LjI4LDI1LjI4YzAsNC40MTgsMy41ODIsOCw4LDhzOC0zLjU4Miw4LThjMi4yMTgtMTIuOTMyLDEyLjM0OC0yMy4wNjIsMjUuMjgtMjUuMjggICAgYzQuNDE4LDAsOC0zLjU4Miw4LThTODkuNDg1LDQwMS4yOCw4NS4wNjYsNDAxLjI4eiBNNTEuNzg2LDQyMC43MmMtMy4xMDQtNC40NjMtNi45NzctOC4zMzYtMTEuNDQtMTEuNDQgICAgYzQuNDYzLTMuMTA0LDguMzM2LTYuOTc3LDExLjQ0LTExLjQ0YzMuMTA0LDQuNDYzLDYuOTc3LDguMzM2LDExLjQ0LDExLjQ0QzU4Ljc2NCw0MTIuMzg0LDU0Ljg5LDQxNi4yNTcsNTEuNzg2LDQyMC43MnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zODQuODI2LDI5Ny4yOGMtMi43Miw0LjMyLTUuNTIsOC41Ni04LjU2LDEyLjcybDEyLjg4LDkuNDRjMy4yOC00LjQ4LDYuNjQtOS4xMiw5LjI4LTE0LjE2TDM4NC44MjYsMjk3LjI4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTM2Ni42NjYsMzIyYy0zLjI4LDMuNzYtNi44OCw3LjUyLTEwLjU2LDExLjEybDExLjIsMTEuNDRjNC0zLjg0LDcuODQtNy45MiwxMS40NC0xMi4wOEwzNjYuNjY2LDMyMnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00MjAuMTA2LDE0NS4zNmwtMTUuNjgsNC4yNGMxLjQ0LDQuOTYsMi42NCw5LjkyLDMuNjgsMTQuODhsMTYtMy4xMkM0MjIuOTg2LDE1NS45Miw0MjEuNzA2LDE1MC40OCw0MjAuMTA2LDE0NS4zNnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zOTguNTg2LDI2OS45MmMtMS45Miw0LjY0LTQsOS4zNi02LjMyLDE0bDE0LjMyLDcuMTJjMi40OC00Ljk2LDUuMi05Ljc2LDYuOC0xNS4yTDM5OC41ODYsMjY5LjkyeiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTM0NC4wMjYsMzguNDhsLTkuMjgsMTMuMDRjNC4xNiwyLjk2LDgsNi4xNiwxMi4wOCw5LjQ0bDEwLjMyLTEyLjI0QzM1Mi45ODYsNDUuMiwzNDguNTg2LDQxLjc2LDM0NC4wMjYsMzguNDh6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzkwLjQyNiw4NS42bC0xMi42NCw5LjEyYzIuOTYsNC4xNiw1Ljg0LDguNDgsOCwxMi44OGwxMy43Ni04QzM5Ni43NDYsOTQuOCwzOTMuNzA2LDkwLjE2LDM5MC40MjYsODUuNnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zNjkuMzg2LDYwLjA4bC0xMS4zNiwxMS4yOGMzLjY4LDMuNiw3LjEyLDcuMzYsMTAuNCwxMS4yOGwxMi4yNC0xMC4zMkMzNzcuMTQ2LDY4LjA4LDM3My4zMDYsNjQuMzIsMzY5LjM4Niw2MC4wOHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00MDcuODY2LDExNGwtMTQuNCw3LjI4YzIuMTYsNC42NCw0LjI0LDkuMzYsNi4wOCwxNC4wOGwxNC44OC02LjA4QzQxMi41MDYsMTI0LjE2LDQxMC4yNjYsMTE4Ljk2LDQwNy44NjYsMTE0eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQwNy4yMjYsMjQwLjY0Yy0xLjA0LDQuOTYtMi40LDEwLTMuODQsMTQuOGwxNS4yOCw0LjcyYzEuOTItNS4yOCwzLjM2LTEwLjg4LDQuNTYtMTYuMTZMNDA3LjIyNiwyNDAuNjR6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDI2LjQyNiwxNzcuNzZsLTE2LDEuODRjMC42NCw1LjA0LDAuOTYsMTAuMjQsMS4yLDE1LjM2bDE2LTAuNTZDNDI3Ljc4NiwxODguOCw0MjcuMDY2LDE4My4yOCw0MjYuNDI2LDE3Ny43NnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00MTEuNzg2LDIxMC4yNGMwLDUuMTItMC43MiwxMC4yNC0xLjM2LDE1LjI4bDE2LDIuMDhjMC4zMi01LjQ0LDAuODgtMTEuMDQsMS4zNi0xNi41Nkw0MTEuNzg2LDIxMC4yNHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00My43ODYsMjEybC0xNiwwLjk2YzAsNS41MiwwLjg4LDExLjEyLDEuNjgsMTYuNTZsMTYtMi4yNEM0NC45MDYsMjIyLjI0LDQ0LjQyNiwyMTcuMjgsNDMuNzg2LDIxMnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zMTUuNzg2LDIxLjQ0bC02Ljk2LDE0LjRjNC41NiwyLjI0LDkuMTIsNC43MiwxMy40NCw3LjI4bDgtMTMuNzZDMzI1LjM4NiwyNi41NiwzMjAuNDI2LDIzLjkyLDMxNS43ODYsMjEuNDR6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDguMzQ2LDI0Mi40OGwtMTUuNiwzLjZjMS4yOCw1LjM2LDIuNzIsMTAuOCw0LjQsMTZsMTUuMjgtNC44QzUwLjgyNiwyNTIuNCw0OS41NDYsMjQ3LjQ0LDQ4LjM0NiwyNDIuNDh6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjguNzQ2LDE3OS4zNmMtMC40LDUuOTItMC45NiwxMS4zNi0wLjk2LDE2Ljk2aDE2YzAtNS4wNCwwLjQtMTAuMjQsMC45Ni0xNS4yOEwyOC43NDYsMTc5LjM2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTcxLjcwNiwyOTguNzJsLTEzLjYsOC40OGMyLjg4LDQuNjQsNi4wOCw5LjI4LDkuNDQsMTMuNzZsMTIuOC05LjZDNzcuMzA2LDMwNy4yOCw3NC4zNDYsMzAzLjM2LDcxLjcwNiwyOTguNzJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzUuNDY2LDE0Ni45NmMtMS42OCw1LjM2LTMuMDQsMTAuOC00LjA4LDE2LjI0bDE2LDMuMDRjMC45Ni01LjA0LDIuMTYtMTAsMy41Mi0xNC45NkwzNS40NjYsMTQ2Ljk2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTkwLjAyNiwzMjMuMjhsLTEyLDEwLjU2YzMuNjgsNC4xNiw4LDgsMTEuNiwxMmwxMS4wNC0xMS41MkM5Ni45ODYsMzMwLjgsOTMuMzg2LDMyNy4wNCw5MC4wMjYsMzIzLjI4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ2LjkwNiwxMTUuODRjLTIuNCw1LjQ0LTQuNTYsMTAuMTYtNi40OCwxNS4yOGwxNC45Niw1LjY4YzEuODY3LTQuOCwzLjg2Ny05LjUyLDYtMTQuMTZMNDYuOTA2LDExNS44NHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0xMTIuMTg2LDM0NC4wOGwtMTAuMDgsMTIuOGM0LjI0LDMuNDQsOC44LDYuOCwxMy4zNiw5LjkybDguOTYtMTMuNTJDMTIwLjI2NiwzNTAuNCwxMTYuNDI2LDM0Ny4yOCwxMTIuMTg2LDM0NC4wOHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0xMzcuNDY2LDM2MS42bC03Ljg0LDE0YzQuOCwyLjY0LDkuNzYsNS4yLDE0Ljg4LDcuNTJsNi42NC0xNC40OEMxNDYuNTA2LDM2Ni40OCwxNDEuOTQ2LDM2NC4xNiwxMzcuNDY2LDM2MS42eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTMxOS41NDYsMzYwLjU2Yy00LjQsMi40OC04Ljk2LDQuODgtMTMuNiw3LjEybDYuODgsMTQuNzJjNS4wNC0yLjQsMTAtNS4wNCwxNC43Mi04TDMxOS41NDYsMzYwLjU2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTU3LjYyNiwyNzEuNTJsLTE0LjcyLDYuMDhjMi4wOCw1LjEyLDQuNCwxMC4yNCw2Ljk2LDE1LjEybDE0LjI0LTcuMjhDNjEuODEzLDI4MC45MDcsNTkuNjUzLDI3Ni4yNjcsNTcuNjI2LDI3MS41MnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik02My4zODYsODYuOTZjLTIuOTYsNC41Ni01LjkyLDkuMzYtOC43MiwxNC4wOGwxMy44NCw4YzIuNTYtNC4zMiw1LjM2LTguNzIsOC0xMi44OEw2My4zODYsODYuOTZ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNODQuOTA2LDYxLjM2Yy0zLjkyLDQtOCw4LTExLjIsMTIuNGwxMi4zMiwxMC4xNmMzLjI4LTMuODQsNi43Mi03LjY4LDEwLjMyLTExLjM2TDg0LjkwNiw2MS4zNnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0xMTAuMDI2LDM5LjZjLTQuNDgsMy4yOC04LjgsNi43Mi0xMy4wNCwxMC4zMmwxMC44LDEyLjE2YzMuODQtMy4zNiw4LTYuNTYsMTItOS42TDExMC4wMjYsMzkuNnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yMDEuOTQ2LDIuOTZjLTUuNTM3LDAuNjU0LTExLjAzOCwxLjU4OS0xNi40OCwyLjhsMy40NCwxNS42YzQuOTYtMS4wNCwxMC0xLjkyLDE1LjA0LTIuNTZMMjAxLjk0NiwyLjk2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTE2OS4zODYsOS45MmMtNS4yOCwxLjYtMTAuNTYsMy41Mi0xNiw1LjUybDYsMTQuODhjNC43Mi0xLjg0LDkuNi0zLjYsMTQuNC01LjA0TDE2OS4zODYsOS45MnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yMTguNTA2LDEuMjhsMC43MiwxNmM1LjEyLDAsMTAuMjQsMCwxNS4zNiwwbDAuNTYtMTZDMjI5LjYyNiwxLjI4LDIyNC4wMjYsMS4yOCwyMTguNTA2LDEuMjh6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjg0LjM0Niw5LjI4bC00LjQ4LDE1LjI4YzQuODgsMS41Miw5Ljc2LDMuMTIsMTQuNDgsNC45Nmw1LjQ0LTE0LjcyQzI5NC45ODYsMTIuOCwyODkuNzA2LDEwLjk2LDI4NC4zNDYsOS4yOHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yNTEuNzg2LDIuNzJsLTEuOTIsMTZjNS4wNCwwLjY0LDEwLjA4LDEuNDQsMTUuMTIsMi40OGwzLjItMTZDMjYyLjc0Niw0LjI0LDI1Ny4yMjYsMy4zNiwyNTEuNzg2LDIuNzJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTM4LjQyNiwyMi4yNGMtNC44OCwyLjQ4LTkuNzYsNS4yLTE0LjU2LDhsOCwxMy42OGM0LjM3My0yLjY2Nyw4Ljg1My01LjE0NywxMy40NC03LjQ0TDEzOC40MjYsMjIuMjR6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzQ0Ljc0NiwzNDMuMzZjLTMuOTIsMy4yLTgsNi4zMi0xMi4yNCw5LjJsOS4xMiwxMy4yYzQuNTYtMy4yLDkuMDQtNi41NiwxMy4yOC0xMC4wOEwzNDQuNzQ2LDM0My4zNnoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zNjIuNDk5LDExNC45OTZDMzU0LjY4LDEwMi43NzYsMzQ1LjIzNiw5MS42NzUsMzM0LjQyNiw4MkMyNjguODEsMjIuODE0LDE2Ny42MzgsMjguMDI3LDEwOC40NTIsOTMuNjQzICAgIHMtNTMuOTczLDE2Ni43ODgsMTEuNjQzLDIyNS45NzRjNi42MDksNS45NjEsMTMuNzA0LDExLjM2MSwyMS4yMTIsMTYuMTQzYzE0LjEwMSw5LjA4NSwyMi41ODEsMjQuNzQ2LDIyLjQ4LDQxLjUydjQwICAgIGMwLjAxOSwxNC44NTMsMTAuMjU2LDI3Ljc0MSwyNC43MiwzMS4xMmM0LjE3MywyMS42OTQsMjUuMTQxLDM1Ljg5Nyw0Ni44MzUsMzEuNzI1YzE2LjA2OC0zLjA5MSwyOC42MzQtMTUuNjU2LDMxLjcyNS0zMS43MjUgICAgYzE0LjQ2NC0zLjM3OSwyNC43MDEtMTYuMjY3LDI0LjcyLTMxLjEydi00MGMtMC4xNDktMTYuNjQyLDguMjA4LTMyLjIwOCwyMi4xNi00MS4yOCAgICBDMzg4LjM4MiwyODguMzc5LDQxMC4xMiwxODkuNDMyLDM2Mi40OTksMTE0Ljk5NnogTTIyNy43ODYsNDY1LjI4Yy0xMC4xNzUsMC4wMDUtMTkuMjQ4LTYuNDA3LTIyLjY0LTE2aDQ1LjI4ICAgIEMyNDcuMDM1LDQ1OC44NzMsMjM3Ljk2Miw0NjUuMjg1LDIyNy43ODYsNDY1LjI4eiBNMjU5Ljc4Niw0MzMuMjhoLTY0Yy04LjgzNywwLTE2LTcuMTYzLTE2LTE2aDk2ICAgIEMyNzUuNzg2LDQyNi4xMTcsMjY4LjYyMyw0MzMuMjgsMjU5Ljc4Niw0MzMuMjh6IE0yNzUuNzg2LDQwMS4yOGgtOTZ2LTE2aDk2VjQwMS4yOHogTTMzNS4wMjcsMjk3LjI1NiAgICBjLTguNjkzLDkuNzExLTE4LjY2NCwxOC4xOTYtMjkuNjQxLDI1LjIyNGgtMC4wOGMtMTYuMjQxLDEwLjQyNC0yNi45MTEsMjcuNjItMjkuMDQsNDYuOGgtMTYuNDh2LTQwaC0xNnY0MGgtMzJ2LTQ4aC0xNnY0OCAgICBoLTE2LjQ4Yy0yLjI1Ny0xOS4yNjItMTMuMDMyLTM2LjQ5Ni0yOS4zNi00Ni45NmMtNjYuODIzLTQzLjEyMy04Ni4wMzUtMTMyLjI1Mi00Mi45MTItMTk5LjA3NCAgICBjMjMuMjg2LTM2LjA4NCw2MS40NjMtNTkuODkxLDEwNC4xMTItNjQuOTI2YzUuNTIzLTAuNjU3LDExLjA3OC0xLjAwNCwxNi42NC0xLjA0YzM1LjQ0OC0wLjE3Niw2OS42ODQsMTIuODkxLDk2LDM2LjY0ICAgIEMzODMuMDQsMTQ2Ljk2NiwzODguMDczLDIzOC4wMDMsMzM1LjAyNywyOTcuMjU2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=')
        // buttonLike.setAttribute('value', 'Me gusta');
        // buttonLike.setAttribute('type', 'button');
        const contenidoPost = document.createElement('div');
        contenidoPost.className = 'contenidoPost';
        const textoPost = document.createElement('textarea')
        textoPost.setAttribute('id', postId);
        textoPost.setAttribute('class', 'form-control');
        textoPost.innerHTML = body.val();
        // textoPost.innerHTML = postEntrada.value;
        textoPost.disabled = true;

        buttonDelete.addEventListener('click', () => {

          firebase.database().ref().child('user-posts').child(userId).child(postId).remove();
          firebase.database().ref().child('posts').child(postId).remove();

          //   while(posts.firstChild) posts.removeChild(posts.firstChild);

          alert('The user is deleted successfully!');
          reload_page();

        });

        let aux = 0;
        buttonUpdate.addEventListener('click', () => {
          if (aux === 0) {
            textoPost.disabled = false;
            aux = 1;
          } else {
            textoPost.disabled = true;
            aux = 0;
          }
          const newUpdate = document.getElementById(postId);
          const nuevoPost = {
            body: newUpdate.value,
          };

          const updatesUser = {};
          const updatesPost = {};

          updatesUser['/user-posts/' + userId + '/' + postId] = nuevoPost;
          /*       updatesPost['/posts/' + newPost] = nuevoPost; */
          firebase.database().ref().update(updatesUser);
          firebase.database().ref().update(updatesPost);
        });

        contenidoPost.appendChild(textoPost);
        contenidoPost.appendChild(buttonUpdate);
        contenidoPost.appendChild(buttonDelete);
        contenidoPost.appendChild(buttonLike);
        posts.appendChild(contenidoPost);
        // postEntrada.value = '';
      });
    })
  })
  /* console.log(firebase.database().ref().child('user-posts').child(userId).key)
    var dbRefPost = firebase.database().ref().child('user-posts');
    var dbRefPostUser = dbRefPost.child(userId);
    dbRefPostUser.on('child_added', snap => {
      snap.forEach(body => {
        const buttonUpdate = document.createElement('input');
        buttonUpdate.setAttribute('value', 'Update');
        buttonUpdate.setAttribute('type', 'button');
        const buttonDelete = document.createElement('input');
        buttonDelete.setAttribute('value', 'Delete');
        buttonDelete.setAttribute('type', 'button');
        const buttonLike = document.createElement('input');
        buttonLike.setAttribute('value', 'Me gusta');
        buttonLike.setAttribute('type', 'button');
        const contenidoPost = document.createElement('div');
        contenidoPost.className = 'contenidoPost';
        const textoPost = document.createElement('textarea')
        textoPost.setAttribute('id', '');
        textoPost.innerHTML = body.val();
        // textoPost.innerHTML = postEntrada.value;
        textoPost.disabled = true;

        

        contenidoPost.appendChild(textoPost);
        contenidoPost.appendChild(buttonUpdate);
        contenidoPost.appendChild(buttonDelete);
        contenidoPost.appendChild(buttonLike);
        posts.appendChild(contenidoPost);
        // postEntrada.value = '';
      });
    }); */
  // } else {
  //   alert('Ingresar texto a publicar')
  // }
})
