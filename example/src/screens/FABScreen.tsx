import React from 'react';
import { View } from 'react-native';
import { TextView, FAB } from 'react-native-erxes-ui';
import { SafeAreaView } from 'react-native-safe-area-context';

const FABScreen = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextView>Lorem</TextView>

      <FAB.Group
        open={open}
        icon={open ? 'eye' : 'eye'}
        actions={[
          {
            icon: 'star',
            label: 'Star',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'email',
            label: 'Email',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </SafeAreaView>
  );
};

export default FABScreen;
