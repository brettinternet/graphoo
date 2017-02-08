import React, {PropTypes} from 'react';
import ConfigModules from './ConfigModules';
import ConfigDb from './ConfigDb';

const Configuration = ({settings, onChange, hint}) => {
  return (
    <div className="options-configure">
      <ConfigModules
        modules={settings.modules}
        onChange={onChange}
      />
      <div className="options-right">
        <table className="options-main">
          <tbody>
            <tr>
              <td>Port</td>
              <td></td>
              <td>
                <input
                  id="global"
                  type="number"
                  name="port"
                  onChange={onChange}
                  value={settings.port}
                  placeholder="3000"
                />
              </td>
            </tr>
            <tr>
              <td>Log Level</td>
              <td></td>
              <td>
                <input
                  id="global"
                  type="text"
                  name="logLevel"
                  onChange={onChange}
                  value={settings.logLevel}
                  onFocus={() => hint = true}
                  placeholder="warn"
                />
              </td>
            </tr>
            { hint ?
            <tr className="hint">
              <td>Log Levels:</td>
              <td>error, warn, info, debug</td>
            </tr>
            : null }
          </tbody>
          <ConfigDb
            db={settings.db}
            onChange={onChange}
          />
        </table>
      </div>
    </div>
  );
};

Configuration.propTypes = {
  settings: PropTypes.object.isRequired
};

export default Configuration;
