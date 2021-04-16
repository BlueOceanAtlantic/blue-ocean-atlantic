import React from "react";
import axios from "axios";
import ProjectToolList from "./ProjectToolList";
import EditPhotoDisplay from "./EditPhotoDisplay";
import hf from "./helperFunctions";

class AddProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: "",
      project_description: "",
      needed_tool: "",
      project_photo: null,
      help: false,
      needed_tools: [],
      project_photos: [],
      photo_previews: [],
    };
    this.handleGetFields = this.handleGetFields.bind(this);
    this.handleToggleNeedHelp = this.handleToggleNeedHelp.bind(this);
    this.handleAddToolToProjectToolList = this.handleAddToolToProjectToolList.bind(
      this
    );
    this.handleAddPhotoToProjectPhotoList = this.handleAddPhotoToProjectPhotoList.bind(
      this
    );
    this.handleDeleteFromProjectToolList = this.handleDeleteFromProjectToolList.bind(
      this
    );
    this.handleDeleteFromProjectPhotos = this.handleDeleteFromProjectPhotos.bind(
      this
    );
    this.handleSubmitNewProject = this.handleSubmitNewProject.bind(this);
  }

  handleGetFields(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleToggleNeedHelp() {
    const { help } = this.state;
    this.setState({ help: !help });
  }

  handleAddToolToProjectToolList(e) {
    e.preventDefault();
    const { needed_tool, needed_tools } = this.state;
    const revisedTools = hf.handleAddItem(needed_tool, needed_tools);
    this.setState({
      needed_tools: revisedTools,
    });
  }

  handleAddPhotoToProjectPhotoList(e) {
    e.preventDefault();
    const { project_photos, photo_previews } = this.state;
    let photo = e.target.files[0];
    let revisedPhotos = project_photos.concat(photo);
    let revisedPreviews = photo_previews.concat(URL.createObjectURL(photo));
    this.setState({
      project_photos: revisedPhotos,
      photo_previews: revisedPreviews,
    });
  }

  handleDeleteFromProjectToolList(e) {
    e.preventDefault();
    const { needed_tools } = this.state;
    let v = e.target.name;
    let updatedTools = [];
    needed_tools.forEach((tool) => {
      if (tool !== v) {
        updatedTools.push(tool);
      }
    });
    this.setState({ needed_tools: updatedTools });
  }

  handleDeleteFromProjectPhotos(photoIndex) {
    const { project_photos, photo_previews } = this.state;
    photoIndex = parseInt(photoIndex);
    let revisedPhotos = [];
    let revisedPreviews = [];
    for (let i = 0; i < project_photos.length; i++) {
      if (i !== photoIndex) {
        revisedPhotos.push(project_photos[i]);
        revisedPreviews.push(photo_previews[i]);
      }
    }
    this.setState({
      project_photos: revisedPhotos,
      photo_previews: revisedPreviews,
    });
  }

  handleSubmitNewProject() {
    const { user_id, toggleAddProjectForm } = this.props;
    const {
      project_name,
      project_description,
      help,
      needed_tools,
      project_photos,
    } = this.state;

    const postProject = (photoArray) => {
      let newUserProjectObj = {
        project_name: project_name,
        project_description: project_description,
        help: help,
        project_photos: photoArray,
        needed_tools: needed_tools,
      };
      axios
        .post(`/users/${user_id}/projects`, newUserProjectObj)
        .then((response) => {
          toggleAddProjectForm();
        })
        .catch((err) => {
          throw err;
        });
    };
    hf.cloudinaryUpload(project_photos, postProject);
  }

  render() {
    const { toggleAddProjectForm } = this.props;
    const { needed_tools, project_photos, photo_previews } = this.state;
    return (
      <div>
        Project Name:{" "}
        <input
          type="text"
          name="project_name"
          onChange={this.handleGetFields}
        />
        <br />
        Project Description:{" "}
        <input
          type="text"
          name="project_description"
          onChange={this.handleGetFields}
        />
        <br />
        Needed Tools:{" "}
        <input type="text" name="needed_tool" onChange={this.handleGetFields} />
        <button onClick={this.handleAddToolToProjectToolList}>Add Tool</button>
        <br />
        {needed_tools !== [] && (
          <ProjectToolList
            needed_tools={needed_tools}
            handleDeleteFromProjectToolList={
              this.handleDeleteFromProjectToolList
            }
          />
        )}
        Project Photos:{" "}
        <input
          type="file"
          name="project_photo"
          onChange={this.handleAddPhotoToProjectPhotoList}
          multiple
        />
        <br />
        {project_photos !== [] && (
          <EditPhotoDisplay
            key={project_photos}
            photos={photo_previews}
            deleteFunction={this.handleDeleteFromProjectPhotos}
          />
        )}
        Need Help?:{" "}
        <input type="checkbox" onChange={this.handleToggleNeedHelp} />
        <br />
        <button onClick={this.handleSubmitNewProject}>Add Project</button>
        <button onClick={toggleAddProjectForm}>Cancel</button>
      </div>
    );
  }
}

export default AddProjectForm;
