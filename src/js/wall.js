/* Loading page processing with window.onload */
processing = () => {
  document.querySelector('#spinner-wrapper').style.display = 'none';
}
//window.onload = () => { processing() }
window.onload = setTimeout(processing, 400);

document.querySelector('#log-out').addEventListener('click', (e) => {
  console.log('holaaaa')
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
  const dbRefPostUser = firebase.database().ref().child('user-posts').child(userId);
  dbRefPostUser.once('value', postKey => {
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

})

/* dbRefPostUser.on('child_changed', postKey => {
  posts.innerHTML = '';
  postKey.forEach(keys => {
    let postId = keys.key;
    keys.forEach(body => {
      const postChanged = document.getElementById(postId)
      postChanged.innerHTML = body.val()
    })
  }) */