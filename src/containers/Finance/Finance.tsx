import React from 'react';
import { Table, Space, Statistic, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Page } from 'components/Page';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/lib/table';

import { formatMoney } from 'utils/moneyFormatter';
import { FinanceRecord } from 'types';
import dayjs from 'dayjs';
import { RootState } from 'store';

export const Finance = () => {
  const records = useSelector(({ finance }: RootState) => finance);

  const columns: ColumnsType<FinanceRecord> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: ({ date: dateA }, { date: dateB }) =>
        dayjs(dateA).isBefore(dateB) ? 1 : -1,
      render: (date) => <span>{dayjs(date).format('L')}</span>,
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Concept',
      dataIndex: 'concept',
      key: 'concept',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span>{formatMoney(amount)}</span>,
    },
    {
      title: 'Money',
      dataIndex: 'money',
      key: 'money',
      render: (money) => <span>{formatMoney(money)}</span>,
    },
  ];

  const getLast10Days =
    records.slice(-10).reduce((acc, r) => acc + r.amount, 0) / 10;
  const last30Days = records.slice(-30).reduce((acc, r) => acc + r.amount, 0);
  const lastMonth = records
    .slice(-60, -30)
    .reduce((acc, r) => acc + r.amount, 0);
  const growth = last30Days - lastMonth;
  const percent = Math.round((growth / lastMonth) * 100) * Math.sign(growth);

  const winnings = percent > 0;
  const { money } = records.slice(-1)[0];

  return (
    <Page title="Finance">
      <Space style={{ width: '100%' }}>
        <Card>
          <Statistic
            title="Money"
            value={formatMoney(money)}
            valueStyle={{ color: money > 0 ? '#3f8600' : '#cf1322' }}
          />
        </Card>
        <Card>
          <Statistic
            title="Avergage income (last 10 days)"
            valueStyle={{ color: getLast10Days > 0 ? '#3f8600' : '#cf1322' }}
            value={formatMoney(getLast10Days)}
            suffix="/day"
          />
        </Card>
        <Card>
          <Statistic
            title="Last 30 days Winnings"
            valueStyle={{ color: last30Days > 0 ? '#3f8600' : '#cf1322' }}
            value={formatMoney(last30Days)}
          />
        </Card>
        <Card>
          <Statistic
            title="Las 30 Days Growth"
            precision={2}
            valueStyle={{ color: winnings ? '#3f8600' : '#cf1322' }}
            prefix={winnings ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="%"
            value={percent}
          />
        </Card>
      </Space>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Table columns={columns} dataSource={records} />
      </Space>
    </Page>
  );
};
