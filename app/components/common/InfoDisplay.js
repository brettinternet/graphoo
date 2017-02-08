import React, {PropTypes} from 'react';
import moment from 'moment';
import LoadingDots from './LoadingDots';



const InfoDisplay = ({info, data, location}) => {
  // console.log(info);
  console.log("info display data:", data);
  const appUptime = moment(moment().seconds(-info.appUptime)).local().fromNow();
  const sysUptime = moment(moment().seconds(-info.time.uptime)).local().fromNow();

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Hostname:</td>
            <td>{info.osInfo.hostname}</td>
          </tr>
          <tr>
            <td>User:</td>
            <td>{info.users[0].user}</td>
          </tr>
        </tbody>
      </table>
      { (location === '/top')
        ?
        <table>
          <tbody>
            <tr>
              <td>Last Restart:</td>
              {(sysUptime !== 'Invalid date') ? <td>{sysUptime}</td> : <td><LoadingDots/></td>}
            </tr>
            <tr>
              <td>Hardware:</td>
              <td>{info.hardware.manufacturer} • {info.hardware.model}</td>
            </tr>
            <tr>
              <td>CPU:</td>
              <td>{info.cpu.manufacturer} {info.cpu.brand} {info.cpu.speed} GHz • {info.cpu.cores} cores</td>
            </tr>
            {info.graphics.controllers.map((el, i) =>
              <tr key={i}>
                <td>{el.bus} Graphics:</td>
                <td>{el.model} • {el.vram} MB VRAM{el.vramDynamic ? ' (dynamic)' : ''}</td>
              </tr>
            )}
            {info.graphics.displays.map((el, i) =>
              <tr key={i}>
                <td>{el.model} Display:</td>
                <td>{el.resolutionx} x {el.resolutiony} • {el.pixeldepth} Bit Depth</td>
              </tr>
            )}
            <tr>
              <td>App Uptime:</td>
              {(appUptime !== 'Invalid date') ? <td>{appUptime}</td> : <td><LoadingDots/></td>}
            </tr>
            <tr>
              <td>OS:</td>
              <td>{info.osInfo.distro} {info.osInfo.release}</td>
            </tr>
            {info.interfaces.filter(ele => ele.iface == 'en0').map((el, i) =>
              <tr key={i}>
                <td>Network Interface:</td>
                <td>{el.iface} • Local IPv4: {el.ip4}</td>
              </tr>
            )}
            <tr>
              <td>Serial:</td>
              <td>{info.hardware.serial}</td>
            </tr>
            <tr>
              <td>UUID:</td>
              <td>{info.hardware.uuid}</td>
            </tr>
          </tbody>
        </table>
        : null
      }
    </div>
  );
};


InfoDisplay.propTypes = {
  info: React.PropTypes.object.isRequired
};

export default InfoDisplay;
