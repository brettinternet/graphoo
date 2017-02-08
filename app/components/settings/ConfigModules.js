import React, {PropTypes} from 'react';

const ConfigModules = ({modules, onChange}) => {
  return (
    <div className="options-modules">
      <table>
        <tbody>
          <tr>
            <td>CPU</td>
            <td></td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="cpu"
                  onChange={onChange}
                  checked={modules.cpu.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.cpu.status
            ?
          <tr>
            <td>Interval</td>
            <td>
              <input
                id="modules"
                type="number"
                name="cpu"
                onChange={onChange}
                value={modules.cpu.interval}
                placeholder="5000"
              />
            </td>
            <td>ms</td>
          </tr>
            : null
          }
          <tr>
            <td>Processes</td>
            <td></td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="processes"
                  onChange={onChange}
                  checked={modules.processes.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.processes.status
            ?
          <tr>
            <td>Interval</td>
            <td>
              <input
                id="modules"
                type="number"
                name="processes"
                onChange={onChange}
                value={modules.processes.interval}
                placeholder="5000"
              />
            </td>
            <td>ms</td>
          </tr>
            : null
          }
          <tr>
            <td>Memory</td>
            <td></td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="memory"
                  onChange={onChange}
                  checked={modules.memory.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.memory.status
            ?
          <tr>
            <td>Interval</td>
            <td>
              <input
                id="modules"
                type="number"
                name="memory"
                onChange={onChange}
                value={modules.memory.interval}
                placeholder="5000"
              />
            </td>
            <td>ms</td>
          </tr>
            : null
          }
          <tr>
            <td>Temperature</td>
            <td></td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="temperature"
                  onChange={onChange}
                  checked={modules.temperature.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.temperature.status
            ?
          <tr>
            <td>Interval</td>
            <td>
              <input
                id="modules"
                type="number"
                name="temperature"
                onChange={onChange}
                value={modules.temperature.interval}
                placeholder="5000"
              />
            </td>
            <td>ms</td>
          </tr>
            : null
          }
          <tr>
            <td>Fan</td>
            <td></td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="fan"
                  onChange={onChange}
                  checked={modules.fan.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.fan.status
            ?
          <tr>
            <td>Interval</td>
            <td>
              <input
                id="modules"
                type="number"
                name="fan"
                onChange={onChange}
                value={modules.fan.interval}
                placeholder="5000"
              />
            </td>
            <td>ms</td>
          </tr>
            : null
          }
          <tr>
            <td>Battery</td>
            <td></td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="battery"
                  onChange={onChange}
                  checked={modules.battery.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.battery.status
            ?
          <tr>
            <td>Interval</td>
            <td>
              <input
                id="modules"
                type="number"
                name="battery"
                onChange={onChange}
                value={modules.battery.interval}
                placeholder="5000"
              />
            </td>
            <td>ms</td>
          </tr>
            : null
          }
          <tr>
            <td>Disks</td>
            <td></td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="disk"
                  onChange={onChange}
                  checked={modules.disk.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.disk.status
            ?
          <tr>
            <td>Interval</td>
            <td>
              <input
                id="modules"
                type="number"
                name="disk"
                onChange={onChange}
                value={modules.disk.interval}
                placeholder="5000"
              />
            </td>
            <td>ms</td>
          </tr>
            : null
          }
          <tr>
            <td>File System</td>
            <td></td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="diskfs"
                  onChange={onChange}
                  checked={modules.diskfs.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.diskfs.status
            ?
          <tr>
            <td>Interval</td>
            <td>
              <input
                id="modules"
                type="number"
                name="diskfs"
                onChange={onChange}
                value={modules.diskfs.interval}
                placeholder="5000"
              />
            </td>
            <td>ms</td>
          </tr>
            : null
          }
          <tr>
            <td>Network Connections</td>
            <td></td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="netConnections"
                  onChange={onChange}
                  checked={modules.netConnections.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.netConnections.status
            ?
          <tr>
            <td>Interval</td>
            <td>
              <input
                id="modules"
                type="number"
                name="netConnections"
                onChange={onChange}
                value={modules.netConnections.interval}
                placeholder="5000"
              />
            </td>
            <td>ms</td>
          </tr>
            : null
          }
          <tr>
            <td>Network</td>
            <td></td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="network"
                  onChange={onChange}
                  checked={modules.network.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
        </tbody>
        { modules.network.status
          ?
        <tbody>
          <tr>
            <td>Interval</td>
            <td>
              <input
                id="modules"
                type="number"
                name="network"
                onChange={onChange}
                value={modules.network.interval}
                placeholder="5000"
              />
            </td>
            <td>ms</td>
          </tr>
          <tr>
            <td>Interface</td>
            { modules.network.iface ? <td></td> : <td>default:</td> }
            <td>
              <input
                id="modules"
                type="text"
                name="network"
                onChange={onChange}
                value={modules.network.iface}
                placeholder="en0"
                className="iface"
              />
            </td>
          </tr>
          <tr>
            <td>Ping</td>
            { modules.network.ping ? <td></td> : <td>default:</td> }
            <td>
              <input
                id="modules"
                type="text"
                name="network"
                onChange={onChange}
                value={modules.network.ping}
                placeholder="8.8.8.8"
                className="ping"
              />
            </td>
          </tr>
        </tbody>
          : null
        }
      </table>
    </div>
  );
};

ConfigModules.propTypes = {
  modules: PropTypes.object.isRequired
};

export default ConfigModules;
