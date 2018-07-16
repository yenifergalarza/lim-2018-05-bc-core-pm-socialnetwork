document.querySelector('#log-out').addEventListener('click', (e) => {
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
const profile = document.getElementById('profile')
let count_click = 0;

function reload_page() {
  window.location.reload();
};

buttonPublish.addEventListener('click', () => {
  if (postEntrada.value !== '') {
    const userId = firebase.auth().currentUser.uid;
    // writeNewPost(userId, postEntrada.value);
    writeNewPost(userId, postEntrada.value, count_click);
    postEntrada.value = '';
    // paintNewPost(userId, newPost);
  } else {
    alert('Ingresar texto a publicar')
  }


});

window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      profile.innerHTML = `<img src="${user.photoURL}" alt="user" class="profile-photo" />
                            <h5>
                              <a href="timeline.html" id="name"class="text-white">${user.displayName}</a>
                            </h5>'
                            <a href="#" class="text-white"><i class="ion ion-android-person-add"></i> 1,299 followers</a>
                          `
      let userId = firebase.auth().currentUser.uid;
      firebase.database().ref().child('user-posts').child(userId).once('value', postKey => {
        postKey.forEach(keys => {
          let postId = keys.key;
          keys.forEach(body => {
            const buttonUpdate = document.createElement('i');
            buttonUpdate.setAttribute('class', 'far fa-edit post-icon');
            const buttonDelete = document.createElement('i');
            buttonDelete.setAttribute('class', 'far fa-trash-alt post-icon');
            const buttonLike = document.createElement('i');
            buttonLike.setAttribute('class', 'far fa-heart post-icon');
            const cantidadLikes = document.createElement("span");
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

            buttonLike.addEventListener('click', () => {

              count_click += 1;
              // cantidadLikes.style.display="block";
              cantidadLikes.innerHTML = "A " + count_click + " le gustan este post";
              const nuevoPost = {
                body: postEntrada.value,
                countlike: count_click,
              };

              const updatesUser = {};
              const updatesPost = {};

              updatesUser['/user-posts/' + userId + '/' + postId] = nuevoPost;
              updatesPost['/posts/' + postId] = nuevoPost;
              firebase.database().ref().update(updatesUser);
              firebase.database().ref().update(updatesPost);
            })
            contenidoPost.appendChild(textoPost);
            contenidoPost.appendChild(buttonUpdate);
            contenidoPost.appendChild(buttonDelete);
            contenidoPost.appendChild(buttonLike);
            contenidoPost.appendChild(cantidadLikes);
            posts.appendChild(contenidoPost);
          });
        })
      })
    }
  })
}
