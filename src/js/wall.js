document.querySelector('#log-out').addEventListener('click', (e) => {
  firebase.auth().signOut().then(function () {
    if (e.preventDefault) {
      window.location.assign('index.html')
    }
  }).catch(function (error) {

  });
})

<<<<<<< HEAD
// Desarrollo de La publicacion de Post

const buttonPublish = document.querySelector('#buttonPublish')
const postEntrada = document.querySelector('#exampleTextarea');
const dataBase = document.querySelector('#create-post');
const posts = document.querySelector('#posts');
const profile = document.getElementById('profile')
=======
const buttonPublish = document.querySelector('#buttonPublish');
const postEntrada = document.querySelector('#exampleTextarea');
const dataBase = document.querySelector('#create-post');
const posts = document.querySelector('#posts');
const profile = document.getElementById('profile');
const writingPost = document.querySelector('#publicPost');
>>>>>>> 34facf06f23b3f9530b4b7abf5ab63e4c8e4964b
let count_click = 0;

function reload_page() {
  window.location.reload();
};

<<<<<<< HEAD
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
      const dbRefPost = firebase.database().ref().child('user-posts').child(userId);

      const hola2 = (postKey) => {
        postKey.forEach(keys => {
          let postId = keys.key;
          console.log(keys.val().body)
            const buttonUpdate = document.createElement('i');
            buttonUpdate.setAttribute('class', 'far fa-edit post-icon');
            const buttonDelete = document.createElement('i');
            buttonDelete.setAttribute('data-postId', postId);
            buttonDelete.setAttribute('class', 'far fa-trash-alt post-icon');
            const buttonLike = document.createElement('i');
            buttonLike.setAttribute('data-postId', postId);
            buttonLike.setAttribute('class', 'far fa-heart post-icon');
            const cantidadLikes = document.createElement("span");
            const contenidoPost = document.createElement('div');
            contenidoPost.className = 'contenidoPost';
            const textoPost = document.createElement('textarea')
            textoPost.setAttribute('id', postId);
            textoPost.setAttribute('class', 'form-control');
            textoPost.innerHTML = keys.val().body;
            cantidadLikes.innerHTML = keys.val().countLike;
            textoPost.disabled = true;

            buttonDelete.classList.add('btn-delete');
            buttonLike.classList.add('btn-like');

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
              cantidadLikes.innerHTML = "A " +  count_click + " le gustan este post";

              const nuevoPost = {
                body:  keys.val().body,
                countLike: count_click,
              };

              const updatesUser = {};
              const updatesPost = {};

              updatesUser['/user-posts/' + userId + '/' + postId] = nuevoPost;
              updatesPost['/posts/' + postId] = nuevoPost;
              firebase.database().ref().update(updatesUser);
              firebase.database().ref().update(updatesPost);
            });

            contenidoPost.appendChild(textoPost);
            contenidoPost.appendChild(buttonUpdate);
            contenidoPost.appendChild(buttonDelete);
            contenidoPost.appendChild(buttonLike);
            contenidoPost.appendChild(cantidadLikes);
            posts.appendChild(contenidoPost);

        })
      }
      dbRefPost.once('value', postKey => {
        hola2(postKey);
        // console.log(document.querySelectorAll('.btn-delete'))
        const buttonsDelete = document.querySelectorAll('.btn-delete');
        buttonsDelete.forEach(button => {
          button.addEventListener('click', () => {
            const postId = button.getAttribute('data-postId')
            dbRefPost.child(postId).remove();
            firebase.database().ref().child('posts').child(postId).remove();

            //   while(posts.firstChild) posts.removeChild(posts.firstChild);

            alert('The user is deleted successfully!');
            dbRefPost.on('value', postKey => {
              hola2(postKey)
            })
            reload_page();
          });
        })

      })
    }
  })
}
=======
firebase.auth().onAuthStateChanged(function (user) {
  if (firebase.auth().currentUser.isAnonymous === true) {

    if (user) {
      const dbRefPost = firebase.database().ref().child('posts');

      dbRefPost.once('value', postKey => {
        paintPost(postKey);
      })
    }
  } else {
    let gettingPrivacy = document.getElementById('privacyNewPost');
    gettingPrivacy.addEventListener('change', () => {
      let privacy = gettingPrivacy.value;
      publishPost(privacy); F
    });


    document.querySelector('.create-post').style.display = 'block';
    document.querySelector('.profile-card').style.display = 'block';
    if (user) {
      profile.innerHTML = `<img src="${user.photoURL}" alt="user" class="profile-photo" />
                              <h5>
                                <a href="timeline.html" id="name"class="text-white">${user.displayName}</a>
                              </h5>'
                              <a href="#" class="text-white"><i class="ion ion-android-person-add"></i> 1,299 followers</a>
                            `;
      const imgProfile = document.querySelector('#img-profile');
      imgProfile.setAttribute('src', user.photoURL);
      let userId = firebase.auth().currentUser.uid;
      const dbRefPost = firebase.database().ref().child('posts');

      // const dbRefPost = firebase.database().ref().child('user-posts').child(userId);

      dbRefPost.once('value', postKey => {
        paintPost(postKey, userId);
      })
    }
  }
})

const publishPost = (privacy) => {
  buttonPublish.addEventListener('click', () => {
    if (postEntrada.value !== '') {
      const userId = firebase.auth().currentUser.uid;
      const userName = firebase.auth().currentUser.displayName;
      // const privacy = 'public';
      writeNewPost(userId, userName, postEntrada.value, privacy, count_click);
      postEntrada.value = '';
      reload_page();
    } else {
      alert('Ingresar texto a publicar')
    }
  });
};

// const getPrivacy = () => {

// }

const paintPost = (postKey, userId) => {
  postKey.forEach(keys => {
    let postId = keys.key;

    if (userId === keys.val().uid || keys.val().privacy === 'public') {
      createPost(postId, keys, userId);
    }
  })
};

const createPost = (postId, keys, userId) => {
  let postPublished = document.createElement('div');
  let userNameContainer = document.createElement('div');
  let userName = document.createElement('h5');
  let selectPrivacy = document.createElement('select');
  let optionPrivate = document.createElement('option');
  let optionPublic = document.createElement('option');
  let boxPost = document.createElement('textarea');
  let toolsPublishContainer = document.createElement('div');
  let iconEdit = document.createElement('i');
  let iconDelete = document.createElement('i');
  let iconLike = document.createElement('i');
  let likesContainer = document.createElement('span');
  let contLike = document.createElement('span');
  let buttonUpdate = document.createElement('button');

  postPublished.setAttribute('class', 'post-published');
  postPublished.setAttribute('id', 'post' + postId);
  userNameContainer.setAttribute('class', 'user-name-container');
  selectPrivacy.setAttribute('class', 'privacy');
  selectPrivacy.setAttribute('id', 'privacy' + postId);
  optionPrivate.setAttribute('id', 'private');
  optionPublic.setAttribute('id', 'public');
  boxPost.setAttribute('class', 'form-control');
  boxPost.setAttribute('disabled', 'disabled');
  boxPost.setAttribute('id', postId);
  toolsPublishContainer.setAttribute('class', 'tools-post');
  toolsPublishContainer.setAttribute('id', 'tools-post' + postId);
  iconEdit.setAttribute('class', 'far fa-edit post-icon btn-update');
  iconEdit.setAttribute('dataU-postId', postId);
  iconEdit.setAttribute('id', 'update' + postId);
  iconDelete.setAttribute('class', 'far fa-trash-alt post-icon btn-delete');
  iconDelete.setAttribute('data-postId', postId);
  iconDelete.setAttribute('id', 'delete' + postId);
  iconLike.setAttribute('class', 'far fa-heart post-icon btn-like');
  iconLike.setAttribute('dataL-postId', postId);
  iconLike.setAttribute('id', 'like' + postId);
  likesContainer.setAttribute('class', 'countLikes');
  contLike.setAttribute('class', 'hidden count_click_likes');
  buttonUpdate.setAttribute('class', 'btn pull-right unshow');
  buttonUpdate.setAttribute('id', 'bU' + postId);

  userName.textContent = keys.val().userName;
  optionPublic.textContent = 'public';
  optionPrivate.textContent = 'private';
  boxPost.textContent = keys.val().body;
  likesContainer.textContent = keys.val().countlike;
  contLike.textContent = keys.val().countlike;
  buttonUpdate.textContent = 'Update';

  toolsPublishContainer.appendChild(iconEdit);
  toolsPublishContainer.appendChild(iconDelete);
  toolsPublishContainer.appendChild(iconLike);
  toolsPublishContainer.appendChild(likesContainer);
  toolsPublishContainer.appendChild(contLike);
  toolsPublishContainer.appendChild(buttonUpdate);

  userNameContainer.appendChild(userName);

  selectPrivacy.appendChild(optionPrivate);
  selectPrivacy.appendChild(optionPublic);

  postPublished.appendChild(userNameContainer);
  postPublished.appendChild(selectPrivacy);
  postPublished.appendChild(boxPost);
  postPublished.appendChild(toolsPublishContainer);

  posts.appendChild(postPublished);

  autosize(document.querySelectorAll('textarea'));

  let editClick = document.getElementById('update' + postId);
  let likeClick = document.getElementById('like' + postId);
  let deleteClick = document.getElementById('delete' + postId);
  let postDisable = document.getElementById(postId);
  let updatePost = document.getElementById('bU' + postId);
  let selectedPrivacy = document.getElementById('privacy' + postId);
  let auxLike = 0;

  if (keys.val().privacy === 'private') {
    optionPrivate.setAttribute('selected', 'selected');
  } else {
    optionPublic.setAttribute('selected', 'selected');
  }


  editClick.addEventListener('click', () => {
    postDisable.disabled = false;
    updatePost.style.display = 'block';
  });

  updatePost.addEventListener('click', () => {
    postDisable.disabled = true;
    updatePost.style.display = 'none';
    const newUpdate = document.getElementById(postId);
    updatePostUser(userId, keys.val().userName, newUpdate.value, keys.val().privacy, keys.val().countlike, postId);
  });

  likeClick.addEventListener('click', () => {
    if (auxLike === 0) {

      likeClick.style.color = "red";
      likeClick.disabled = true;
      let contador_click = document.querySelector('#post' + postId + ' .count_click_likes').innerHTML;
      contador_click === "undefined" ? contador_click = 0 : "";
      contador_click = parseInt(contador_click, 10) + 1;
      document.querySelector('#post' + postId + ' .count_click_likes').innerHTML = contador_click;

      if (contador_click === 0) {
        document.querySelector('#post' + postId + ' .countLikes').style.display = "none"
        document.querySelector('#post' + postId + ' .countLikes').innerHTML = "A " + contador_click + " le gustan este post";
      } else {
        document.querySelector('#post' + postId + ' .countLikes').style.display = "block"
        document.querySelector('#post' + postId + ' .countLikes').innerHTML = "A " + contador_click + " le gustan este post";
      }

      updatePostUser(userId, keys.val().userName, keys.val().body, keys.val().privacy, contador_click, postId);
      auxLike = 1;

    } else {

      likeClick.style.color = "#6d6e71";
      likeClick.disabled = false;
      let contador_click = document.querySelector('#post' + postId + ' .count_click_likes').innerHTML;
      console.log(contador_click);
      contador_click === "undefined" ? contador_click = 0 : "";
      contador_click = parseInt(contador_click, 10) - 1;
      document.querySelector('#post' + postId + ' .count_click_likes').innerHTML = contador_click;

      if (contador_click === 0) {
        document.querySelector('#post' + postId + ' .countLikes').style.display = "none"
        document.querySelector('#post' + postId + ' .countLikes').innerHTML = "A " + contador_click + " le gustan este post";
      } else {
        document.querySelector('#post' + postId + ' .countLikes').style.display = "block"
        document.querySelector('#post' + postId + ' .countLikes').innerHTML = "A " + contador_click + " le gustan este post";
      }

      updatePostUser(userId, keys.val().userName, keys.val().body, keys.val().privacy, contador_click, postId);
      auxLike = 0;

    }
  });

  deleteClick.addEventListener('click', () => {
    if (confirm('Are you sure if you want to delete this post') === true) {

      firebase.database().ref().child('posts').child(postId).remove();
      firebase.database().ref().child('user-posts').child(userId).child(postId).remove();


      while (posts.firstChild) posts.removeChild(posts.firstChild);

      firebase.database().ref().child('posts').on('value', postKey => {
        paintPost(postKey, userId);
      })
      reload_page();
    } else {
      return false;
    }
  });

  selectedPrivacy.addEventListener('change', () => {
    // if (selectedPrivacy.value === 'private')
    // updatePostUser(userId, keys.val().userName, keys.val().body, selectedPrivacy.value, keys.val().countlike, postId);
    // else if (selectedPrivacy.value === 'public')
    updatePostUser(userId, keys.val().userName, keys.val().body, selectedPrivacy.value, keys.val().countlike, postId);
  });

  if (userId === keys.val().uid) {
    const viewPrivacy = document.getElementById('privacy' + postId);
    viewPrivacy.style.display = 'inline-block';
    const viewToolsPost = document.getElementById('tools-post' + postId);
    viewToolsPost.style.display = 'block';

  }
};
>>>>>>> 34facf06f23b3f9530b4b7abf5ab63e4c8e4964b
