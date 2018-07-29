
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const assert = require('chai').assert;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-social-red.firebaseio.com'
});

describe('auth', () => {
  describe('createUser', () => {
    it('createUser is function', () => {
      assert.isFunction(createUser)
    });
    it('createUser deberia retornar codigo de error cuando los password y su confimacion no son iguales', () => {
      createUser('', '123', '456', (error) => {
        assert.equal(error.code, 'auth/password-mismatch');
      })
    });
    it('createUser necesita password iguales', () => {
      createUser('', '123', '123', (error) => {
        console.log(error);
        assert.equal(error.code, 'auth/password-mismatch');
      })
    });
    it('createUser crea usuario', () => {
      createUser('usuario1', '12345678', '12345678', (error, response) => {
        console.log('fail', response);
        assert.equal(response.username, 'usario1');
      })
    });
    it('createUser no crea usuario con password cortos', () => {
      createUser('usuario2', '1234', '1234', (error, response) => {
        assert.equal(error.code, 'auth/weak-password');
      })
    });
  })

  describe('SignInUser',()=>{
    it('signInUser is function',()=>{
      assert.isFunction(signInUser);
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
      assert.isFunction(resetPassword)
    });
    
  })

  describe('loginWithGoogle',()=>{
    it('signInUser is function',()=>{
      assert.isFunction(loginWithGoogle);
    })
    
  })
  describe('loginWithFacebook', () => {
    it('createUser is function', () => {
      assert.isFunction(loginWithFacebook)
    });
    
  })

  describe('loginWithTwitter',()=>{
    it('signInUser is function',()=>{
      assert.isFunction(loginWithTwitter);
    })
    
  })
  describe('writeUserData',()=>{
    it('signInUser is function',()=>{
      assert.isFunction(writeUserData);
    })
    
  })
  describe('writeNewPost', () => {
    it('createUser is function', () => {
      assert.isFunction(writeNewPost)
    });
    
  })

  describe('loginWithAnonymous',()=>{
    it('signInUser is function',()=>{
      assert.isFunction(loginWithAnonymous);
    })
    
  })
  
});