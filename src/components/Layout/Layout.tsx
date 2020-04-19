import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Icon } from 'components/Icon';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon icon="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item>
            <Icon icon="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item>
            <Icon icon="home" />
            <span>Home</span>
          </Menu.Item>
          <SubMenu
            title={
              <span>
                <Icon icon="user" />
                <span>User</span>
              </span>
            }
          >
            <Menu.Item>Hello tis is subitem</Menu.Item>
            <Menu.Item>Hello tis is subitem</Menu.Item>
            <Menu.Item>Hello tis is subitem</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header>Hello this is the header</Header>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <Footer>Hello this is footer</Footer>
      </Layout>
    </Layout>
  );
};

// export const ld = () => {
//   return (
//     <Layout>
//       <Header className="header">
//         <div className="logo" />
//         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
//           <Menu.Item key="1">nav 1</Menu.Item>
//           <Menu.Item key="2">nav 2</Menu.Item>
//           <Menu.Item key="3">nav 3</Menu.Item>
//         </Menu>
//       </Header>
//       <Layout>
//         <Sider width={200} className="site-layout-background">
//           <Menu
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             defaultOpenKeys={['sub1']}
//             style={{ height: '100%', borderRight: 0 }}
//           >
//             <SubMenu
//               key="sub1"
//               title={
//                 <span>
//                   <UserOutlined />
//                   subnav 1
//                 </span>
//               }
//             >
//               <Menu.Item key="1">option1</Menu.Item>
//               <Menu.Item key="2">option2</Menu.Item>
//               <Menu.Item key="3">option3</Menu.Item>
//               <Menu.Item key="4">option4</Menu.Item>
//             </SubMenu>
//             <SubMenu
//               key="sub2"
//               title={
//                 <span>
//                   <LaptopOutlined />
//                   subnav 2
//                 </span>
//               }
//             >
//               <Menu.Item key="5">option5</Menu.Item>
//               <Menu.Item key="6">option6</Menu.Item>
//               <Menu.Item key="7">option7</Menu.Item>
//               <Menu.Item key="8">option8</Menu.Item>
//             </SubMenu>
//             <SubMenu
//               key="sub3"
//               title={
//                 <span>
//                   <NotificationOutlined />
//                   subnav 3
//                 </span>
//               }
//             >
//               <Menu.Item key="9">option9</Menu.Item>
//               <Menu.Item key="10">option10</Menu.Item>
//               <Menu.Item key="11">option11</Menu.Item>
//               <Menu.Item key="12">option12</Menu.Item>
//             </SubMenu>
//           </Menu>
//         </Sider>
//         <Layout style={{ padding: '0 24px 24px' }}>
//           <Breadcrumb style={{ margin: '16px 0' }}>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item>List</Breadcrumb.Item>
//             <Breadcrumb.Item>App</Breadcrumb.Item>
//           </Breadcrumb>
//           <Content
//             className="site-layout-background"
//             style={{
//               padding: 24,
//               margin: 0,
//               minHeight: 280,
//             }}
//           >
//             Content
//           </Content>
//         </Layout>
//       </Layout>
//     </Layout>
//   );
// };
