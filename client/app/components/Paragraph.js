import React from 'react';
import { Text } from '@ui-kitten/components';

export default function Paragraph({
  children,
  fontSize = 17,
  fontFamily = 'Jost-Regular',
  style,
  ...props
}) {
  return (
    <Text
      category="p1"
      style={{
        fontSize,
        fontFamily,
        ...style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
