global.window = global;
global.assert = require('chai').assert;
global.jestExpect = global.expect;
require('../src/js/app');

const firebaseMock = require('firebase-mock')
global.firebase = firebaseMock.MockFirebaseSdk()
require('./app.spec.js');
