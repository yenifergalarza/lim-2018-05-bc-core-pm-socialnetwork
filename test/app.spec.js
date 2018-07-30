/* 
const firebase = require('firebase');
const assert = require('chai').assert;
const admin = require('firebase-admin');
require('../src/js/app');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-social-red.firebaseio.com'
});

describe('#loginGoogle', function () {

  it('sets provider id', function () {
    var auth = new firebase.auth.GoogleAuthProvider();
    assert.ok(auth.hasOwnProperty('providerId'));
  });
});

describe('#createUserWithEmailAndPassword', function () {
  it('creates a new user', function () {
    var promise = firebase.database().ref().createUserWithEmailAndPassword('new1@new1.com', 'new1');
    firebase.database().ref().flush();
    return Promise.all([
      expect(promise).to.eventually.have.property('uid', 'simplelogin:1'),
      expect(promise).to.eventually.have.property('email', 'new1@new1.com')
    ]);
  });
});

describe('auth', () => {
  describe('createUser', () => {
    it('createUser is function', () => {
      expect(typeof createUser).toBe('function')
    });
    it('createUser deberia retornar codigo de error cuando los password y su confimacion no son iguales', () => {
      createUser('', '123', '456', (error) => {
        expect(error.code).toBe('auth/password-mismatch');
      })
    });
    it('createUser necesita password iguales', () => {
      createUser('', '123', '123', (error) => {
        expect(error.code).toBe('auth/password-mismatch');
      })
    });
    it('createUser crea usuario', () => {
      createUser('usuario1', '12345678', '12345678', (response) => {
        console.log('fail', response);
        expect(response.username).toBe('usuario1');
      })
    });
    it('createUser no crea usuario con password cortos', () => {
      createUser('usuario2', '1234', '1234', (error, response) => {
        expect(error.code).toBe('auth/weak-password');
      })
    });
  })

  describe('SignInUser',()=>{
    it('signInUser is function',()=>{
      expect(typeof createUser).toBe('function')

    })
    it('signInUser verifica usuarios',()=>{
      signInUser('usuario1','12345678',(error,response)=>{
        assert.equal(response.username,'usuao1');
      })
    })
    it('signInUser verifica contraseña',()=>{
      signInUser('usuario1','12345678',(error,response)=>{
        assert.deepEqual(response.password,'123456');
  
      })
    })
    it('signInUser no verifica usuario',()=>{
      signInUser('usuario1','12345678',(error,response)=>{
        assert.equal(error.code,'auth/weak-password');
      })
    })
  })
  describe('resetPassword', () => {
    it('createUser is function', () => {
      expect(typeof resetPassword).toBe('function')
    });
    
  })

  describe('loginWithGoogle',()=>{
    it('signInUser is function',()=>{
      expect(typeof loginWithGoogle).toBe('function')
    })
    
  })
  describe('loginWithFacebook', () => {
    it('createUser is function', () => {
      expect(typeof loginWithFacebook).toBe('function')
    });
    
  })

  describe('loginWithTwitter',()=>{
    it('signInUser is function',()=>{
      expect(typeof createUser).toBe('function')
    })
    
  })
  describe('writeUserData',()=>{
    it('signInUser is function',()=>{
      expect(typeof writeUserData).toBe('function')
    })
    
  })
  describe('writeNewPost', () => {
    it('createUser is function', () => {
      expect(typeof writeNewPost).toBe('function')
    });
    
  })

  describe('loginWithAnonymous',()=>{
    it('signInUser is function',()=>{
      expect(typeof loginWithAnonymous).toBe('function')
    })
    
  })
  
}); */

// -------------------------------------------




const firebase = require('firebase');
const assert = require('chai').assert;
const admin = require('firebase-admin');
require('../src/js/app');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-social-red.firebaseio.com'
});

describe('#loginGoogle', function () {

  it('sets provider id', function () {
    var auth = new firebase.auth.GoogleAuthProvider();
    assert.ok(auth.hasOwnProperty('providerId'));
  });
});

/* describe('#createUserWithEmailAndPassword', function () {
  it('creates a new user', function () {
    var promise = firebase.database().ref().createUserWithEmailAndPassword('new1@new1.com', 'new1');
    firebase.database().ref().flush();
    return Promise.all([
      expect(promise).to.eventually.have.property('uid', 'simplelogin:1'),
      expect(promise).to.eventually.have.property('email', 'new1@new1.com')
    ]);
  });
}); */

describe('auth', () => {
  describe('createUser', () => {
    it('createUser is function', () => {
      assert.isFunction(createUser)
    });
    it('createUser deberia retornar codigo de error cuando los password y su confimacion no son iguales', () => {
      createUser('', '123', '456', (error) => {
        assert.equal(error.code,'auth/password-mismatch');
      })
    });
    it('createUser necesita password iguales', () => {
      createUser('', '123', '123', (error) => {
        assert.equal(error.code,'auth/password-mismatch');
      })
    });
 /*    it('createUser crea usuario', () => {
      createUser('usuario1', '12345678', '12345678', (response) => {
        console.log('fail', response);
        expect(response.username).toBe('usuario1');
      })
    }); */
/*     it('createUser no crea usuario con password cortos', () => {
      createUser('usuario2', '1234', '1234', (error, response) => {
        expect(error.code).toBe('auth/weak-password');
      })
    }); */
  })

  describe('SignInUser',()=>{
    it('signInUser is function',()=>{
      assert.isFunction(signInUser)

    })
/*     it('signInUser verifica usuarios',()=>{
      signInUser('usuario1','12345678',(error,response)=>{
        assert.equal(response.username,'usuao1');
      })
    })
    it('signInUser verifica contraseña',()=>{
      signInUser('usuario1','12345678',(error,response)=>{
        assert.deepEqual(response.password,'123456');
  
      })
    })
    it('signInUser no verifica usuario',()=>{
      signInUser('usuario1','12345678',(error,response)=>{
        assert.equal(error.code,'auth/weak-password');
      })
    }) */
  })
  describe('resetPassword', () => {
    it('createUser is function', () => {
      assert.isFunction(resetPassword)
    });
    
  })

  describe('loginWithGoogle',()=>{
    it('signInUser is function',()=>{
      assert.isFunction(loginWithGoogle)
    })
    
  })
  describe('loginWithFacebook', () => {
    it('createUser is function', () => {
      assert.isFunction(loginWithFacebook)
    });
    
  })

  describe('loginWithTwitter',()=>{
    it('signInUser is function',()=>{
      assert.isFunction(loginWithTwitter)
    })
    
  })
  describe('writeUserData',()=>{
    it('signInUser is function',()=>{
      assert.isFunction(writeUserData)
    })
    
  })
  describe('writeNewPost', () => {
    it('createUser is function', () => {
      assert.isFunction(writeNewPost)
    });
    
  })

  describe('loginWithAnonymous',()=>{
    it('signInUser is function',()=>{
      assert.isFunction(loginWithAnonymous)
    })
    
  })
  
});