import React from "react";
import axios from "axios";
import EditPhotoDisplay from "./EditPhotoDisplay";
import hf from './helperFunctions';

class EditDeleteUserTool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tool_name: this.props.tool.tool_name,
      tool_photos: this.props.tool.tool_photos,
      tool_photo: "",
      help: this.props.tool.help,
    };

    this.handleGetFields = this.handleGetFields.bind(this);
    this.handleAddToToolPhotoList = this.handleAddToToolPhotoList.bind(this);
    this.handleDeleteFromToolPhotos = this.handleDeleteFromToolPhotos.bind(
      this
    );
    this.handleToggleHelp = this.handleToggleHelp.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deleteTool = this.deleteTool.bind(this);
  }

  handleGetFields(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddToToolPhotoList() {
    const { handleAddItem } = this.props;
    const { tool_photo, tool_photos } = this.state;
    this.setState({ tool_photos: handleAddItem(tool_photo, tool_photos) });

  }

  handleDeleteFromToolPhotos(target) {
    const { tool_photos } = this.state;
    this.setState({ tool_photos: hf.handleDeleteItem(target, tool_photos) });
  }

  handleToggleHelp() {
    const { help } = this.state;
    this.setState({ help: !help });
  }
  saveChanges() {
    const { user_id, toggleToolEditDelete } = this.props;
    const { _id } = this.props.tool;
    const { tool_name, tool_photos, help } = this.state;
    let editToolObj = {
      tool_name: tool_name,
      tool_photos: tool_photos,
      help: help,
    };
    console.log(editToolObj, user_id, _id);
    axios
      .put(`/users/${user_id}/tools/${_id}`)
      .then((response) => {
        toggleToolEditDelete();
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteTool() {
    const { user_id } = this.props;
    const { _id } = this.props.tool;
    axios
      .delete(`/users/${user_id}/tools/${id}`)
      .then(() => {
        console.log("tool deleted");
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { tool, toggleToolEditDelete} = this.props;
    const { tool_photos, tool_name, help } = this.state;
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
        <input type="text" name="tool_photo" onChange={this.handleGetFields} />
        <button onClick={this.handleAddToToolPhotoList}>Add Photo</button>
        Need Help:{" "}
        <input
          type="checkbox"
          checked={help}
          onChange={this.handleToggleHelp}
        />
        <button onClick={this.saveChanges}>Save Changes</button>
        <button onClick={toggleToolEditDelete}>Cancel</button>
      </div>
    );
  }
}

export default EditDeleteUserTool;
