import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import Graph from '../common/Graph';
import TimeSelect from './TimeSelect';
import toastr from 'toastr';


class Monitor extends React.Component {
  constructor(props) {
    super(props)


    }

    this.getAll = this.getAll.bind(this);
    this.getToday = this.getToday.bind(this);
    this.getLastThreeHours = this.getLastThreeHours.bind(this);
    this.getLastSevenDays = this.getLastSevenDays.bind(this);
    this.getThisMonth = this.getThisMonth.bind(this);
  }

  componentDidUpdate() {
    let modules = this.props.settings.modules;
    this.modulesLoaded = Object.keys(modules).filter(el => modules[el].status);
  }

  componentWillMount() {
    let modules = this.props.settings.modules;
    this.modulesLoaded = Object.keys(modules).filter(el => modules[el].status);
    // this.getLastThreeHours();
  }

  getAll() {
    let time = 'all';
    toastr.info('Getting' +time+ 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          console.log(this.propse.data);
        })
        .catch(error => {
          toastr.error('Could not fetch data');
          console.error(error);
        });
    })
  }

  getToday() {
    let time = 'today';
    toastr.info('Getting' +time+ 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          console.log(this.props.data);
        })
        .catch(error => {
          toastr.error('Could not fetch data');
          console.error(error);
        });
    })
  }

  getLastThreeHours() {


    let time = 'lastThreeHours';
    toastr.info('Getting' +time+ 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          console.log(this.propse.data);
        })
        .catch(error => {
          toastr.error('Could not fetch data');
          console.error(error);
        });
    })
  }

  getLastSevenDays() {
    let time = 'lastSevenDays';
    toastr.info('Getting' +time+ 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          console.log(this.propse.data);
        })
        .catch(error => {
          toastr.error('Could not fetch data');
          console.error(error);
        });
    })
  }

  getThisMonth() {
    let time = 'thisMonth';
    toastr.info('Getting' +time+ 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          console.log(this.propse.data);
        })
        .catch(error => {
          toastr.error('Could not fetch data');
          console.error(error);
        });
    })
  }

  render() {
    return(
      <section>
        <h2>Monitor</h2>
        <TimeSelect
          onSelectAll={this.getAll}
          onSelectToday={this.getToday}
          onSelectLastThreeHours={this.getLastThreeHours}
          onSelectLastSevenDays={this.getLastSevenDays}
          onSelectThisMonth={this.getThisMonth}
        />
        <Graph
          data={this.props.data}
          />
      </section>
    )
  }
}

Monitor.propTypes = {
  settings: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    data: state.data,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dataActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
