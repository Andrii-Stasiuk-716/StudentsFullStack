import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { routes } from './routes';

function Dashboard() {
  return (
    <DashboardLayout>
      <Switch>
        {routes.map((route, i) => (
          <Route key={String(i + route.path)} {...route} />
        ))}
      </Switch>
    </DashboardLayout>
  );
}

export default Dashboard;
