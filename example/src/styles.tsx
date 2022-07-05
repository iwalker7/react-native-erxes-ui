import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  segment: {
    width: '100%',
    flexDirection: 'column',
    paddingVertical: 15,
  },
  props: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
});

export default styles;
