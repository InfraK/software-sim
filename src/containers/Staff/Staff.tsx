import React, { useState } from 'react';
import { Table, Button, Space, Menu, Dropdown } from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  UserAddOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Page } from 'components/Page';
import { useSelector, useDispatch } from 'react-redux';
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
import { formatMoney } from 'utils/moneyFormatter';
import { ChangeRole } from './ChangeRole';
import { selectEmployeeProduct } from 'selectors';

interface AssignState {
  visible: boolean;
  employees: Employee[];
}

export const Staff = () => {
  const [visible, setVisible] = useState(false);
  const [assign, setAssign] = useState<AssignState>({
    visible: false,
    employees: [],
  });

  const [role, setRole] = useState<AssignState>({
    visible: false,
    employees: [],
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const employees = useSelector(selectEmployeeProduct);

  const onSubmitEmployees = (persons: BasicPerson[]) => {
    dispatch(hire(persons));
    setVisible(false);
  };

  const assignEmployee = (employee: Employee) => {
    setAssign({ visible: true, employees: [employee] });
  };

  const changeRole = (employee: Employee) => {
    setRole({ visible: true, employees: [employee] });
  };

  const menu = (employee: EmployeeWithProduct) => (
    <Menu>
      <Menu.Item onClick={() => assignEmployee(employee)}>
        <UserAddOutlined /> Asign
      </Menu.Item>
      <Menu.Item onClick={() => changeRole(employee)}>
        <TagOutlined /> Change Role
      </Menu.Item>
      <Menu.Item onClick={() => dispatch(fire([employee]))}>
        <DeleteOutlined />
        Fire
      </Menu.Item>
    </Menu>
  );

  const columns: ColumnsType<EmployeeWithProduct> = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (firstName: string, employee: Employee) => {
        return (
          <Link to={routes.staffDetails.replace(':id', employee.id)}>
            {`${employee.lastName}, ${firstName}`}
          </Link>
        );
      },
    },
    {
      title: 'Product',
      dataIndex: 'productId',
      key: 'productId',
      render: (_, employee) => {
        if (!employee.product) {
          return null;
        }
        return (
          <Link to={routes.productDetails.replace(':id', employee.product.id)}>
            {employee.product?.name}
          </Link>
        );
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary) => <span>{formatMoney(salary)}</span>,
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

  const closeAssign = () => setAssign({ visible: false, employees: [] });
  const closeRole = () => setRole({ visible: false, employees: [] });

  return (
    <Page title="Staff">
      <HireStaff
        onSubmit={onSubmitEmployees}
        onClose={() => setVisible(false)}
        visible={visible}
      />

      <AssignEmployees
        employees={assign.employees}
        onClose={closeAssign}
        visible={assign.visible}
      />

      <ChangeRole
        employees={role.employees}
        onClose={closeRole}
        visible={role.visible}
      />
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
