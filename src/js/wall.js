document.querySelector('#log-out').addEventListener('click', (e) => {
  firebase.auth().signOut().then(function () {
    if (e.preventDefault) {
      window.location.assign('index.html')
    }
  }).catch(function (error) {

  });
})

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
    reload_page();
    // paintNewPost(userId, newPost);
  } else {
    alert('Ingresar texto a publicar')
  }


});

const createPost = (postId, keys) => {

  posts.innerHTML += `<div id="${postId}">
      <textarea class="form-control" id="${postId}" disabled>${keys.val().body}</textarea>
      <i  dataU-postId="${postId}" class="far fa-edit post-icon btn-update"></i>
      <i  data-postId="${postId}" class="far fa-trash-alt post-icon btn-delete"></i>
      <i  dataL-postId="${postId}" class="far fa-heart post-icon btn-like"></i>
      <span  class="countLikes">${keys.val().countlike}</span>
      <span class="hidden count_click_likes">${keys.val().countlike}</span>
      </div>
    `
}

const paintPost = (postKey, userId) => {
  console.log(postKey)
  postKey.forEach(keys => {
    let postId = keys.key;
    createPost(postId, keys);
    let aux = 0;
    const buttonsUpdate = document.querySelectorAll('.btn-update');
    buttonsUpdate.forEach(button => {
      button.addEventListener('click', () => {
        const postId = button.getAttribute('dataU-postId')
        if (aux === 0) {
          document.getElementById(postId).disabled = false;
          aux = 1;
        } else {
          document.getElementById(postId).disabled = true;
          aux = 0;
        }
        const newUpdate = document.getElementById(postId);
        const nuevoPost = {
          body: newUpdate.value,
          countlike: count_click,
        };

        const updatesUser = {};
        const updatesPost = {};

        updatesUser['/user-posts/' + userId + '/' + postId] = nuevoPost;
        updatesPost['/posts/' + postId] = nuevoPost;
        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);

      })

    })

    const buttonsLike = document.querySelectorAll('.btn-like');
    console.log(buttonsLike)

    buttonsLike.forEach(button => {
      button.addEventListener('click', () => {
        const postId = button.getAttribute('dataL-postId');
        let contador_click = document.querySelector('#' + postId + '.count_click_likes').innerHTML;
        contador_click === "undefined" ? contador_click = 0 : "";
        contador_click = parseInt(contador_click, 10) + 1;
        document.querySelector('#' + postId + ' .count_click_likes').innerHTML = contador_click;
        document.querySelector('#' + postId + ' .countLikes').innerHTML = "A " + contador_click + " le gustan este post";

        const nuevoPost = {
          body: keys.val().body,
          countlike: contador_click,
        };

        const updatesUser = {};
        const updatesPost = {};

        updatesUser['/user-posts/' + userId + '/' + postId] = nuevoPost;
        updatesPost['/posts/' + postId] = nuevoPost;
        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);

      });
    })
  })
}

window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      if (user) {
        profile.innerHTML = `<img src="${user.photoURL}" alt="user" class="profile-photo" />
        <h5>
          <a href="timeline.html" id="name"class="text-white">${user.displayName}</a>
        </h5>'
        <a href="#" class="text-white"><i class="ion ion-android-person-add"></i> 1,299 followers</a>
      `
      } else {
        profile.innerHTML = `<img src="?" alt="user" class="profile-photo" />
        <h5>
          <a href="timeline.html" id="name"class="text-white">${user.displayName}</a>
        </h5>'
        <a href="#" class="text-white"><i class="ion ion-android-person-add"></i> 1,299 followers</a>
      `
      }
      let userId = firebase.auth().currentUser.uid;
      const dbRefPost = firebase.database().ref().child('user-posts').child(userId);
      dbRefPost.once('value', postKey => {
        paintPost(postKey, userId);
        // console.log(document.querySelectorAll('.btn-delete'))
        const buttonsDelete = document.querySelectorAll('.btn-delete');
        buttonsDelete.forEach(button => {
          // console.log(button);
          button.addEventListener('click', () => {
            const postId = button.getAttribute('data-postId')
            dbRefPost.child(postId).remove();
            firebase.database().ref().child('posts').child(postId).remove();

            //   while(posts.firstChild) posts.removeChild(posts.firstChild);

            alert('The user is deleted successfully!');
            dbRefPost.on('value', postKey => {
              paintPost(postKey)
            })
            reload_page();
          });
        })
      })

    }
  })
}

