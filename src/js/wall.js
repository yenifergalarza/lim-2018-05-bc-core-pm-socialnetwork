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
      const createPost = (postId, keys) => {

        posts.innerHTML += `<div>
            <textarea class="form-control" id="${postId}" disabled>${keys.val().body}</textarea>
            <i  class="far fa-edit post-icon btn-update"></i>
            <i data-postId="${postId}" class="far fa-trash-alt post-icon btn-delete"></i>
            <i  class="far fa-heart post-icon btn-like"></i>
            <span id="countLikes">${keys.val().countLike}</span>
            </div>
          `
      }
      const hola2 = (postKey) => {
        postKey.forEach(keys => {
          let postId = keys.key;
          // console.log(keys.val().body)
          createPost(postId, keys);

        let aux = 0;
          document.querySelector('.btn-update').addEventListener('click', () => {
            if (aux === 0) {
              document.querySelector('.form-control').disabled = false;
              aux = 1;
            } else {
              document.querySelector('.form-control').disabled = true;
              aux = 0;
            }
            const newUpdate = document.querySelector('.form-control');
            const nuevoPost = {
              body: newUpdate.value,
            };

            const updatesUser = {};
            const updatesPost = {};

            updatesUser['/user-posts/' + userId + '/' + postId] = nuevoPost;
            updatesPost['/posts/' + postId] = nuevoPost;
            firebase.database().ref().update(updatesUser);
            firebase.database().ref().update(updatesPost);
          });
 

        })
      }
      dbRefPost.once('value', postKey => {
        hola2(postKey);
        console.log(document.querySelectorAll('.btn-delete'))
        const buttonsDelete = document.querySelectorAll('.btn-delete');
        console.log(buttonsDelete)
        buttonsDelete.forEach(button => {
          console.log(button);
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

      /*  dbRefPost.once('value', postKey => {
         hola2(postKey);
         console.log(document.querySelectorAll('.btn-Like'))
         const buttonsLike = document.querySelectorAll('.btn-Like');
         buttonsLike.forEach(button => {
           button.addEventListener('click', () => {
             const postId = button.getAttribute('dataL-postId')
             count_click += 1;
             document.getElementById('countLikes').innerHTML = "A " + count_click + " le gustan este post";
     
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
             dbRefPost.on('value', postKey => {
               hola2(postKey)
             })
             reload_page();
           });
         })
 
       }) */
    }
  })
}