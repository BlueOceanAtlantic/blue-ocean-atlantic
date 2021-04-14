/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const { addToolRef } = require('../../queries/middleware/addToolRef');
const { addProjectRef } = require('../../queries/middleware/addProjectRef');
const { addNeeds } = require('../../queries/projects/addNeeds');
// const { distributeTools } = require('./utility/distributeTools');
const { indexOf } = require('./utility/indexOf');

exports.addRefs = (users, projects, tools, cb) => {
  for (let i = 0; i < users.length; i++) {
    addProjectRef(users[indexOf(users)], projects[indexOf(projects)]);
  }
  for (let i = 0; i < users.length; i++) {
    addProjectRef(users[indexOf(users)], projects[indexOf(projects)]);
  }
  for (let i = 0; i < users.length; i++) {
    addProjectRef(users[indexOf(users)], projects[indexOf(projects)]);
  }
  for (let i = 0; i < users.length; i++) {
    addToolRef(users[indexOf(users)], tools[indexOf(tools)]);
  }
  for (let i = 0; i < users.length; i++) {
    addToolRef(users[indexOf(users)], tools[indexOf(tools)]);
  }
  for (let i = 0; i < users.length; i++) {
    addToolRef(users[indexOf(users)], tools[indexOf(tools)]);
  }
  for (let i = 0; i < users.length; i++) {
    addToolRef(users[indexOf(users)], tools[indexOf(tools)]);
  }
  for (let i = 0; i < users.length; i++) {
    addToolRef(users[indexOf(users)], tools[indexOf(tools)]);
  }
  for (let i = 0; i < users.length; i++) {
    addNeeds(projects[indexOf(projects)], tools[indexOf(tools)]);
  }
  for (let i = 0; i < users.length; i++) {
    addNeeds(projects[indexOf(projects)], tools[indexOf(tools)]);
  }
  for (let i = 0; i < users.length; i++) {
    addNeeds(projects[indexOf(projects)], tools[indexOf(tools)]);
  }
  for (let i = 0; i < users.length; i++) {
    addNeeds(projects[indexOf(projects)], tools[indexOf(tools)]);
  }
  return cb(null, 'fin');
};
