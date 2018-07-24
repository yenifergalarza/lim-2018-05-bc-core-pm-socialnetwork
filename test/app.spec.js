describe('auth', () => {
  describe('createUser function', () => {
    it('createUser is a function', () => {
      assert.isFunction(createUser);
    });
    it('createUser crea usuario', () => {
      createUser('usuario1', '12345678', '12345678', (error, response) => {
        console.log(response.username);
        assert.equal(response.user.user.email, 'usrio1');
      })
    });
  });

  describe('signInUser function', ()=>{
    it('signInUser is a function' , ()=>{
      assert.isFunction(signInUser)
    });

    it('deberia retornar undefined cuando no se le pase el useremail', () => {
      console.log(signInUser);
    });
  })

})


/* describe('auth', () => {
  describe('createUser', () => {
    it('createUser is function', () => {
      assert.isFunction(createUser);
      console.log(createUser)
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
        //sconsole.log(response.username);
        assert.equal(response.username, 'usuario1');
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
}); */