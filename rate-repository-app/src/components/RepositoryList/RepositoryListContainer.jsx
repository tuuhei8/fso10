import { FlatList, StyleSheet, View, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import OrderSelector from "./OrderSelector";
import SearchBar from "./SearchBar";
import React from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ order, setOrder, searchKeyword, setSearchKeyword }) => {
  return (
    <View>
      <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
      <OrderSelector order={order} setOrder={setOrder} />
    </View>
  );
};

class RepositoryListContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      repositoryNodes: []
    };
  }
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(props, state) {
    const repositories = props.repositories
      ? props.repositories.edges.map(edge => edge.node)
      : [];

    return { repositoryNodes: repositories };
  }

  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader order={props.order} setOrder={props.setOrder}
        searchKeyword={props.searchKeyword} setSearchKeyword={props.setSearchKeyword}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <Pressable onPress={() => this.props.navigate(`/repository/${item.id}`)}><RepositoryItem item={item} /></Pressable>}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
};

export default RepositoryListContainer;