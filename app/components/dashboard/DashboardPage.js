import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Graph from '../common/Graph';
import InfoDisplay from '../common/InfoDisplay';
import InfoQuery from '../common/InfoQuery';
import * as infoActions from '../../actions/infoActions';
import * as dataActions from '../../actions/dataActions';
import toastr from 'toastr';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidUpdate() {
    let modules = this.props.settings.modules;
    this.modulesLoaded = Object.keys(modules).filter(el => modules[el].status);
    console.log('ACTIVE MODULES:', this.modulesLoaded);
  }

  render() {
    return(
      <section>
        <h1>Dashboard</h1>
      </section>
    )
  }
}

Dashboard.propTypes = {
  settings: PropTypes.object.isRequired,
  info: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    info: state.info,
    data: state.data,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...infoActions, ...dataActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
