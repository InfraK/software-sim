import React, { useState } from 'react';
import { Table, Button, Space, Drawer, Menu, Dropdown } from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  AimOutlined,
} from '@ant-design/icons';
import { Page } from 'components/Page';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { BasicPerson, Employee, EmployeeWithProduct } from 'types';
import { ActionButtons } from 'components/ActionButtons';
import { Link, useHistory } from 'react-router-dom';
import { routes } from 'constants/routes';
import { hire, fire } from 'store/staff';
import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import { Store } from 'antd/lib/form/interface';
import { HireStaff } from './HireStaff';
import { AssignEmployees } from './AssignStaff';

const selectEmployeeProduct = (state: RootState): EmployeeWithProduct[] => {
  const employees = state.staff;
  return Object.values(employees).map((employee) => ({
    ...employee,
    product: employee.productId
      ? state.products[employee.productId]
      : undefined,
  }));
};

export const Staff = () => {
  const [visible, setVisible] = useState(false);
  const [assignVisible, setAssignVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const employees = useSelector(selectEmployeeProduct);

  const onSubmitEmployees = (persons: BasicPerson[]) => {
    dispatch(hire(persons));
    setVisible(false);
  };

  const menu = (employee: Employee) => (
    <Menu>
      <Menu.Item onClick={() => dispatch(fire([employee]))}>
        <DeleteOutlined />
        Delete
      </Menu.Item>
      <Menu.Item onClick={() => setAssignVisible(true)}>
        <AimOutlined /> Asign
      </Menu.Item>
    </Menu>
  );

  const columns: ColumnsType<Employee> = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (firstName: string, employee: Employee) => {
        return (
          <Link to={routes.productDetails.replace(':id', employee.id)}>
            {`${employee.lastName}, ${firstName}`}
          </Link>
        );
      },
    },
    {
      title: 'Product',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'x',
      render: (employee: Employee) => {
        return (
          <Dropdown.Button
            overlay={menu(employee)}
            trigger={['click']}
            onClick={() =>
              history.push(routes.staffDetails.replace(':id', employee.id))
            }
          >
            <EyeOutlined />
            View
          </Dropdown.Button>
        );
      },
    },
  ];

  return (
    <Page title="Staff">
      <Drawer
        width={'40vw'}
        title="Hire Staff"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <HireStaff onSubmit={onSubmitEmployees} />
      </Drawer>
      <Drawer
        width={'40vw'}
        title="Assign Staff"
        visible={assignVisible}
        onClose={() => setAssignVisible(false)}
      >
        <AssignEmployees
          employees={[]}
          onSubmit={() => setAssignVisible(false)}
        />
      </Drawer>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ActionButtons>
          <Button type="primary" onClick={() => setVisible(true)}>
            <PlusOutlined /> Hire Staff
          </Button>
        </ActionButtons>
        <Table columns={columns} dataSource={employees} />
      </Space>
    </Page>
  );
};
