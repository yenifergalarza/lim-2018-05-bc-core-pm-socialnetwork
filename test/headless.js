global.window = global;
global.assert = require('chai').assert;
<<<<<<< HEAD
global.jestExpect = global.expect;
=======
>>>>>>> 24880ca1a7c61496d2f70333c3d88931d31ce563
require('../src/js/app');
const firebaseMock = require('firebase-mock')
global.firebase = firebaseMock.MockFirebaseSdk()
global.firebase.auth().autoFlush()
require('./app.spec.js');
