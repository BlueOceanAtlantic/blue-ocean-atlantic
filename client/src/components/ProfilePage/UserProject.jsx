import React from "react";
import axios from "axios";
import EditDeleteUserProject from "./EditDeleteUserProject";
import PhotoDisplay from "./PhotoDisplay";

class UserProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showProjectEditDelete: false };

    this.formattedDate = this.formattedDate.bind(this);
    this.toggleProjectEditDelete = this.toggleProjectEditDelete.bind(this);
  }
  formattedDate(date) {
    return new Date(date).toLocaleDateString();
  }

  toggleProjectEditDelete() {
    const { showProjectEditDelete } = this.state;
    this.setState({ showProjectEditDelete: !showProjectEditDelete });
  }

  render() {
    const { project, user_id, handleGetTargetName, handleAddItem } = this.props;
    const { showProjectEditDelete } = this.state;
    const formattedDate = this.formattedDate(project.createdAt);
    return (
      <div className="project-card user-project">
        {!showProjectEditDelete && (
          <div>
            <div>Project Name: {project.project_name}</div>
            <div>Project Description: {project.project_description}</div>
            <PhotoDisplay
              photos={project.project_photos}
              handleGetTargetName={handleGetTargetName}
            />
            {project.help ? <div>Need Help!</div> : <div>No help</div>}
            <div>{project.needed_tools}</div>
            <div>{formattedDate}</div>
            <div>
              <button onClick={this.toggleProjectEditDelete}>
                Edit/Delete Project
              </button>
            </div>
          </div>
        )}
        {showProjectEditDelete && (
          <EditDeleteUserProject
            project={project}
            user_id={user_id}
            formattedDate={formattedDate}
            handleGetTargetName={handleGetTargetName}
            handleAddItem={handleAddItem}
            toggleProjectEditDelete={this.toggleProjectEditDelete}
          />
        )}
      </div>
    );
  }
}

export default UserProject;
