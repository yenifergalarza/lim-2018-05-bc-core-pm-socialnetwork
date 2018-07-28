const register = document.querySelector("#singUp");
const getEmail = document.querySelector('#email');
const getPassword = document.querySelector('#password');
const logIn = document.querySelector("#log-In")
const loginGoogle = document.querySelector('#login-google');
const loginFacebook = document.querySelector('#login-facebook');
const loginTwitter = document.querySelector('#login-twitter');
const username = document.querySelector("#text-white");
const forgotPassword = document.querySelector('#forgot-Password');
const loginAnonymous = document.querySelector('#login-anonymous');
const displayLeft = document.querySelector('#display-left');
const displayRight = document.querySelector('#display-right');
const leftContainer = document.querySelector('#left-container');
const rightContainer = document.querySelector('#right-container');
let auxDisplayContainer = 0;

displayOneContainer = () => {
  displayLeft.addEventListener('click', () => {
    if (auxDisplayContainer === 0) {
      leftContainer.style.display = 'flex';
      rightContainer.style.display = 'none';
      auxDisplayContainer = 1;
    } else {
      leftContainer.style.display = 'none';
      rightContainer.style.display = 'flex';
      auxDisplayContainer = 0;
    }
  })
  displayRight.addEventListener('click', () => {
    if (auxDisplayContainer === 0) {
      leftContainer.style.display = 'flex';
      rightContainer.style.display = 'none';
      auxDisplayContainer = 1;
    } else {
      leftContainer.style.display = 'none';
      rightContainer.style.display = 'flex';
      auxDisplayContainer = 0;
    }
  })
}
const widthWindow = window.matchMedia("(min-width: 768px)");
displayContainers = (x) => {
  if (x.matches) { // If media query matches
    leftContainer.style.display = 'flex';
    rightContainer.style.display = 'flex';
  } else {
    leftContainer.style.display = 'none';
    displayOneContainer();
  }
}
displayContainers(widthWindow) // Call listener function at run time
widthWindow.addListener(displayContainers)

window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.assign('wall.html')
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
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

loginAnonymous.addEventListener('click', () => {
  loginWithAnonymous();
})