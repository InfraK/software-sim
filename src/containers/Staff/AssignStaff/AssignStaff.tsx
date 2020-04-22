import React from 'react';
import { Button, Form, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { Employee } from 'types';
import { ActionButtons } from 'components/ActionButtons';
import { assign } from 'store/staff';
import { Store } from 'antd/lib/form/interface';
const { Option } = Select;

interface AssignEmployeesProps {
  employees: Employee[];
  onSubmit: () => void;
}
export const AssignEmployees = ({
  onSubmit,
  employees,
}: AssignEmployeesProps) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) =>
    Object.values(state.products)
  );

  const [form] = Form.useForm();

  const onFinish = (values: Store) => {
    dispatch(assign({ employees, productId: values.productId }));
    onSubmit();
    form.resetFields();
  };

  return (
    <Form
      form={form}
      initialValues={{ productId: '' }}
      onFinish={onFinish}
      hideRequiredMark
      layout="vertical"
    >
      <Form.Item
        label="Product Name"
        name="productId"
        trigger="onSelect"
        validateTrigger="onSelect"
        rules={[{ required: true, message: 'You need to choose a product!!' }]}
      >
        <Select
          showSearch
          placeholder="Select a product"
          optionFilterProp="children"
        >
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
  );
};
