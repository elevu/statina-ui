import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
import { BatchesPage } from '../pages/Batches/BatchesPage';
import { LatestPage } from '../pages/Latest/LatestPage';

interface RoutesProps {
  isLoggedIn: boolean;
}

export const Routes = (props: RoutesProps) => {
  const { isLoggedIn } = props;
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/unauthorized" exact>
        <UnauthorizedPage isLoggedIn={isLoggedIn} />
      </Route>
      <Route path="/latest" exact>
        <LatestPage />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/batches"
        exact
        render={() =>
          isLoggedIn === true ? (
            <BatchesPage />
          ) : (
            <Redirect to={{ pathname: '/unauthorized' }} />
          )
        }
      />
    </Switch>
  );
};
