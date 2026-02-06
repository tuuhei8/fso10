import { TextInput, StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: theme.colors.backgroundColor,
    margin: 5,
    padding: 5,
    backgroundColor: 'white'
  },
});

const SearchBar =  ({ searchKeyword, setSearchKeyword }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder='Search'
      value={searchKeyword}
      onChangeText={setSearchKeyword}
    />
  );
};

export default SearchBar;