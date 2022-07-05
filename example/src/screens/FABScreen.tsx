import React from 'react';
import { Surface, FAB } from 'react-native-erxes-ui';

const FABScreen = () => {
  const [state, setState] = React.useState(false);

  const onStateChange = () => setState(!open);

  return (
    <Surface>
      <FAB.Group
        open={state}
        icon={state ? 'calendar-today' : 'plus'}
        actions={[
          { icon: 'plus', onPress: () => console.log('Pressed add') },
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
    </Surface>
  );
};

export default FABScreen;
