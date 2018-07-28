global.window = global;
global.assert = require('chai').assert;
<<<<<<< HEAD
global.jestExpect = global.expect;
=======
/* global.fixtures = {
  cohorts: require('../data/cohorts.json'),
  progress: require('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  users: require('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
}; */
>>>>>>> 343cb40f1e25dcdf767d8a8388f8a6e64b938390
require('../src/js/app');
const firebaseMock = require('firebase-mock')
global.firebase = firebaseMock.MockFirebaseSdk()
require('./app.spec.js');
