/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaRegThumbsUp, FaRegThumbsDown} from 'react-icons/fa';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { VscReport } from 'react-icons/vsc';

import MessageButton from '../MessageButton';
import HandyIcon from '../HandyIcon';

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: props.project.favorited,
      vote: 'none',
      report: false,
    };

    this.handleProjectVote = this.handleProjectVote.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  handleProjectVote(newVote) {
    const { project, handleVote } = this.props;
    const { vote, report } = this.state;

    if (newVote === 'up') {
      if (vote === 'down') {
        handleVote('up', project.project_owner._id);
        handleVote('up', project.project_owner._id);
        this.setState({
          vote: 'up',
        });
      } else if (vote === 'up') {
        handleVote('down', project.project_owner._id);
        this.setState({
          vote: 'none',
        });
      } else if (vote === 'none') {
        handleVote('up', project.project_owner._id);
        this.setState({
          vote: 'up',
        });
      }
    } else if (newVote === 'down') {
      if (vote === 'up') {
        handleVote('down', project.project_owner._id);
        handleVote('down', project.project_owner._id);
        this.setState({
          vote: 'down',
        });
      } else if (vote === 'down') {
        handleVote('up', project.project_owner._id);
        this.setState({
          vote: 'none',
        });
      } else if (vote === 'none') {
        handleVote('down', project.project_owner._id);
        this.setState({
          vote: 'down',
        });
      }
    } else if (newVote === 'report' && !report) {
      handleVote('report', project.project_owner._id);
      this.setState({
        report: true,
      });
    }
  }

  toggleFavorite() {
    const { user, project } = this.props;
    const { favorited } = this.state;

    if (!favorited) {
      axios.put(`users/${user._id}/favorites`, { favorite: project._id })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    } else {
      axios.delete(`users/${user._id}/favorites`, { data: { favorite: project._id } })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }

    this.setState({
      favorited: !favorited,
    });
  }

  render() {
    const { user, project } = this.props;
    const { favorited, vote, report } = this.state;
    const tools = project.needed_tools;
    let score = project.project_owner.handy;

    if (vote === 'up') {
      score = project.project_owner.handy + 1;
    } else if (vote === 'down') {
      score = project.project_owner.handy - 1;
    }

    const faveHeartStyle = favorited ? <BsHeartFill onClick={this.toggleFavorite} size={28} className="project-img-heart" /> : <BsHeart onClick={this.toggleFavorite} size={28} className="project-img-heart" />;

    const faveButton = favorited ? <div className="card-footer-button" onClick={this.toggleFavorite}><BsHeartFill /> Favorite </div> :
    <div className="card-footer-button" onClick={this.toggleFavorite}><BsHeart /> Not favorite</div>;
    // const favorited = this.state.favorited ? <div className="project-footer-button">Unfavorite

    return (
      <div className="project-card static-width">
        <div className="project-name-div">{`Project: ${project.project_name}`}</div>
        <div className="project-info">
          <div className="project-photo-div">
            {faveHeartStyle}
            <img className="project-photo" src={project.project_photos[0]} alt="project" />
          </div>
          <div className="project-details">
            <span className="project-description">{`${project.project_description} just typing all of this out so it can fill more content incase someone typed a whole buncha stuff for content`}</span>
            <span>{project.help ? 'This project is in need of assistance' : 'This project does not need any assistance'}</span>
            <ul className="needed-tools">
              {tools ? tools.map((tool) => <li key={tools.indexOf(tool)}>{tool}</li>) : []}
            </ul>
          </div>
        </div>
        <div className="project-footer">
          <img className="project-owner-img" src={project.project_owner.photo} alt="avatar" />
          <div className="project-footer-name-div">
            <div className="project-footer-name-div"><span>{`${project.project_owner.name}(${score})`}</span></div>
            <HandyIcon score={project.project_owner.handy} usedIn="-project-footer" />
          </div>
          <div className="card-footer-buttons-div">
            <div className={`card-footer-button ${vote === 'up' ? 'up' : ''}`} onClick={() => this.handleProjectVote('up')}><FaRegThumbsUp />Upvote</div>
            <div className={`card-footer-button ${vote === 'down' ? 'down' : ''}`} onClick={() => this.handleProjectVote('down')}><FaRegThumbsDown />Downvote</div>
            {/* <div className="card-footer-button" onClick={this.toggleFavorite}><FaRegThumbsUp />{favorited ? 'Favorite' : 'Not favorite'}</div> */}
            {faveButton}
            <MessageButton user={user} otherUser={project.project_owner} usedIn="card-footer-button" />
            <div className={`card-footer-button ${report ? 'report' : ''}`} onClick={() => this.handleProjectVote('report')}><VscReport />Report</div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    zip: PropTypes.number.isRequired,
    password: PropTypes.string,
    photo: PropTypes.string,
    handy: PropTypes.number.isRequired,
    report: PropTypes.number.isRequired,
    tools: PropTypes.arrayOf(PropTypes.shape({
      tool_name: PropTypes.string,
      tool_photos: PropTypes.arrayOf(PropTypes.string),
      tool_owner: PropTypes.string,
      help: PropTypes.bool,
    })),
    projects: PropTypes.arrayOf(PropTypes.shape({
      project_name: PropTypes.string.isRequired,
      project_description: PropTypes.string,
      project_owner: PropTypes.string.isRequired,
      help: PropTypes.bool.isRequired,
      project_photos: PropTypes.arrayOf(PropTypes.string),
    })),
    favorites: PropTypes.objectOf(PropTypes.bool),
  }).isRequired,
  project: PropTypes.shape({
    _id: PropTypes.string,
    project_name: PropTypes.string,
    project_description: PropTypes.string,
    project_owner: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      handy: PropTypes.number,
      photo: PropTypes.string,
    }),
    help: PropTypes.bool,
    favorited: PropTypes.bool,
    project_photos: PropTypes.arrayOf(PropTypes.string),
    needed_tools: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
