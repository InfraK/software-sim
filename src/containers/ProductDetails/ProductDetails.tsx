import React from 'react';
import { Page } from 'components/Page';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { routes } from 'constants/routes';

export const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector(
    ({ products }: RootState) => products[String(id)]
  );
  if (!product) {
    return <Redirect to={routes.product} />;
  }

  return <Page title={product.name}>Product Detail!!</Page>;
};
