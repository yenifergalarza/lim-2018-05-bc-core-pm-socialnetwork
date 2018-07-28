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
const writingPost = document.querySelector('#publicPost');
let count_click = 0;

function reload_page() {
  window.location.reload();
};

buttonPublish.addEventListener('click', () => {

  if (postEntrada.value !== '') {
    const userId = firebase.auth().currentUser.uid;
    const userName = firebase.auth().currentUser.displayName;
    // writeNewPost(userId, postEntrada.value);
    writeNewPost(userId, postEntrada.value, count_click, userName);
    postEntrada.value = '';
    reload_page();
    // paintNewPost(userId, newPost);
  } else {
    alert('Ingresar texto a publicar')
  }
});


const paintPost = (postKey, userId) => {
  postKey.forEach(keys => {
    let postId = keys.key;
    createPost(postId, keys,userId);

  })
}

firebase.auth().onAuthStateChanged(function (user) {
  if (firebase.auth().currentUser.isAnonymous === true) {

    if (user) {
      const dbRefPost = firebase.database().ref().child('posts');

      dbRefPost.once('value', postKey => {
        paintPost(postKey);
      })
    }
  } else {
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
      const dbRefPost = firebase.database().ref().child('user-posts').child(userId);

      dbRefPost.once('value', postKey => {
        paintPost(postKey, userId);
        const buttonsDelete = document.querySelectorAll('.btn-delete');
        buttonsDelete.forEach(button => {
          button.addEventListener('click', () => {
            if(confirm('Are you sure if you want to delete this post')===true){
            const postId = button.getAttribute('data-postId')
            dbRefPost.child(postId).remove();
            firebase.database().ref().child('posts').child(postId).remove();

              while(posts.firstChild) posts.removeChild(posts.firstChild);

            dbRefPost.on('value', postKey => {
              paintPost(postKey)
            })
            reload_page();
          }else {
            return false;
          }
          });
        })

      })
    }
  }
})

const createPost = (postId, keys, userId) => {
  // console.log(user)
  let postPublished = document.createElement('div');
  let userNameContainer = document.createElement('div');
  let userName = document.createElement('h5');
  let boxPost = document.createElement('textarea');
  let toolsPublishContainer = document.createElement('div');
  let iconEdit = document.createElement('i');
  let iconDelete = document.createElement('i');
  let iconLike = document.createElement('i');
  let likesContainer = document.createElement('span');
  let contLike = document.createElement('span');
  let buttonUpdate = document.createElement('button');

  postPublished.setAttribute('class', 'post-published');
  postPublished.setAttribute('id', 'post'+ postId);
  boxPost.setAttribute('class', 'form-control');
  boxPost.setAttribute('disabled', 'disabled');
  boxPost.setAttribute('id',postId);
  toolsPublishContainer.setAttribute('class', 'tools-post');
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
  buttonUpdate.setAttribute('class', 'btn btn-primary pull-right unshow');
  buttonUpdate.setAttribute('id', 'bU' + postId);

  userName.textContent = keys.val().userName;
  boxPost.textContent = keys.val().body;
  likesContainer.textContent = keys.val().countlike;
  contLike.textContent = keys.val().countlike;

  toolsPublishContainer.appendChild(iconEdit);
  toolsPublishContainer.appendChild(iconDelete);
  toolsPublishContainer.appendChild(iconLike);
  toolsPublishContainer.appendChild(likesContainer);
  toolsPublishContainer.appendChild(contLike);
  toolsPublishContainer.appendChild(buttonUpdate);

  userNameContainer.appendChild(userName);


  postPublished.appendChild(userNameContainer);
  postPublished.appendChild(boxPost);
  postPublished.appendChild(toolsPublishContainer);

  posts.appendChild(postPublished);

  let editClick = document.getElementById('update' + postId);
  let likeClick = document.getElementById('like' + postId);
  let deleteClick = document.getElementById('delete' + postId)
  let postDisable = document.getElementById(postId);
  let showButton = document.getElementById('bU' + postId);
  let aux=0;

  editClick.addEventListener('click', () => {
    postDisable.disabled = false;
    showButton.style.display = 'block';
  });

  showButton.addEventListener('click', () => {
    postDisable.disabled = true;
    showButton.style.display = 'none';

    const newUpdate = document.getElementById(postId);
    const nuevoPost = {
      body: newUpdate.value,
      countlike: count_click,
      userName: firebase.auth().currentUser.displayName
    };

    const updatesUser = {};
    const updatesPost = {};

    updatesUser['/user-posts/' + userId + '/' + postId] = nuevoPost;
    updatesPost['/posts/' + postId] = nuevoPost;
    firebase.database().ref().update(updatesUser);
    firebase.database().ref().update(updatesPost);
  });

  editClick.addEventListener('click', () => {
    postDisable.disabled = false;
    showButton.style.display = 'block';
  });

  likeClick.addEventListener('click',()=>{
    if(aux===0){
      likeClick.style.color="red";
      likeClick.disabled=true;
      let contador_click =document.querySelector('#post' + postId + ' .count_click_likes').innerHTML;
      contador_click === "undefined" ? contador_click = 0 : "";
      contador_click = parseInt(contador_click, 10) + 1;
      document.querySelector('#post' + postId + ' .count_click_likes').innerHTML = contador_click;

      if(contador_click ===0){
        document.querySelector('#post' + postId + ' .countLikes').style.display = "none"
        document.querySelector('#post' + postId + ' .countLikes').innerHTML = "A " + contador_click + " le gustan este post";

      }else{
        document.querySelector('#post' + postId + ' .countLikes').style.display = "block"
        document.querySelector('#post' + postId + ' .countLikes').innerHTML = "A " + contador_click + " le gustan este post";

      }
  
      const nuevoPost = {
        body: keys.val().body,
        countlike: contador_click,
        username: keys.val().userName,
      };
  
      const updatesUser = {};
      const updatesPost = {};
  
      updatesUser['/user-posts/' + userId + '/' + postId] = nuevoPost;
      updatesPost['/posts/' + postId] = nuevoPost;
      firebase.database().ref().update(updatesUser);
      firebase.database().ref().update(updatesPost);
      aux=1;
    }else{
      likeClick.style.color="#6d6e71";
      likeClick.disabled=false;
      let contador_click =document.querySelector('#post' + postId + ' .count_click_likes').innerHTML;
      console.log(contador_click);
      contador_click === "undefined" ? contador_click = 0 : "";
      contador_click = parseInt(contador_click, 10) - 1;
      document.querySelector('#post' + postId + ' .count_click_likes').innerHTML = contador_click;
      if(contador_click ===0){
        document.querySelector('#post' + postId + ' .countLikes').style.display = "none"
        document.querySelector('#post' + postId + ' .countLikes').innerHTML = "A " + contador_click + " le gustan este post";

      }else{
        document.querySelector('#post' + postId + ' .countLikes').style.display = "block"
        document.querySelector('#post' + postId + ' .countLikes').innerHTML = "A " + contador_click + " le gustan este post";

      }
      const nuevoPost = {
        body: keys.val().body,
        countlike: contador_click,
        username: keys.val().userName,
      };
  
      const updatesUser = {};
      const updatesPost = {};
  
      updatesUser['/user-posts/' + userId + '/' + postId] = nuevoPost;
      updatesPost['/posts/' + postId] = nuevoPost;
      firebase.database().ref().update(updatesUser);
      firebase.database().ref().update(updatesPost);
      aux=0;
    }

  })

  deleteClick.addEventListener('click',()=>{
    if(confirm('Are you sure if you want to delete this post')===true){
      
      firebase.database().ref().child('posts').child(postId).remove();

        while(posts.firstChild) posts.removeChild(posts.firstChild);

        firebase.database().ref().child('posts').on('value', postKey => {
        paintPost(postKey,userId)
      })
      reload_page();
    }else {
      return false;
    }
  })
}
