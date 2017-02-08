import React, {PropTypes} from 'react';

const ConfigDb = ({db, onChange}) => {
  return (
    <tbody>
      <tr>
        <td>PouchDB</td>
        <td></td>
        <td>
          <label className="switch">
            <input
              id="db"
              type="checkbox"
              name="pouchdb"
              onChange={onChange}
              checked={db.pouchdb.status}
            />
            <div className="slider round"></div>
          </label>
        </td>
      </tr>
      <tr>
        <td>CouchDB</td>
        <td></td>
        <td>
          <label className="switch">
            <input
              id="db"
              type="checkbox"
              name="couchdb"
              onChange={onChange}
              checked={db.couchdb.status}
            />
            <div className="slider round"></div>
          </label>
        </td>
      </tr>
      { db.couchdb.status
        ?
      <table>
        <tbody>
          <tr>
            <td>Host</td>
            <td>
              <input
                id="db"
                type="text"
                name="couchdb"
                onChange={onChange}
                value={db.couchdb.host}
                placeholder="localhost"
                className="host"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Port</td>
            <td>
              <input
                id="db"
                type="text"
                name="couchdb"
                onChange={onChange}
                value={db.couchdb.port}
                placeholder="5984"
                className="port"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Database</td>
            <td>
              <input
                id="db"
                type="text"
                name="couchdb"
                onChange={onChange}
                value={db.couchdb.dbname}
                placeholder="graphicdb"
                className="dbname"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>SSL</td>
            <td>
              <label className="switch">
                <input
                  id="db"
                  type="checkbox"
                  name="couchdb"
                  onChange={onChange}
                  checked={db.couchdb.ssl}
                  className="ssl"
                />
                <div className="slider round"></div>
              </label>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
        : null
      }
      <tr>
        <td>PostgreSQL</td>
        <td></td>
        <td>
          <label className="switch">
            <input
              id="db"
              type="checkbox"
              name="postgres"
              onChange={onChange}
              checked={db.postgres.status}
            />
            <div className="slider round"></div>
          </label>
        </td>
      </tr>
      { db.postgres.status
        ?
      <table>
        <tbody>
          <tr>
            <td>Host</td>
            <td>
              <input
                id="db"
                type="text"
                name="postgres"
                onChange={onChange}
                value={db.couchdb.host}
                placeholder="localhost"
                className="host"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Port</td>
            <td>
              <input
                id="db"
                type="text"
                name="postgres"
                onChange={onChange}
                value={db.couchdb.port}
                placeholder="5432"
                className="port"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Database</td>
            <td>
              <input
                id="db"
                type="text"
                name="postgres"
                onChange={onChange}
                value={db.couchdb.dbname}
                placeholder="you create it"
                className="dbname"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>User</td>
            <td>
              <input
                id="db"
                type="text"
                name="postgres"
                onChange={onChange}
                value={db.couchdb.user}
                placeholder="postgres"
                className="user"
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input
                id="db"
                type="password"
                name="postgres"
                onChange={onChange}
                value={db.couchdb.pass}
                className="pass"
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      : null
      }
    </tbody>
  );
};

ConfigDb.propTypes = {
  db: PropTypes.object.isRequired
};

export default ConfigDb;
