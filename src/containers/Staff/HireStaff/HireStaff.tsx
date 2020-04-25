import React, { useState } from 'react';
import { Table, Button, Space, Descriptions, Drawer, Avatar } from 'antd';
import {
  UserAddOutlined,
  UsergroupAddOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { BasicPerson } from 'types';
import { ActionButtons } from 'components/ActionButtons';
import { generatePersons, getAvatar } from 'utils';
import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import { formatMoney } from 'utils/moneyFormatter';

const hireColumns: ColumnsType<BasicPerson> = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
    render: (salary: number) => <span>{formatMoney(salary)}</span>,
  },
];

interface HireStaffState {
  keys: React.Key[];
  persons: BasicPerson[];
}

interface HireStaffProps {
  visible: boolean;
  onSubmit: (persons: BasicPerson[]) => void;
  onClose: () => void;
}

export const HireStaff = ({ visible, onClose, onSubmit }: HireStaffProps) => {
  const [selected, setSelected] = useState<HireStaffState>({
    keys: [],
    persons: [],
  });
  const [state, setState] = useState(generatePersons(10));

  const onSelectChange: TableRowSelection<BasicPerson>['onChange'] = (
    rowKeys,
    rows
  ) => {
    setSelected({ keys: rowKeys, persons: rows });
  };

  const onHire = () => {
    onSubmit(selected.persons);
  };

  const rowSelection: TableRowSelection<BasicPerson> = {
    selectedRowKeys: selected.keys,
    onChange: onSelectChange,
  };

  const refresh = () => {
    setState(generatePersons(10));
  };

  return (
    <Drawer
      width={'40vw'}
      title="Hire Staff"
      visible={visible}
      onClose={onClose}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <ActionButtons>
          <Button onClick={refresh}>
            <SyncOutlined />
            Refresh Results
          </Button>
          <Button type="primary" onClick={onHire}>
            {selected.persons.length > 1 ? (
              <UsergroupAddOutlined />
            ) : (
              <UserAddOutlined />
            )}
            Hire Selected
          </Button>
        </ActionButtons>
        <Table
          rowKey={(person) => person.id}
          rowSelection={rowSelection}
          expandable={{
            expandedRowRender: (person) => {
              return (
                <>
                  <Descriptions
                    column={1}
                    bordered
                    title={
                      <Space>
                        <Avatar src={getAvatar(person.avatar)} />
                        <span>
                          {person.firstName} {person.lastName}
                        </span>
                      </Space>
                    }
                  >
                    {console.log(getAvatar(person.avatar))}
                    <Descriptions.Item label="Salary">
                      {formatMoney(person.salary)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Design Skill">
                      {person.expertise.designer}
                    </Descriptions.Item>
                    <Descriptions.Item label="Developer Skill">
                      {person.expertise.developer}
                    </Descriptions.Item>
                    <Descriptions.Item label="QA Skill">
                      {person.expertise.qa}
                    </Descriptions.Item>
                    <Descriptions.Item label="Marketing Skill">
                      {person.expertise.marketing}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              );
            },
          }}
          columns={hireColumns}
          dataSource={state}
        />
      </Space>
    </Drawer>
  );
};
