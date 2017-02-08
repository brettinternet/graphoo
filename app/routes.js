import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Dashboard from './components/dashboard/DashboardPage';
import Monitor from './components/monitor/MonitorPage';
import Settings from './components/settings/SettingsPage';
import Top from './components/top/TopPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="/monitor" component={Monitor} />
    <Route path="/settings" component={Settings} />
    <Route path="/top" component={Top} />
  </Route>
);
