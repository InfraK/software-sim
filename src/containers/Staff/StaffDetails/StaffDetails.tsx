import React from 'react';
import { Page } from 'components/Page';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { routes } from 'constants/routes';
import { Space, Descriptions } from 'antd';
import { formatMoney } from 'utils/moneyFormatter';

export const StaffDetails = () => {
  const { id } = useParams();
  const employee = useSelector(({ staff }: RootState) => staff[String(id)]);

  const product = useSelector(({ products }: RootState) =>
    employee.productId ? products[employee.productId] : undefined
  );

  if (!employee) {
    return <Redirect to={routes.product} />;
  }

  return (
    <Page title={`${employee.firstName} ${employee.lastName}`}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Descriptions
          column={1}
          bordered
          title={`${employee.firstName} ${employee.lastName}`}
        >
          <Descriptions.Item label="Product">
            {product?.name || 'No product'}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            {employee.role || 'No role'}
          </Descriptions.Item>
          <Descriptions.Item label="Salary">
            {formatMoney(employee.salary)}
          </Descriptions.Item>
          <Descriptions.Item label="Design Skill">
            {employee.expertise.designer}
          </Descriptions.Item>
          <Descriptions.Item label="Developer Skill">
            {employee.expertise.developer}
          </Descriptions.Item>
          <Descriptions.Item label="QA Skill">
            {employee.expertise.qa}
          </Descriptions.Item>
          <Descriptions.Item label="Marketing Skill">
            {employee.expertise.marketing}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Page>
  );
};
