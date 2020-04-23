import React, { useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Select,
  Typography,
  Button,
  Result,
  Space,
} from 'antd';
import {
  SolutionOutlined,
  UserOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { routes } from 'constants/routes';
import { Link } from 'react-router-dom';
import { Page } from 'components/Page';
import { BasicCEO, BasicCompany, Role } from 'types';
import { useDispatch } from 'react-redux';
import { createCompany } from 'store/company';
import { createCEO } from 'store/staff';
import { ActionButtons } from 'components/ActionButtons';
const { Step } = Steps;
const { Title } = Typography;

interface State {
  step: number;
  ceo: BasicCEO;
  company: BasicCompany;
}

export const CompanyCreation = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({
    step: 0,
    ceo: {
      firstName: '',
      lastName: '',
      background: Role.Developer,
    },
    company: { name: '' },
  });

  const handleCeoSubmit = (values: BasicCEO) => {
    setState((prev) => ({ ...prev, step: prev.step + 1, ceo: values }));
    dispatch(createCEO(values));
  };

  const handleCompanySubmit = (values: BasicCompany) => {
    setState((prev) => ({ ...prev, step: prev.step + 1, company: values }));
    dispatch(createCompany(values));
  };

  const handleBack = () => {
    setState((prev) => ({ ...prev, step: prev.step - 1 }));
  };

  const { step, ceo, company } = state;

  return (
    <Page title="Creating new Company">
      <Steps current={step}>
        <Step title="CEO" icon={<UserOutlined />} />
        <Step title="Company" icon={<SolutionOutlined />} />
        <Step title="Done" icon={<SmileOutlined />} />
      </Steps>
      {step === 0 && <CEOForm values={ceo} onSubmit={handleCeoSubmit} />}
      {step === 1 && (
        <CompanyForm
          values={company}
          onSubmit={handleCompanySubmit}
          onBack={handleBack}
        />
      )}
      {step === 2 && (
        <Result
          status="success"
          title={`Hurray! ${company.name} is now a real Company!`}
          subTitle={`${ceo.firstName} ${ceo.lastName} now that you have founded your company, it's time to get working`}
          extra={[
            <Link to={routes.home}>
              <Button type="primary" key="home">
                Go Home
              </Button>
            </Link>,
          ]}
        />
      )}
    </Page>
  );
};

interface CEOFormProps {
  values: BasicCEO;
  onSubmit: (values: BasicCEO) => void;
}

const CEOForm = ({ values, onSubmit }: CEOFormProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: Store) => {
    onSubmit(values as BasicCEO);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      form={form}
      initialValues={values}
      onFinish={onFinish}
      hideRequiredMark
    >
      <Typography>
        <Title level={3}>Create CEO</Title>
      </Typography>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'First name is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Last name is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Background"
        name="background"
        rules={[{ required: true, message: 'Choose your background' }]}
      >
        <Select placeholder="Choose one">
          <Select.Option value="Developer">Developer</Select.Option>
          <Select.Option value="Designer">Designer</Select.Option>
          <Select.Option value="Marketer">Marketer</Select.Option>
          <Select.Option value="QA">QA</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <ActionButtons>
          <Button type="primary" htmlType="submit">
            Continue
          </Button>
        </ActionButtons>
      </Form.Item>
    </Form>
  );
};

interface CompanyForm {
  values: BasicCompany;
  onSubmit: (values: BasicCompany) => void;
  onBack: () => void;
}

const CompanyForm = ({ values, onSubmit, onBack }: CompanyForm) => {
  const [form] = Form.useForm();

  const onFinish = (values: Store) => {
    onSubmit(values as BasicCompany);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      form={form}
      initialValues={values}
      onFinish={onFinish}
      hideRequiredMark
    >
      <Typography>
        <Title level={3}>Create Company</Title>
      </Typography>
      <Form.Item
        label="Company Name"
        name="name"
        rules={[{ required: true, message: 'The Company name is required!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <ActionButtons>
          <Space>
            <Button htmlType="submit" onClick={onBack}>
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Continue
            </Button>
          </Space>
        </ActionButtons>
      </Form.Item>
    </Form>
  );
};
