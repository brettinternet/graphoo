import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const NavBar = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active" id="top-icon-container"><i className="material-icons menu-icon">play_circle_outline</i></IndexLink>
      <Link to="/monitor" activeClassName="active"><i className="material-icons menu-icon">av_timer</i></Link>
      <Link to="/top" activeClassName="active"><i className="material-icons menu-icon">list</i></Link>
      <div className="settings-container">
        <Link to="/settings" activeClassName="active" id="settings"><i className="material-icons menu-icon">settings</i></Link>
      </div>
    </nav>
  );
};
// {loading && <LoadingDots interval={400} dots={3}/>}

NavBar.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default NavBar;
