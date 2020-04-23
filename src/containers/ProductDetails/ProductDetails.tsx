import React from 'react';
import { Page } from 'components/Page';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { routes } from 'constants/routes';
import { Space, Descriptions } from 'antd';

export const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector(
    ({ products }: RootState) => products[String(id)]
  );

  const employees = useSelector(({ staff }: RootState) =>
    Object.values(staff).filter((employee) => employee.productId === id)
  );

  if (!product) {
    return <Redirect to={routes.product} />;
  }

  return (
    <Page title={product.name}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Descriptions bordered>
          <Descriptions.Item label="Version">
            {product.version}
          </Descriptions.Item>
          <Descriptions.Item label="Employees">
            {employees.length}
          </Descriptions.Item>
          <Descriptions.Item label="Code">
            {Math.floor(product.code)}
          </Descriptions.Item>
          <Descriptions.Item label="Design">
            {Math.floor(product.design)}
          </Descriptions.Item>
          <Descriptions.Item label="Marketing">
            {Math.floor(product.marketing)}
          </Descriptions.Item>
          <Descriptions.Item label="Quality">
            {Math.floor(product.quality)}
          </Descriptions.Item>
          <Descriptions.Item label="Traffic">
            {Math.floor(product.traffic)}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Page>
  );
};
