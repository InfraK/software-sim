import React, { useState } from 'react';
import { Table, Button, Space, Drawer, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Page } from 'components/Page';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { BasicProduct, Product } from 'types';
import { Store } from 'antd/lib/form/interface';
import { createProduct } from 'store/products';
import { ActionButtons } from 'components/ActionButtons';
import { Link } from 'react-router-dom';
import { routes } from 'constants/routes';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, product: Product) => {
      return (
        <Link to={routes.productDetails.replace(':id', product.id)}>
          {name}
        </Link>
      );
    },
  },
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    render: (code: number) => <span>{Math.floor(code)}</span>,
  },
  {
    title: 'Design',
    dataIndex: 'design',
    key: 'design',
    render: (design: number) => <span>{Math.floor(design)}</span>,
  },
  {
    title: 'Quality',
    dataIndex: 'quality',
    key: 'quality',
    render: (quality: number) => <span>{Math.floor(quality)}</span>,
  },
  {
    title: 'Marketing',
    dataIndex: 'marketing',
    key: 'marketing',
    render: (marketing: number) => <span>{Math.floor(marketing)}</span>,
  },
  {
    title: 'Traffic',
    dataIndex: 'traffic',
    key: 'traffic',
    render: (traffic: number) => <span>{Math.floor(traffic)}</span>,
  },
];

export const ProductPage = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const products = useSelector(({ products }: RootState) =>
    Object.values(products)
  );

  const onSubmitProduct = (product: BasicProduct) => {
    dispatch(createProduct(product));
    setVisible(false);
  };

  return (
    <Page title="Products">
      <Drawer
        width={'40vw'}
        title="Create new Product"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <ProductForm onSubmit={onSubmitProduct} />
      </Drawer>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ActionButtons>
          <Button type="primary" onClick={() => setVisible(true)}>
            <PlusOutlined /> Create Product
          </Button>
        </ActionButtons>
        <Table columns={columns} dataSource={products} />
      </Space>
    </Page>
  );
};

interface ProductFormProps {
  onSubmit: (values: BasicProduct) => void;
}

const ProductForm = ({ onSubmit }: ProductFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: Store) => {
    onSubmit(values as BasicProduct);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      initialValues={{ name: '' }}
      onFinish={onFinish}
      hideRequiredMark
      layout="vertical"
    >
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: 'Your new product needs a name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <ActionButtons>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </ActionButtons>
      </Form.Item>
    </Form>
  );
};
