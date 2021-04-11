/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
const { exec } = require('child_process');
const { getAllIds } = require('./getAllIds');
const { addRefs } = require('./addRefs');
const { importUsers, importProjects, importTools } = require('./utility/imports');

/*
1) start mongod
2) node ./server/database/data/seed/seed.js
*/

// import all
(function load() {
  const imports = [importUsers, importProjects, importProjects, importProjects, importTools];

  for (let i = 0; i < imports.length; i++) {
    exec(imports[i], (error, stdout, stderr) => {
      if (error) return console.log(`Error running file: ${error.message}`);
      if (stderr) return console.log(`Error running command: ${stderr}`);
    });
  }
}());

// get all _ids
getAllIds((e, r) => {
  if (e) return console.error(e);
  // assign refs
  addRefs(r.users, r.projects, r.tools, (err, res) => {
    if (err) return console.error(err);
    return console.log(res);
  });
  return console.log('done');
});
