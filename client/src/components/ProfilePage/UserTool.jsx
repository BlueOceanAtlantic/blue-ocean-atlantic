import React from "react";
import EditDeleteUserTool from "./EditDeleteUserTool";
import PhotoDisplay from "./PhotoDisplay";

class UserTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showToolEditDelete: false };

    this.toggleToolEditDelete = this.toggleToolEditDelete.bind(this);
  }

  toggleToolEditDelete() {
    const { showToolEditDelete } = this.state;
    this.setState({ showToolEditDelete: !showToolEditDelete });
  }
  render() {
    const { tool, user_id, handleGetTargetName, handleAddItem } = this.props;
    const { showToolEditDelete } = this.state;
    return (
      <div className="tool-card user-tool">
        {!showToolEditDelete && (
          <div>
            <div>Tool Name: {tool.tool_name}</div>
            <PhotoDisplay photos={tool.tool_photos} />
            {tool.help ? <div>Need Help!</div> : <div>No Help</div>}
            <button onClick={this.toggleToolEditDelete}>
              Edit/Delete Tool
            </button>
          </div>
        )}
        {showToolEditDelete && (
          <EditDeleteUserTool
            user_id={user_id}
            tool={tool}
            toggleToolEditDelete={this.toggleToolEditDelete}
            handleGetTargetName={handleGetTargetName}
            handleAddItem={handleAddItem}
          />
        )}
      </div>
    );
  }
}

export default UserTool;
