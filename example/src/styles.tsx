import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-erxes-ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 3,
    borderBottomWidth: 1,
    borderColor: Colors.surface,
  },
});

export default styles;
