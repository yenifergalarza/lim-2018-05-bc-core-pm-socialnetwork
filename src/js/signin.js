const register = document.querySelector("#singUp");
const getEmail = document.querySelector('#email');
const getPassword = document.querySelector('#password');
const logIn = document.querySelector("#log-In")
const loginGoogle = document.querySelector('#login-google');
const loginFacebook = document.querySelector('#login-facebook');
const loginTwitter = document.querySelector('#login-twitter');
const username = document.querySelector("#text-white");
const forgotPassword = document.querySelector('#forgot-Password');
window.onload =()=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location.assign('wall.html')
    } else {
      console.log('No user is signed in.');
      
    }
  });
}
register.addEventListener('click', (e) => {
  if (e.preventDefault) {
    window.location.assign('signup.html')
  }
})

logIn.addEventListener('click', () => {
  signInUser(getEmail.value, getPassword.value);
})

forgotPassword.addEventListener('click', () => {
  resetPassword(getEmail.value, getPassword.value)
})

loginGoogle.addEventListener('click', () => {
  loginWithGoogle();
});

loginFacebook.addEventListener('click', () => {
  loginWithFacebook();
});

loginTwitter.addEventListener('click', () => {
  loginWithTwitter();
});