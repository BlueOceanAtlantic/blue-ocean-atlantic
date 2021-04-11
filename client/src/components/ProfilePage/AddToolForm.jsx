import React from "react";
import axios from "axios";
import AddToolFormToolPhotos from "./AddToolFormToolPhotos";
import EditPhotoDisplay from './EditPhotoDisplay';
import hf from './helperFunctions';

class AddToolForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tool_name: "",
      tool_photo: "",
      help: false,
      tool_photos: [],
    };

    this.handleGetFields = this.handleGetFields.bind(this);
    this.handleAddToolToToolList = this.handleAddToolToToolList.bind(this);
    this.handleToggleHelp = this.handleToggleHelp.bind(this);
    this.handleAddToolPhoto = this.handleAddToolPhoto.bind(this);
    this.handleDeleteToolPhoto = this.handleDeleteToolPhoto.bind(this);
  }

  handleGetFields(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleToggleHelp() {
    const { help } = this.state;
    this.setState({ help: !help });
  }

  handleAddToolPhoto() {
    const { tool_photo, tool_photos } = this.state;
    this.setState({tool_photos: hf.handleAddItem(tool_photo, tool_photos)})
    let inputField = document.querySelector('input[name="tool_photo"]');
    inputField.value = "";
  }

  handleDeleteToolPhoto(itemToDelete) {
    const { tool_photos } = this.state;
    let updatedToolPhotos = hf.handleDeleteItem(itemToDelete, tool_photos);
    this.setState({ tool_photos: updatedToolPhotos });
  }

  handleAddToolToToolList() {
    const {user_id, toggleAddToolForm} = this.props;
    const { tool_name, tool_photos, help } = this.state;
    let newUserToolObj = {
      tool_name: tool_name,
      tool_photos: tool_photos,
      help: help,
    };
    console.log(newUserToolObj);
    axios
      .post(`/users/${user_id}/tools`, newUserToolObj)
      .then((response) => {
        toggleAddToolForm();
      })
      .catch((err) => {
        throw err;
      });
  }
  render() {
    const { toggleAddToolForm } = this.props;
    const { tool_photos } = this.state;
    return (
      <div>
          Tool Name:{" "}
        <input type="text" name="tool_name" onChange={this.handleGetFields} />
        <br />
        Tool Photo:{" "}
        <input type="text" name="tool_photo" onChange={this.handleGetFields} />
        <button onClick={this.handleAddToolPhoto}>Add Tool Photo</button>
        <br />
        {tool_photos.length > 0 && (
          <EditPhotoDisplay photos={tool_photos} deleteFunction={this.handleDeleteToolPhoto}/>
        )}
        Need Help: <input type="checkbox" onChange={this.handleToggleHelp} />
        <br />
        <button onClick={this.handleAddToolToToolList}>Add Tool(s)</button>
        <button onClick={toggleAddToolForm}>Cancel</button>
      </div>
    );
  }
}

export default AddToolForm;
