import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-erxes-ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 3,
    borderBottomWidth: 1,
    borderColor: Colors.grey100,
  },
  segment: {
    width: '100%',
    flexDirection: 'column',
    paddingVertical: 15,
    borderColor: 'transparent',
    borderBottomColor: Colors.grey100,
    borderWidth: 1,
  },
  props: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
});

export default styles;
