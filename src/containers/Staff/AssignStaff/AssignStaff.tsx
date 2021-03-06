import React from 'react';
import { Button, Form, Select, Typography, Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { Employee } from 'types';
import { ActionButtons } from 'components/ActionButtons';
import { assign } from 'store/staff';
import { Store } from 'antd/lib/form/interface';
const { Option } = Select;

interface AssignEmployeesProps {
  employees: Employee[];
  visible: boolean;
  onClose: () => void;
}
export const AssignEmployees = ({
  visible,
  onClose,
  employees,
}: AssignEmployeesProps) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) =>
    Object.values(state.products)
  );

  const [form] = Form.useForm();

  const onFinish = (values: Store) => {
    dispatch(assign({ employees, productId: values.productId }));
    onClose();
    form.resetFields();
  };

  if (!employees.length) {
    return null;
  }

  return (
    <Drawer
      width={'40vw'}
      title="Assign Staff"
      visible={visible}
      onClose={onClose}
    >
      <Form
        form={form}
        initialValues={{ productId: '' }}
        onFinish={onFinish}
        hideRequiredMark
        layout="vertical"
      >
        <Typography>
          <Typography.Paragraph>
            {employees.length > 1
              ? `Assigning ${employees.length} employees`
              : `Assigning ${employees[0].firstName} ${employees[0].lastName}`}
          </Typography.Paragraph>
        </Typography>
        <Form.Item
          label="Product Name"
          name="productId"
          trigger="onSelect"
          validateTrigger="onSelect"
          rules={[{ required: true, message: 'You need to choose a product!' }]}
        >
          <Select
            showSearch
            placeholder="Select a product"
            optionFilterProp="children"
          >
            <Option value="Unassign">Unassign</Option>
            {products.map((product) => (
              <Option value={product.id}>{product.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <ActionButtons>
            <Button type="primary" htmlType="submit">
              Assign
            </Button>
          </ActionButtons>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
