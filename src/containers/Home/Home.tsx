import React from 'react';
import { Page } from 'components/Page';
import { Statistic, Card, Space } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const Home = () => {
  const { staffCount, productCount } = useSelector((state: RootState) => ({
    staffCount: Object.keys(state.staff).length,
    productCount: Object.keys(state.products).length,
  }));

  return (
    <Page title="Home">
      <Space>
        <Card>
          <Statistic title="Staff" value={staffCount} />
        </Card>
        <Card>
          <Statistic title="Products" value={productCount} />
        </Card>
      </Space>
    </Page>
  );
};
