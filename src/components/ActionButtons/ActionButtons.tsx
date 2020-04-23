import React from 'react';
import styled from 'styled-components';
import { Space } from 'antd';
import { SpaceProps } from 'antd/lib/space';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

interface ActionButtonsProps extends SpaceProps {
  children: React.ReactNode;
}

export const ActionButtons = ({ children, ...rest }: ActionButtonsProps) => (
  <Container>
    <Space {...rest}>{children}</Space>
  </Container>
);
