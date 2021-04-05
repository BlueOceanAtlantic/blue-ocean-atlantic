const { removeProjects } = require('../../database/queries/projects/removeProjects.js');

exports.deleteProjects = (req, res) => {
  const user = req.params.user_id;
  const project = req.params.project_id;

  removeProjects(project, user, (err, result) => {
    if (err) { res.status(404).send(err) }
    else
    res.status(204).end();
  });
};
