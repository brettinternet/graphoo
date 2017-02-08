import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as settingsActions from '../../actions/settingsActions';
import InfoDisplay from '../common/InfoDisplay';
import Config from './Configuration';
import LogsDisplay from './LogsDisplay';
import toastr from 'toastr';

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: Object.assign({}, props.settings),
      hint: false
    }
    this.changeSettings = this.changeSettings.bind(this);
    toastr.options = {"positionClass": "toast-bottom-right"}
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.settings.logLevel != nextProps.settings.logLevel) {
      this.setState({settings: Object.assign({}, nextProps.settings)});
    }
  }

  changeSettings(event) {
    if (event.target.id === "modules") {
      if (event.target.type === 'checkbox') {
        const field = event.target.name;
        let settings = this.state.settings;
        settings.modules[field].status = event.target.checked;
        this.shouldSaveSettings();
        return this.setState({settings});
      } else if (event.target.type === 'number') {
        const field = event.target.name;
        let settings = this.state.settings;
        settings.modules[field].interval = event.target.value;
        this.shouldSaveSettings();
        return this.setState({settings});
      } else if (event.target.type === 'text') {
        const field = event.target.name,
              subfield = event.target.className;
        let settings = this.state.settings;
        settings.modules[field][subfield] = event.target.checked;
        this.shouldSaveSettings();
        return this.setState({settings});
      }
    } else if (event.target.id === 'db') {
      if (event.target.type === 'checkbox') {
        const field = event.target.name;
        let settings = this.state.settings;
        settings.db[field].status = event.target.checked;
        this.shouldSaveSettings();
        return this.setState({settings});
      } else {
        const field = event.target.name,
              subfield = event.target.className;
        let settings = this.state.settings;
        settings.db[field][subfield] = event.target.checked;
        this.shouldSaveSettings();
        return this.setState({settings});
      }
    } else if (event.target.id === 'global') {
      const field = event.target.name;
      let settings = this.state.settings;
      settings[field] = event.target.value;
      this.shouldSaveSettings();
      return this.setState({settings});
    }
  }

  resetTimer: null;
  shouldSaveSettings() {
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
      this.resetTimer = null;
    }
    this.resetTimer = setTimeout(() => {
      let logValues = ['error', 'warn', 'info', 'debug'];
      if (!logValues.includes(this.state.settings.logLevel)) {
        return toastr.error('Invalid log level');
      }
      for (let prop in this.state.settings.modules) {
        if (this.state.settings.modules[prop].status && !this.state.settings.modules[prop].interval) {
          return toastr.error(prop + ' must have a time interval');
        }
      }
      this.props.actions.saveSettings(this.state.settings)
        .then(() => this.confirmSettingsSaved())
        .catch(error => {
          toastr.error('Error saving settings...', error);
        });
    }, 3000);
  }

  confirmSettingsSaved() {
    toastr.success('Settings saved');
  }

  render() {
    return(
      <section className="settings-page">
        <Config
          settings={this.state.settings}
          onChange={this.changeSettings}
          hint={this.state.hint}
        />
        <LogsDisplay
          logs={this.props.logs}
        />
      </section>
    )
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  logs: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings,
    info: state.info,
    logs: state.logs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(settingsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
