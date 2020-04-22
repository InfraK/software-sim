import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { BasicPerson } from 'types';
import { ActionButtons } from 'components/ActionButtons';
import { generatePersons } from 'utils';
import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';

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
];

interface HireStaffState {
  keys: React.Key[];
  persons: BasicPerson[];
}

interface HireStaffProps {
  onSubmit: (persons: BasicPerson[]) => void;
}

export const HireStaff = ({ onSubmit }: HireStaffProps) => {
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

  const searchMore = () => {
    setState((prev) => [...prev, ...generatePersons(10)]);
  };

  return (
    <div>
      <ActionButtons>
        <Button onClick={searchMore}>
          <PlusOutlined />
          Search More
        </Button>
        <Button type="primary" onClick={onHire}>
          <CheckOutlined />
          Hire Selected
        </Button>
      </ActionButtons>
      <Table
        rowKey={(person) => person.id}
        rowSelection={rowSelection}
        columns={hireColumns}
        dataSource={state}
      />
    </div>
  );
};
