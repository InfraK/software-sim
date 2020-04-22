import React from 'react';
import { BaseLayout } from 'components/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from 'containers/Home';
import { ProductPage } from 'containers/Product';
import { routes } from 'constants/routes';
import { CompanyCreation } from 'containers/CompanyCreation';
import { ProductDetails } from 'containers/ProductDetails';
import { Staff } from 'containers/Staff';

export const App = () => {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route exact path={routes.home}>
            <Home />
          </Route>
          <Route exact path={routes.product}>
            <ProductPage />
          </Route>
          <Route exact path={routes.productDetails}>
            <ProductDetails />
          </Route>
          <Route exact path={routes.create}>
            <CompanyCreation />
          </Route>
          <Route exact path={routes.staff}>
            <Staff />
          </Route>
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  );
};
