import React from "react";
import axios from "axios";
import EditPhotoDisplay from "./EditPhotoDisplay";
import hf from './helperFunctions';

class EditDeleteUserProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: this.props.project.project_name,
      project_description: this.props.project.project_description,
      project_photos: this.props.project.project_photos,
      needed_tools: this.props.project.needed_tools,
      help: this.props.project.help,
    };

    this.handleGetFields = this.handleGetFields.bind(this);
    this.handleAddToPhotoList = this.handleAddToPhotoList.bind(this);
    this.handleDeleteFromProjectPhotos = this.handleDeleteFromProjectPhotos.bind(
      this
    );
    this.handleToggleHelp = this.handleToggleHelp.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  handleGetFields(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddToPhotoList() {
    const { project_photo, project_photos } = this.state;
    this.setState({
      project_photos: hf.handleAddItem(project_photo, project_photos),
    });
    let inputField = document.querySelector('input[name="project_photo"]');
    inputField.value = "";
  }

  handleDeleteFromProjectPhotos(itemToDelete) {
    const { project_photos } = this.state;
    this.setState({
      project_photos: hf.handleDeleteItem(itemToDelete, project_photos),
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
      help,
      needed_tools,
    } = this.state;
    let editProjectObj = {
      project_name: project_name,
      project_description: project_description,
      project_photos: project_photos,
      needed_tools: needed_tools || [],
      help: help,
    };
    console.log(editProjectObj, _id, user_id);
    axios
      .put(`/users/${user_id}/projects/${_id}`, editProjectObj)
      .then((response) => {
        toggleProjectEditDelete();
      })
      .catch((err) => {
        throw err;
      });
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
    const {
      toggleProjectEditDelete,
    } = this.props;
    const {
      project_name,
      project_description,
      project_photos,
      help,
    } = this.state;
    return (
      <div>
        Project Name:{" "}
        <input
          type="text"
          name={project_name}
          value={project_name}
          onChange={this.handleGetFields}
        />
        Project Description:{" "}
        <input
          type="text"
          value={project_description}
          onChange={this.handleGetFields}
        />
        {project_photos !== [] && (
          <EditPhotoDisplay
            key={project_photos}
            photos={project_photos}
            deleteFunction={this.handleDeleteFromProjectPhotos}
          />
        )}
        Project Photos:{" "}
        <input
          type="text"
          name="project_photo"
          onChange={this.handleGetFields}
        />
        <button onClick={this.handleAddToPhotoList}>Add Photo</button>
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
