import React, {PropTypes} from 'react';
// import moment from 'moment';

const Processes = ({data}) => {
  // console.log(data.modules.processes);
  return (
    <table>
      <tbody>
        <tr>
          <td>processes here...</td>
        </tr>
      </tbody>
    </table>
  );
};


Processes.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default Processes;
