import React from 'react';
import { Button, Form, Select, Typography, Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { Employee, Role } from 'types';
import { ActionButtons } from 'components/ActionButtons';
import { changeRole } from 'store/staff';
import { Store } from 'antd/lib/form/interface';
const { Option } = Select;

interface ChangeRoleProps {
  employees: Employee[];
  onClose: () => void;
  visible: boolean;
}

export const ChangeRole = ({
  onClose,
  employees,
  visible,
}: ChangeRoleProps) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = (values: Store) => {
    dispatch(changeRole({ employees, role: values.role }));
    onClose();
    form.resetFields();
  };

  if (!employees.length) {
    return null;
  }

  return (
    <Drawer
      width={'40vw'}
      title="Change Role"
      visible={visible}
      onClose={onClose}
    >
      <Form
        form={form}
        initialValues={{ role: 'undefined' }}
        onFinish={onFinish}
        hideRequiredMark
        layout="vertical"
      >
        <Typography>
          <Typography.Paragraph>
            {employees.length > 1
              ? `Changing ${employees.length} employees role's`
              : `Changing ${employees[0].firstName} ${employees[0].lastName} role`}
          </Typography.Paragraph>
        </Typography>
        <Form.Item
          label="Role"
          name="role"
          trigger="onSelect"
          validateTrigger="onSelect"
          rules={[{ required: true, message: 'You need to choose a role!' }]}
        >
          <Select placeholder="Select a Role" optionFilterProp="children">
            <Option value="undefined">None</Option>
            {Object.values(Role).map((role) => (
              <Option value={role}>{role}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <ActionButtons>
            <Button type="primary" htmlType="submit">
              Change
            </Button>
          </ActionButtons>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
