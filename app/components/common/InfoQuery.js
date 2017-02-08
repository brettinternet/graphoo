import React, {PropTypes} from 'react';

const InfoQuery = ({processInput, serviceInput, onSubmitProcess, onChange, onSubmitService}) => {
  return (
    <div>
      <form>
        <input
          name="process"
          label="Process"
          value={processInput}
          onChange={onChange}
          onSubmit={onSubmitProcess}
        />
      </form>
      <form>
        <input
          name="service"
          label="Service"
          value={serviceInput}
          onChange={onChange}
          onSubmit={onSubmitService}
        />
      </form>
    </div>
  );
};

InfoQuery.propTypes = {
  onSubmitProcess: React.PropTypes.func.isRequired,
  onSubmitService: React.PropTypes.func.isRequired
};

export default InfoQuery;
