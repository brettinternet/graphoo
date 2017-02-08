import React, {PropTypes} from 'react';

const TimeSelect = ({onSelectAll, onSelectToday, onSelectLastThreeHours, onSelectLastSevenDays, onSelectThisMonth}) => {
  return (
    <div className="time-select-component">
      <a onClick={onSelectLastThreeHours}><i className="material-icons time-icon">view_week</i>3 Hours</a>
      <a onClick={onSelectToday}><i className="material-icons time-icon">today</i>Today</a>
      <a onClick={onSelectLastSevenDays}><i className="material-icons time-icon">date_range</i>7 Days</a>
      <a onClick={onSelectThisMonth}><i className="material-icons time-icon">event</i>Month</a>
      <a onClick={onSelectAll}><i className="material-icons time-icon">all_out</i>All</a>
    </div>
  );
};


TimeSelect.propTypes = {
  onSelectAll: React.PropTypes.func.isRequired,
  onSelectToday: React.PropTypes.func.isRequired,
  onSelectLastThreeHours: React.PropTypes.func.isRequired,
  onSelectLastSevenDays: React.PropTypes.func.isRequired,
  onSelectThisMonth: React.PropTypes.func.isRequired
};

export default TimeSelect;
