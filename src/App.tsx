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
import { updateGame } from 'store/products';
import { ConditionalRoute } from 'utils/ConditionalRoute';

export const App = () => {
  const dispatch = useDispatch();
  useInterval(() => {
    dispatch(updateGame());
  }, 10000);

  const isFinished = useSelector(({ company }: RootState) => company.confirmed);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.create}>
          <CompanyCreation />
        </Route>
        <BaseLayout>
          <ConditionalRoute
            condition={isFinished}
            redirectTo={routes.create}
            exact
            path={routes.home}
          >
            <Home />
          </ConditionalRoute>
          <ConditionalRoute
            condition={isFinished}
            redirectTo={routes.create}
            exact
            path={routes.product}
          >
            <ProductPage />
          </ConditionalRoute>
          <ConditionalRoute
            condition={isFinished}
            redirectTo={routes.create}
            exact
            path={routes.productDetails}
          >
            <ProductDetails />
          </ConditionalRoute>
          <ConditionalRoute
            condition={isFinished}
            redirectTo={routes.create}
            exact
            path={routes.staff}
          >
            <Staff />
          </ConditionalRoute>
          <ConditionalRoute
            condition={isFinished}
            redirectTo={routes.create}
            exact
            path={routes.staffDetails}
          >
            <StaffDetails />
          </ConditionalRoute>
          <ConditionalRoute
            condition={isFinished}
            redirectTo={routes.create}
            exact
            path={routes.finances}
          >
            <Finance />
          </ConditionalRoute>
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  );
};
