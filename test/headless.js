global.window = global;
global.assert = require('chai').assert;
/* global.fixtures = {
  cohorts: require('../data/cohorts.json'),
  progress: require('../data/cohorts/lim-2018-03-pre-core-pw/progress.json'),
  users: require('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
}; */
require('../src/js/app');
const firebaseMock = require('firebase-mock')
global.firebase = firebaseMock.MockFirebaseSdk()
require('./app.spec.js');
