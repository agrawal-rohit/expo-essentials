import React from 'react';
import { View, Modal, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@ui-kitten/components';
import Page from './Page';
import Heading from './Heading';

export default function CustomModal({
  children,
  visible,
  onClose,
  modalTitle = 'Modal',
  animationType = 'slide',
  ...props
}) {
  const theme = useTheme();
  return (
    <Modal animationType={animationType} visible={visible} {...props}>
      <Page>
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              marginTop: 40,
              justifyContent: 'space-between',
            }}
          >
            <Heading>{modalTitle}</Heading>

            <TouchableHighlight
              style={{ alignSelf: 'center' }}
              onPress={() => {
                onClose();
              }}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme['text-basic-color']}
              />
            </TouchableHighlight>
          </View>

          <View>{children}</View>
        </KeyboardAwareScrollView>
      </Page>
    </Modal>
  );
}
