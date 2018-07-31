document.querySelector('#create-post').style.display = 'block';

const profileInfo = document.getElementById('profile-info');
const profileInfoResponsive = document.getElementById('profile-info-responsive');

const userProfile = (userPhoto, userName) => {
  profileInfo.innerHTML = `
  <img src="${userPhoto}" id="profile-photo" alt="" class="img-responsive profile-photo" />
  <h3>${userName}</h3>
  `;
  profileInfoResponsive.innerHTML = `
  <img src="${userPhoto}" id="profile-photo" alt="" class="img-responsive profile-photo" />
  <h3>${userName}</h3>
  `;
  const imgProfile = document.querySelector('#img-profile');
  imgProfile.setAttribute('src', userPhoto);
}