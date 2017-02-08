import React, {PropTypes} from 'react';
import NavBar from './common/NavBar';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar
          loading={this.props.loading}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
