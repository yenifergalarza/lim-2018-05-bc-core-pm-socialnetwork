const createUser = (email, password, repeatPassword) => {
  if (password === repeatPassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        window.location.assign('signin.html')
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  } else {
    console.log('Your password doesnt mach');
    alert('Your password doesnt mach');
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> b4c81ee146b23db134de6ad91ae915667d69165a

const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    window.location.assign('main.html')
  })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
<<<<<<< HEAD
}
=======
};
>>>>>>> b4c81ee146b23db134de6ad91ae915667d69165a

const resetPassword = (email, password) => {
  firebase.auth().sendPasswordResetEmail(
    getEmail.value)
    .then(function () {
      firebase.auth.EmailAuthProvider.credential(email, password);
      alert("Password Reset Email Sent")
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert('The email in invalid');
      } else if (errorCode == 'auth/user-not-found') {
        alert('The email is not exists');
      }
      console.log(error);
    });
<<<<<<< HEAD
}
=======
};
>>>>>>> b4c81ee146b23db134de6ad91ae915667d69165a

const loginWithGoogle = () => {
  // Using a popup.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    window.location.assign('main.html')
  });
<<<<<<< HEAD
}
=======
};
>>>>>>> b4c81ee146b23db134de6ad91ae915667d69165a

const loginWithFacebook = () => {
  // Sign in using a popup.
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_birthday');
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Facebook Access Token.
    var token = result.provider.accessToken;
    // The signed-in user info.
    var user = result.user;
    window.location.assign('main.html')
  });
<<<<<<< HEAD
}
=======
};
>>>>>>> b4c81ee146b23db134de6ad91ae915667d69165a

const loginWithTwitter = () => {
  // Using a popup.
  var provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // For accessing the Twitter API.
    var token = result.provider.accessToken;
    var secret = result.provider.secret;
    // The signed-in user info.
    var user = result.user;
    window.location.assign('main.html')
  });
<<<<<<< HEAD
}
=======
};

(function ($) {
  "use strict";
  //  [ Focus input ]
  $('.input100').each(function () {
    $(this).on('blur', function () {
      if ($(this).val().trim() != "") {
        $(this).addClass('has-val');
      }
      else {
        $(this).removeClass('has-val');
      }
    })
  })

/* // [ Validate ]
 var input = $('.validate-input .input100');
 
 $('.validate-form').on('submit', function () {
   var check = true;
 
   for (var i = 0; i < input.length; i++) {
     if (validate(input[i]) == false) {
       showValidate(input[i]);
       check = false;
     }
   }
   return check;
 });
 
 
 $('.validate-form .input100').each(function () {
   $(this).focus(function () {
     hideValidate(this);
   });
 });
 
 function validate(input) {
   if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
     if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
       return false;
     }
   }
   else {
     if ($(input).val().trim() == '') {
       return false;
     }
   }
 }
 
 function showValidate(input) {
   var thisAlert = $(input).parent();
 
   $(thisAlert).addClass('alert-validate');
 }
 
 function hideValidate(input) {
   var thisAlert = $(input).parent();
 
   $(thisAlert).removeClass('alert-validate');
 } */

})(jQuery);
>>>>>>> b4c81ee146b23db134de6ad91ae915667d69165a
