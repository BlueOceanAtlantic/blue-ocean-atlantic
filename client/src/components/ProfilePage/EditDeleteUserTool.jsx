import React from "react";
import axios from "axios";
import EditPhotoDisplay from "./EditPhotoDisplay";
import hf from "./helperFunctions";

class EditDeleteUserTool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tool_name: "",
      tool_photos: this.props.tool.tool_photos,
      new_photos: [],
      new_previews: [],
      help: this.props.tool.help,
    };

    this.handleGetFields = this.handleGetFields.bind(this);
    this.handleAddToToolPhotoList = this.handleAddToToolPhotoList.bind(this);
    this.handleDeleteFromToolPhotos = this.handleDeleteFromToolPhotos.bind(
      this
    );
    this.handleDeleteFromNewPhotos = this.handleDeleteFromNewPhotos.bind(this);
    this.handleToggleHelp = this.handleToggleHelp.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deleteTool = this.deleteTool.bind(this);
  }

  handleGetFields(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddToToolPhotoList(e) {
    debugger;
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

  handleDeleteFromToolPhotos(photoIndex) {
    photoIndex = parseInt(photoIndex);
    debugger;
    const { tool_photos } = this.state;
    let revisedPhotos = [];
    for (let i = 0; i < tool_photos.length; i++) {
      if (i !== photoIndex) {
        revisedPhotos.push(tool_photos[i]);
      }
    }
    this.setState({ tool_photos: revisedPhotos });
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
    const { user_id, toggleToolEditDelete } = this.props;
    const { _id } = this.props.tool;
    const { tool_name, tool_photos, new_photos, help } = this.state;
    const submitToolEdit = (photoArray) => {
      const allPhotos = tool_photos.concat(photoArray);
      let editToolObj = {
        tool_name: tool_name,
        tool_photos: allPhotos,
        help: help,
      };
      console.log(editToolObj, user_id, _id);
      debugger;
      axios
        .put(`/users/${user_id}/tools/${_id}`)
        .then((response) => {
          toggleToolEditDelete();
        })
        .catch((err) => {
          throw err;
        });
    };
    hf.cloudinaryUpload(new_photos, submitToolEdit);
  }

  deleteTool() {
    const { user_id, toggleToolEditDelete } = this.props;
    const { _id } = this.props.tool;
    axios
      .delete(`/users/${user_id}/tools/${_id}`)
      .then(() => {
        console.log("tool deleted");
        toggleToolEditDelete();
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { tool, toggleToolEditDelete } = this.props;
    const {
      tool_photos,
      tool_name,
      new_photos,
      new_previews,
      help,
    } = this.state;
    return (
      <div>
        Tool Name:{" "}
        <input
          type="text"
          name="tool_name"
          value={tool_name}
          onChange={this.handleGetFields}
        />
        {tool_photos !== [] && (
          <EditPhotoDisplay
            key={tool_photos}
            photos={tool_photos}
            deleteFunction={this.handleDeleteFromToolPhotos}
          />
        )}
        {new_photos !== [] && (
          <EditPhotoDisplay
            key={new_photos}
            photos={new_previews}
            deleteFunction={this.handleDeleteFromNewPhotos}
          />
        )}
        <input
          type="file"
          name="tool_photo"
          onChange={this.handleAddToToolPhotoList}
          multiple
        />
        <button onClick={this.handleAddToToolPhotoList}>Add Photo</button>
        Need Help:{" "}
        <input
          type="checkbox"
          checked={help}
          onChange={this.handleToggleHelp}
        />
        <button onClick={this.saveChanges}>Save Changes</button>
        <button onClick={toggleToolEditDelete}>Cancel</button>
        <button onClick={this.deleteTool}>Delete Tool</button>
      </div>
    );
  }
}

export default EditDeleteUserTool;
