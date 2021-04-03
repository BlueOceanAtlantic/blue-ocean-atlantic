const mongoose = require('mongoose');

exports.projectsSchema = mongoose.Schema({
  project_name: String,
  project_description: String,
  project_owner: [{
    type: mongoose.Schema.Types.Number,
    ref: 'User',
  }],
  project_photos: [{ type: String }],
  help: Boolean,
});
