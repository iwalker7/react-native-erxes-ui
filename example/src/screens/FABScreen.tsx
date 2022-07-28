import React from 'react';
import { TextView } from 'react-native-erxes-ui';
import { SafeAreaView } from 'react-native-safe-area-context';

const FABScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextView>Lorem</TextView>

      {/* <FAB.Group
        visible={true}
        open={state}
        icon={state ? 'eye' : 'eye'}
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
        onStateChange={() => setState(!state)}
        onPress={() => {
          if (state) {
            // do something if the speed dial is open
          }
        }}
      /> */}
    </SafeAreaView>
  );
};

export default FABScreen;
