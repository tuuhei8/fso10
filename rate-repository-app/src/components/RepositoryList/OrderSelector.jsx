import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  picker: {
    padding: 5,
    margin: 5,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    borderRadius: 5,
  }
});

const OrderSelector = ({ order, setOrder }) => {

  return (
    <Picker
      selectedValue={order}
      style={styles.picker}
      // eslint-disable-next-line no-unused-vars
      onValueChange={(itemValue, itemIndex) =>
          setOrder(itemValue)
      }>
      <Picker.Item label='Latest repositories' value='latest' />
      <Picker.Item label='Highest rated repositories' value='highestRated' />
      <Picker.Item label='Lowest rated repositories' value='lowestRated' />
    </Picker>
  );
};

export default OrderSelector;