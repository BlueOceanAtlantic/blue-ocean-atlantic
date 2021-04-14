import React from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { VscReport } from 'react-icons/vsc';

import HandyIcon from '../HandyIcon';
import MessageButton from '../MessageButton';

class ToolCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: 'none',
      report: false,
    }

    this.handleToolVote = this.handleToolVote.bind(this);
  }

  handleToolVote(newVote) {
    const { tool, handleVote } = this.props;
    const { vote } = this.state;

    if (newVote === 'up') {
      if (vote === 'down') {
        handleVote('up', tool.tool_owner._id);
        handleVote('up', tool.tool_owner._id);
        this.setState({
          vote: 'up',
        });
      } else if (vote === 'up') {
        handleVote('down', tool.tool_owner._id);
        this.setState({
          vote: 'none',
        });
      } else if (vote === 'none') {
        handleVote('up', tool.tool_owner._id);
        this.setState({
          vote: 'up',
        });
      }
    } else if (newVote === 'down') {
      if (vote === 'up') {
        handleVote('down', tool.tool_owner._id);
        handleVote('down', tool.tool_owner._id);
        this.setState({
          vote: 'down',
        });
      } else if (vote === 'down') {
        handleVote('up', tool.tool_owner._id);
        this.setState({
          vote: 'none',
        });
      } else if (vote === 'none') {
        handleVote('down', tool.tool_owner._id);
        this.setState({
          vote: 'down',
        });
      }
    } else if (newVote === 'report' && !report) {
      handleVote('report', tool.tool_owner._id);
      this.setState({
        report: true,
      });
    }
  }

  render() {
    const { tool_name, tool_photos, tool_owner } = this.props.tool;
    const { name, photo, handy } = this.props.tool.tool_owner;
    const { user } = this.props;
    const { vote, report } = this.state;
    let score = handy;

    if (vote === 'up') {
      score = handy + 1;
    } else if (vote === 'down') {
      score = handy - 1;
    }

    return (
      <div className="tool-card static-width">
        <div className="user-name-and-score-div">
          <div className="tool-user-avatar-div"><img className="tool-avatar-img" src={photo} alt={name} /></div>
          <div className="tool-user-name-div">{`${name}(${score})`}</div>
          <div className="tool-handy-div">
            {/* <div className="tool-handy-emblem"> */}
              <HandyIcon score={handy} usedIn={'-tools'} />
            {/* </div> */}
          </div>
        </div>
        <div className="tool-name-image-and-message-div">
          <div className="tool-name-div">{`Tool: ${tool_name}`}</div>
          <div className="tool-image-div"><img className="tool-card-tool-img" src={tool_photos[0]} alt={tool_name} /></div>
          <div className="card-footer-buttons-div">
            <div className={`card-footer-button ${vote === 'up' ? 'up' : ''}`} onClick={() => this.handleToolVote('up')} ><FaRegThumbsUp />Upvote</div>
            <div className={`card-footer-button ${vote === 'down' ? 'down' : ''}`} onClick={() => this.handleToolVote('down')} ><FaRegThumbsDown />Downvote</div>
            <MessageButton user={user} otherUser={tool_owner} usedIn="card-footer-button" />
            <div className={`card-footer-button ${report ? 'report' : ''}`} onClick={() => this.handleToolVote('report')} ><VscReport />Report</div>
          </div>
        </div>
      </div>
    );
  }

}


export default ToolCard;