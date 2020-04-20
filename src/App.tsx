import React from 'react';
import { BaseLayout } from 'components/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from 'containers/Home';
import { Product } from 'containers/Product';
import { routes } from 'constants/routes';
import { CompanyCreation } from 'containers/CompanyCreation';

export const App = () => {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route exact path={routes.home}>
            <Home />
          </Route>
          <Route exact path={routes.product}>
            <Product />
          </Route>
          <Route exact path={routes.create}>
            <CompanyCreation />
          </Route>
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  );
};
