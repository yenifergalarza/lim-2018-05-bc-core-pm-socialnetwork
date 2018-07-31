const profile = document.getElementById('profile');

firebase.auth().onAuthStateChanged(function (user) {
  if (firebase.auth().currentUser.isAnonymous === false) {
    document.querySelector('.create-post').style.display = 'block';
    document.querySelector('.profile-card').style.display = 'block';
  }
});

const userProfile = (userPhoto, userName) => {
  profile.innerHTML = `<img src="${userPhoto}" alt="user" class="profile-photo" />
                        <h5>
                          <a href="#" id="name" class="text-white">${userName}</a>
                        </h5>'
                        <a href="#" class="text-white"><i class="ion ion-android-person-add"></i> 1,299 followers</a>
                      `;
  const imgProfile = document.querySelector('#img-profile');
  imgProfile.setAttribute('src', userPhoto);
}