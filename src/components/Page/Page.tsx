import React from 'react';
import { Layout, PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDocumentTitle } from 'utils/documentTitle';
const { Content } = Layout;

interface PageProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const Page = ({ children, title, subtitle }: PageProps) => {
  useDocumentTitle(title);
  const { goBack } = useHistory();
  return (
    <>
      <PageHeader title={title} subTitle={subtitle} onBack={goBack} />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </>
  );
};
