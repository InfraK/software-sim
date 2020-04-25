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
  Avatar,
  Radio,
} from 'antd';
import {
  SolutionOutlined,
  UserOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { routes } from 'constants/routes';
import { Link, Redirect } from 'react-router-dom';
import { BasicCEO, BasicCompany, Role, Gender } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany, confirmCreate } from 'store/company';
import { createCEO } from 'store/staff';
import { ActionButtons } from 'components/ActionButtons';
import styled from 'styled-components';
import { avatars, mansAvatar, womansAvatar, AvatarKey } from 'utils/avatar';
import { RootState } from 'store';
const { Step } = Steps;
const { Title } = Typography;

interface State {
  step: number;
  ceo: BasicCEO;
  company: BasicCompany;
}

export const CompanyCreation = () => {
  const dispatch = useDispatch();
  const isFinished = useSelector((state: RootState) => state.company.confirmed);

  const [state, setState] = useState<State>({
    step: 0,
    ceo: {
      firstName: '',
      lastName: '',
      background: Role.Developer,
      avatar: 'man1',
      gender: Gender.Man,
    },
    company: { name: '' },
  });

  if (isFinished) {
    return <Redirect to={routes.home} />;
  }

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

  const confirm = () => {
    dispatch(confirmCreate());
  };

  const { step, ceo, company } = state;

  return (
    <Container>
      <Wrapper direction="vertical">
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
              <Link to={routes.home} onClick={confirm}>
                <Button type="primary" key="home">
                  Go Home
                </Button>
              </Link>,
            ]}
          />
        )}
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled(Space)`
  width: 100%;
  max-width: 40rem;
  min-height: 25rem;
  padding: 1rem;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CEOFormProps {
  values: BasicCEO;
  onSubmit: (values: BasicCEO) => void;
}

const CEOForm = ({ values, onSubmit }: CEOFormProps) => {
  const [form] = Form.useForm();
  const [gender, setGender] = useState(Gender.Man);
  const onFinish = (values: Store) => {
    onSubmit(values as BasicCEO);
  };
  const avatarOptions = gender === Gender.Man ? mansAvatar : womansAvatar;

  const handleChangeValues = (values: any) => {
    if (values.gender && values.gender !== gender) {
      setGender(values.gender);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleChangeValues}
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
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Choose your gender!' }]}
      >
        <Select>
          <Select.Option value={Gender.Man}>Man</Select.Option>
          <Select.Option value={Gender.Woman}>Woman</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Avatar"
        name="avatar"
        rules={[
          { required: true, message: 'Choose your Avatar' },
          {
            validator: (field, value) =>
              Object.keys(avatarOptions).includes(value)
                ? Promise.resolve()
                : Promise.reject('Choose your Avatar'),
          },
        ]}
      >
        <Radio.Group>
          {Object.keys(avatarOptions).map((avatar) => (
            <Radio value={avatar}>
              <Avatar
                src={avatars[avatar as AvatarKey]}
                style={{ width: '4rem', height: '4rem' }}
              />
            </Radio>
          ))}
        </Radio.Group>
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
