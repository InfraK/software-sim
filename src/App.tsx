import React from 'react';
import { Button } from 'antd';
import { Icon } from 'components/Icon';
import { useSpring, animated, config } from 'react-spring';
import { BaseLayout } from 'components/Layout';

export const App = () => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.wobbly,
  });
  return (
    <div>
      <BaseLayout>
        <Icon icon={['fab', 'google']} />
        <animated.div style={props}>I will fade in</animated.div>
        <Button type="primary">Button</Button>
      </BaseLayout>
    </div>
  );
};
