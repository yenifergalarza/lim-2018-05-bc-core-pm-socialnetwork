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
const profile = document.getElementById('profile');
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
firebase.auth().onAuthStateChanged(function (user) {
  if (firebase.auth().currentUser.isAnonymous === true) {
    document.querySelector('.create-post').style.display = 'none';
    document.querySelector('.profile-card').style.display = 'none';
    window.onload = () => {
      // firebase.auth().onAuthStateChanged(function (user) {
      // if (user) {
      const dbRefPost = firebase.database().ref().child('posts');

      const hola2 = (postKey) => {
        postKey.forEach(keys => {
          let postId = keys.key;
          console.log(keys.val().body)
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
          buttonLike.classList.add('btn-like');

          buttonLike.addEventListener('click', () => {
            count_click += 1;
            cantidadLikes.innerHTML = "A " + count_click + " le gustan este post";

            const nuevoPost = {
              body: keys.val().body,
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
          contenidoPost.appendChild(buttonLike);
          contenidoPost.appendChild(cantidadLikes);
          posts.appendChild(contenidoPost);

        })
      }
      dbRefPost.once('value', postKey => {
        hola2(postKey);
        console.log(postKey);
        // console.log(document.querySelectorAll('.btn-delete'))


      })
      // }
      // })
    }
  } else {
    window.onload = () => {
      // firebase.auth().onAuthStateChanged(function (user) {
      // if (user) {
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
            cantidadLikes.innerHTML = "A " + count_click + " le gustan este post";

            const nuevoPost = {
              body: keys.val().body,
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
      // }
      // })
    }
  }
})
