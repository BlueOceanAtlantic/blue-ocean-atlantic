import React from "react";
import axios from "axios";
import EditPhotoDisplay from "./EditPhotoDisplay";
import hf from "./helperFunctions";

class EditDeleteUserProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: "",
      project_description: "",
      project_photos: this.props.project.project_photos,
      new_photos: [],
      new_previews: [],
      needed_tools: this.props.project.needed_tools,
      help: this.props.project.help,
    };

    this.handleGetFields = this.handleGetFields.bind(this);
    this.handleAddToPhotoList = this.handleAddToPhotoList.bind(this);
    this.handleDeleteFromProjectPhotos = this.handleDeleteFromProjectPhotos.bind(
      this
    );
    this.handleDeleteFromNewPhotos = this.handleDeleteFromNewPhotos.bind(this);
    this.handleToggleHelp = this.handleToggleHelp.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  handleGetFields(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddToPhotoList(e) {
    e.preventDefault();
    const { new_photos, new_previews } = this.state;
    let newPhoto = e.target.files[0];
    let revisedPhotos = new_photos.concat(newPhoto);
    let revisedPreviews = new_previews.concat(URL.createObjectURL(newPhoto));

    this.setState({
      new_photos: revisedPhotos,
      new_previews: revisedPreviews,
    });
  }

  handleDeleteFromProjectPhotos(photoIndex) {
    photoIndex = parseInt(photoIndex);
    const { project_photos } = this.state;
    let revisedPhotos = [];
    for (let i = 0; i < project_photos.length; i++) {
      if (i !== photoIndex) {
        revisedPhotos.push(project_photos[i]);
      }
    }
    this.setState({
      project_photos: revisedPhotos,
    });
  }

  handleDeleteFromNewPhotos(photoIndex) {
    photoIndex = parseInt(photoIndex);
    const { new_photos, new_previews } = this.state;
    let revisedPhotos = [];
    let revisedPreviews = [];
    for (let i = 0; i < new_photos.length; i++) {
      if (i !== photoIndex) {
        revisedPhotos.push(new_photos[i]);
        revisedPreviews.push(new_previews[i]);
      }
    }
    this.setState({
      new_photos: revisedPhotos,
      new_previews: revisedPreviews,
    });
  }

  handleToggleHelp() {
    const { help } = this.state;
    this.setState({ help: !help });
  }

  saveChanges() {
    const { user_id, toggleProjectEditDelete } = this.props;
    const { _id } = this.props.project;
    const {
      project_name,
      project_description,
      project_photos,
      new_photos,
      help,
      needed_tools,
    } = this.state;

    const submitProjectEdit = (photoArray) => {
      const allPhotos = project_photos.concat(photoArray);
      let editProjectObj = {
        project_name: project_name,
        project_description: project_description,
        project_photos: allPhotos,
        needed_tools: needed_tools,
        help: help,
      };
      axios
        .put(`/users/${user_id}/projects/${_id}`, editProjectObj)
        .then((response) => {
          toggleProjectEditDelete();
        })
        .catch((err) => {
          throw err;
        });
    };
    hf.cloudinaryUpload(new_photos, submitProjectEdit);
  }

  deleteProject() {
    const { user_id, toggleProjectEditDelete } = this.props;
    const { _id } = this.props.project;
    axios
      .delete(`/users/${user_id}/projects/${_id}`)
      .then(() => {
        toggleProjectEditDelete();
      })
      .catch((err) => {
        throw err;
      });
    console.log("delete");
  }

  render() {
    const { toggleProjectEditDelete } = this.props;
    const { project_photos, new_photos, new_previews, help } = this.state;
    return (
      <div>
        Project Name:{" "}
        <input
          type="text"
          name="project_name"
          onChange={this.handleGetFields}
        />
        Project Description:{" "}
        <input
          type="text"
          name="project_description"
          onChange={this.handleGetFields}
        />
        {project_photos !== [] && (
          <EditPhotoDisplay
            key={project_photos}
            photos={project_photos}
            deleteFunction={this.handleDeleteFromProjectPhotos}
          />
        )}
        {new_photos !== [] && (
          <EditPhotoDisplay
            key={new_photos}
            photos={new_previews}
            deleteFunction={this.handleDeleteFromNewPhotos}
          />
        )}
        Project Photos:{" "}
        <input
          type="file"
          name="project_photo"
          onChange={this.handleAddToPhotoList}
          multiple
        />
        Need Help:{" "}
        <input
          type="checkbox"
          checked={help}
          onChange={this.handleToggleHelp}
        />
        <div>
          <button onClick={this.saveChanges}>Save Changes</button>
          <button onClick={toggleProjectEditDelete}>Cancel</button>
          <button onClick={this.deleteProject}>Delete Project</button>
        </div>
      </div>
    );
  }
}

export default EditDeleteUserProject;
