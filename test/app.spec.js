describe('auth', () => {
  describe('createUser', () => {
    it('createUser is function', () => {
      assert.isFunction(createUser);
    });
    it('createUser necesita password iguales', () => {
      createUser('', '123', '456', (error) => {
        assert.equal(error.code, 'auth/password-mismatch');
      })
    });
    it('createUser crea usuario', () => {
      createUser('usuario1', '12345678', '12345678', (error, response) => {
        assert.equal(response.username, 'usuario1');
      })
    });
    it('createUser no crea usuario con password cortos', () => {
      createUser('usuario2', '1234', '1234', (error, response) => {
        assert.equal(error.code, 'auth/weak-password');
      })
    });
  })
});