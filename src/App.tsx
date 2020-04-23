import React from 'react';
import { BaseLayout } from 'components/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from 'containers/Home';
import { ProductPage } from 'containers/Product';
import { routes } from 'constants/routes';
import { CompanyCreation } from 'containers/CompanyCreation';
import { ProductDetails } from 'containers/ProductDetails';
import { Finance } from 'containers/Finance';
import { Staff } from 'containers/Staff';
import { StaffDetails } from 'containers/Staff/StaffDetails';
import useInterval from 'utils/useInterval';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { selectEmployeeProduct } from 'selectors';
import { updateGame } from 'store/products';

export const App = () => {
  const dispatch = useDispatch();
  useInterval(() => {
    dispatch(updateGame());
  }, 10000);

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
          <Route exact path={routes.staffDetails}>
            <StaffDetails />
          </Route>
          <Route exact path={routes.finances}>
            <Finance />
          </Route>
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  );
};
