const register = document.querySelector("#singUp");
const getEmail = document.querySelector('#email');
const getPassword = document.querySelector('#password');
const logIn = document.querySelector("#log-In")
const loginGoogle = document.querySelector('#login-google');
const loginFacebook = document.querySelector('#login-facebook');
const loginTwitter = document.querySelector('#login-twitter');
const username = document.querySelector("#text-white");
const forgotPassword = document.querySelector('#forgot-Password');
<<<<<<< HEAD
window.onload =()=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location.assign('wall.html')
    } else {
      console.log('No user is signed in.');
      
=======
const loginAnonymous = document.querySelector('#login-anonymous');

window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.assign('wall.html')
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
    } else {
      console.log('No user is signed in.');

>>>>>>> 34facf06f23b3f9530b4b7abf5ab63e4c8e4964b
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

loginAnonymous.addEventListener('click', () => {
  loginWithAnonymous();
})
