const username = document.getElementById("name");
const photo = document.getElementById("photo");

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
    $("#incremental-counter").incrementalCounter();

  //For Trigering CSS3 Animations on Scrolling
  if ($.isFunction($.fn.appear))
    $(".slideDown, .slideUp").appear();

  $(".slideDown, .slideUp").on('appear', function (event, $all_appeared_elements) {
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
window.onload=()=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      username.innerHTML = `Bienvenida ${user.displayName}`;
      username.innerHTML = `Bienvenida ${user.photoURL}`;

    } else {
      console.log('No user is signed in.');
      
    }
  });
}
// Disable Sticky Feature in Mobile
$(window).on("resize", function () {

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
      return $(document.body).trigger("sticky_kit:recalc");
    };
  }
});

// Fuction for map initialization
/* function initMap() {
  var uluru = { lat: 12.927923, lng: 77.627108 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru,
    zoomControl: true,
    scaleControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
} */

// Desarrollo de La publicacion de Post
const buttonPublish = document.getElementById("buttonPublish")
const postEntrada = document.getElementById('exampleTextarea');
const dataBase = document.querySelector("#create-post");
const posts = document.getElementById("posts");

function reload_page() {
  window.location.reload();
};


buttonPublish.addEventListener('click', (event) => {

  if (postEntrada.value !== "") {
    const userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId, postEntrada.value);

    const buttonUpdate = document.createElement("input");
    buttonUpdate.setAttribute("value", "Update");
    buttonUpdate.setAttribute("type", "button");
    const buttonDelete = document.createElement("input");
    buttonDelete.setAttribute("value", "Delete");
    buttonDelete.setAttribute("type", "button");
    buttonDelete.setAttribute("id", delete);

    const buttonLike = document.createElement("input");
    buttonLike.setAttribute("value", "Me gusta");
    buttonLike.setAttribute("type", "button");
    const cantidadLikes = document.createElement("span");
    // cantidadLikes.style.display="none";
    const contenidoPost = document.createElement('div');
    contenidoPost.className = 'contenidoPost';
    const textoPost = document.createElement('textarea')
    textoPost.setAttribute("id", newPost);
    textoPost.innerHTML = postEntrada.value;
    textoPost.disabled = true;

    buttonDelete.addEventListener('click', () => {
      firebase.database().ref().child('/user-posts/' + userId + newPost).remove();
      firebase.database().ref().child('/posts/' + userId + newPost).remove();
      while (posts.firstChild) posts.removeChild(posts.firstChild);
      alert('The user is deleted successfully!');
      reload_page();
    });
    if (event.target.id == newPost) {
      document.querySelector("#contenidoPost").disabled = false;
      buttonUpdate.addEventListener('click', () => {

        const newUpdate = document.getElementById(newPost);
        const nuevoPost = {
          body: newUpdate.value,
        };

        const updatesUser = {};
        const updatesPost = {};

        updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
        /* updatesPost['/posts/' + newPost] = nuevoPost; */
        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);
      });
    }
    let count_click = 0;
    buttonLike.addEventListener('click', () => {

      count_click += 1;
      // cantidadLikes.style.display="block";
      cantidadLikes.innerHTML = "A " + count_click + " le gustan este post"
      const nuevoPost = {
        body: postEntrada.value,
        countLikes:count_click,
      };

      const updatesUser = {};
      const updatesPost = {};

      updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
      /* updatesPost['/posts/' + newPost] = nuevoPost; */
      firebase.database().ref().update(updatesUser);
      firebase.database().ref().update(updatesPost);
    })

    contenidoPost.appendChild(textoPost);
    contenidoPost.appendChild(buttonUpdate);
    contenidoPost.appendChild(buttonDelete);
    contenidoPost.appendChild(buttonLike);
    contenidoPost.appendChild(cantidadLikes);
    posts.appendChild(contenidoPost);
    postEntrada.value = "";
  } else {
    alert("Ingresar texto a publicar")
  }
});
document.getElementById("delete").addEventListener('click', () => {
  firebase.database().ref().child('/user-posts/' + userId + newPost).remove();
  firebase.database().ref().child('/posts/' + userId + newPost).remove();
  while (posts.firstChild) posts.removeChild(posts.firstChild);
  alert('The user is deleted successfully!');
  reload_page();
});