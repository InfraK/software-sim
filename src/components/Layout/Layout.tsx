import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  TeamOutlined,
  AccountBookOutlined,
  CodeOutlined,
  MailOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { routes } from 'constants/routes';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { formatMoney } from 'utils/moneyFormatter';
const { Footer, Sider, Header } = Layout;

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const money = useSelector(
    ({ finance }: RootState) => finance.slice(-1)[0].money
  );
  const name = useSelector(({ company }: RootState) => company.name);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Menu mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key={routes.home}>
            <HomeOutlined />
            <span>Home</span>
            <Link to={routes.home} />
          </Menu.Item>
          <Menu.Item key={routes.create}>
            <MailOutlined />
            <Link to={routes.create} />
            <span>Mail</span>
          </Menu.Item>
          <Menu.Item key={routes.product}>
            <Link to={routes.product} />
            <CodeOutlined />
            <span>Products</span>
          </Menu.Item>
          <Menu.Item key={routes.staff}>
            <TeamOutlined />
            <Link to={routes.staff} />
            <span>Staff</span>
          </Menu.Item>
          <Menu.Item key={routes.finances}>
            <Link to={routes.finances} />
            <AccountBookOutlined />
            <span>Finances</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          {name || 'Company Name'} | Money: {formatMoney(money)}
        </Header>
        {children}
        <Footer>Software Sim</Footer>
      </Layout>
    </Layout>
  );
};
