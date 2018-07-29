document.querySelector('#log-out').addEventListener('click', (e) => {
  firebase.auth().signOut().then(function () {
    if (e.preventDefault) {
      window.location.assign('index.html')
    }
  }).catch(function (error) {

  });
})

const buttonPublish = document.querySelector('#buttonPublish');
<<<<<<< HEAD
const postEntry = document.querySelector('#textarea-post');
=======
const postEntrada = document.querySelector('#exampleTextarea');
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
const dataBase = document.querySelector('#create-post');
const posts = document.querySelector('#posts');
const profile = document.getElementById('profile');
const writingPost = document.querySelector('#publicPost');
const selectOption = document.querySelector('#select-option');
const writePost = document.querySelector('#write-post');
const imagePost = document.querySelector('#image-post');
const uploadImage = document.querySelector('#upload-image');
const uploadingImage = document.querySelector('#uploading-image');
const uploader = document.querySelector('#uploader');
const gettingPrivacy = document.querySelector('#privacyNewPost');
const setImage = document.querySelector('#set-image');
setImage.value = '';

let count_click = 0;


function reload_page() {
  window.location.reload();
};

<<<<<<< HEAD
let fileName = '';
let fileUrl = '';
hello = () => {
  if (uploadImage.getAttribute('activated') === 'activated') {
    settingImage()
  } else if (uploadImage.getAttribute('activated') === 'desactivated') {
    publishPost(fileName, fileUrl);
  }
}

=======
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
firebase.auth().onAuthStateChanged(function (user) {
  if (firebase.auth().currentUser.isAnonymous === true) {
    if (user) {
<<<<<<< HEAD
      const dbRefPost = firebase.database().ref().child('posts');
      dbRefPost.once('value', postKey => {
=======
      const rootRef = firebase.database().ref();
      const dbRefPost = rootRef.child('posts');
      const list = dbRefPost.orderByChild('date');

      list.once('value', postKey => {
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
        paintPost(postKey);
      })
    }
  } else {
<<<<<<< HEAD
    writePost.addEventListener('click', () => {
      uploadImage.style.display = 'none';
      uploadImage.setAttribute('activated', 'desactivated')
      selectOption.style.display = 'none';
      postEntry.style.display = 'inline-flex';

      hello();
    })
    imagePost.addEventListener('click', () => {
      uploadImage.style.display = 'block';
      uploadImage.setAttribute('activated', 'activated')
      selectOption.style.display = 'none';
      postEntry.style.display = 'inline-flex';

      hello();
    })
=======
    let gettingPrivacy = document.getElementById('privacyNewPost');
    gettingPrivacy.addEventListener('change', () => {
      let privacy = gettingPrivacy.value;
      publishPost(privacy);
    });
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563

    document.querySelector('.create-post').style.display = 'block';
    document.querySelector('.profile-card').style.display = 'block';
    if (user) {
<<<<<<< HEAD
      if (user.displayName === null) {
        userProfile(user.photoURL, user.email)
      } else {
        userProfile(user.photoURL, user.displayName)
      }
      let userId = firebase.auth().currentUser.uid;
      const dbRefPost = firebase.database().ref().child('posts');
      // const dbRefPost = firebase.database().ref().child('user-posts').child(userId);
      dbRefPost.once('value', postKey => {
=======
      profile.innerHTML = `<img src="${user.photoURL}" alt="user" class="profile-photo" />
                              <h5>
                                <a href="timeline.html" id="name"class="text-white">${user.displayName}</a>
                              </h5>'
                              <a href="#" class="text-white"><i class="ion ion-android-person-add"></i> 1,299 followers</a>
                            `;
      const imgProfile = document.querySelector('#img-profile');
      imgProfile.setAttribute('src', user.photoURL);

      let userId = firebase.auth().currentUser.uid;
      let rootRef = firebase.database().ref();
      let list = rootRef.child('posts').orderByChild('date');

      list.once('value', postKey => {
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
        paintPost(postKey, userId);
      })
    }
  }
});

const settingImage = () => {
  setImage.addEventListener('change', function (e) {
    console.log(e.target.files)
    // alert('Wait a minute please')
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('post-images/' + file.name);
    // var databaseRef = firebase.storage().ref('post-images/');
    var task = storageRef.put(file);
    task.on('state_changed',
      function (snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },
      function error(err) {},
      function () {
        task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          fileName = file.name;
          fileUrl = downloadURL;
          publishPost(fileName, fileUrl);
          console.log('File available at', downloadURL);
          alert('Now you can publish')
        });
      }
    )
  })
};

const publishPost = (imageName, imageUrl) => {
  buttonPublish.addEventListener('click', () => {
    if (postEntry.value !== '') {
      const userId = firebase.auth().currentUser.uid;
      const userName = firebase.auth().currentUser;
      const privacy = gettingPrivacy.value;
      if (userName.displayName === null) {
        writeNewPost(userId, userName.email, postEntry.value, imageName, imageUrl, privacy, count_click);
      } else {
        writeNewPost(userId, userName.displayName, postEntry.value, imageName, imageUrl, privacy, count_click);
      }
      // writeNewPost(userId, userName, postEntry.value, '', '',privacy, count_click);
      postEntry.value = '';
      reload_page();
    } else {
      alert('Please, enter text to public')
    }
  });
};

const paintPost = (postKey, userId) => {
  postKey.forEach(keys => {
    let postId = keys.key;
    if (userId === keys.val().uid || keys.val().privacy === 'public') {
      createPost(postId, keys, userId);
    }
  })
};

const publishPost = (privacy) => {
  buttonPublish.addEventListener('click', () => {
    if (postEntrada.value !== '') {
      const userId = firebase.auth().currentUser.uid;
      const userName = firebase.auth().currentUser.displayName;
      // const privacy = 'public';
      const timestamp = new Date();
      // let timestamp = new Date('2012-20-03'.split('-').join('/')).getTime();
      writeNewPost(userId, userName, postEntrada.value, timestamp.toLocaleString(), privacy, count_click);
      postEntrada.value = '';
      reload_page();
    } else {
      alert('Ingresar texto a publicar')
    }
  });
};

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
  let imagePost = document.createElement('img');
  let toolsPublishContainer = document.createElement('div');
  let iconEdit = document.createElement('i');
  let iconDelete = document.createElement('i');
  let iconLike = document.createElement('i');
  let likesContainer = document.createElement('span');
  let contLike = document.createElement('span');
  let buttonUpdate = document.createElement('button');

<<<<<<< HEAD
  postPublished.setAttribute('class', 'post-content');
  postPublished.setAttribute('id', 'post' + postId);
  userNameContainer.setAttribute('class', 'user-name-container');
  selectPrivacy.setAttribute('class', 'privacy select-style');
  selectPrivacy.setAttribute('id', 'privacy' + postId);
  optionPrivate.setAttribute('id', 'private');
  optionPublic.setAttribute('id', 'public');
  boxPost.setAttribute('class', 'form-control post-container');
  boxPost.setAttribute('disabled', 'disabled');
  boxPost.setAttribute('id', postId);
  imagePost.setAttribute('class', 'post-image');
  imagePost.setAttribute('src', keys.val().imageUrl);
  imagePost.setAttribute('id', 'image-post' + postId);
=======
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
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
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
  if (keys.val().imageName !== '') {
    postPublished.appendChild(imagePost);
  }
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
<<<<<<< HEAD
=======

>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563

  editClick.addEventListener('click', () => {
    postDisable.disabled = false;
    updatePost.style.display = 'block';
  });

  updatePost.addEventListener('click', () => {
    postDisable.disabled = true;
    updatePost.style.display = 'none';
    const newUpdate = document.getElementById(postId);
<<<<<<< HEAD
    updatePostUser(userId, keys.val().userName, newUpdate.value, keys.val().imageName, keys.val().imageUrl, keys.val().privacy, keys.val().countlike, postId);
=======
    updatePostUser(userId, keys.val().userName, knewUpdate.value, keys.val().privacy, keys.val().countlike, postId);
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
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

<<<<<<< HEAD
      updatePostUser(userId, keys.val().userName, keys.val().body, keys.val().imageName, keys.val().imageUrl, keys.val().privacy, contador_click, postId);
=======
      updatePostUser(userId, keys.val().userName, keys.val().body, keys.val().privacy, contador_click, postId);
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
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

<<<<<<< HEAD
      updatePostUser(userId, keys.val().userName, keys.val().body, keys.val().imageName, keys.val().imageUrl, keys.val().privacy, contador_click, postId);
=======
      updatePostUser(userId, keys.val().userName, keys.val().body, keys.val().privacy, contador_click, postId);
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
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
<<<<<<< HEAD
    updatePostUser(userId, keys.val().userName, keys.val().body, keys.val().imageName, keys.val().imageUrl, selectedPrivacy.value, keys.val().countlike, postId);
=======
    // if (selectedPrivacy.value === 'private')
    // updatePostUser(userId, keys.val().userName, keys.val().body, selectedPrivacy.value, keys.val().countlike, postId);
    // else if (selectedPrivacy.value === 'public')
    updatePostUser(userId, keys.val().userName, keys.val().body, selectedPrivacy.value, keys.val().countlike, postId);
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
  });

  if (userId === keys.val().uid) {
    const viewPrivacy = document.getElementById('privacy' + postId);
    viewPrivacy.style.display = 'inline-block';
    const viewToolsPost = document.getElementById('tools-post' + postId);
    viewToolsPost.style.display = 'block';
<<<<<<< HEAD
  }
};

const userProfile = (userPhoto, userName) => {
  profile.innerHTML = `<img src="${userPhoto}" alt="user" class="profile-photo" />
                        <h5>
                          <a href="timeline.html" id="name"class="text-white">${userName}</a>
                        </h5>'
                        <a href="#" class="text-white"><i class="ion ion-android-person-add"></i> 1,299 followers</a>
                      `;
  const imgProfile = document.querySelector('#img-profile');
  imgProfile.setAttribute('src', userPhoto);
}
=======

  }
};
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
