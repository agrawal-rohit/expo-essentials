import React from 'react';
import { Text } from '@ui-kitten/components';

export default function Heading({
  children,
  fontSize = 15,
  style,
  ...props
}) {
  return (
    <Text
      category="c1"
      style={{
        fontSize,
        fontFamily: 'Jost-Regular',
        ...style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
