import useSingleRepository from '../../hooks/useSingleRepository';
import Text from '../Text';
import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryItem from '../RepositoryList/RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerBottom: {
    marginBottom: 20,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} />;
};

const SingleRepositoryContainer = ({ repository, onEndReach }) => {
  let reviewNodes;
  if (repository?.reviews) {
    reviewNodes = repository.reviews
      ? repository.reviews.edges.map(edge => edge.node)
      : [];
  } else {
    return null;
  }

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponentStyle={styles.headerBottom}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const SingleRepository = () => {
  const repositoryId = useParams().id;
  const first = 5;
  const variables = { repositoryId, first };
  const { repository, error, fetchMore } = useSingleRepository(variables);

  if (error) {
    // eslint-disable-next-line no-undef
    console.log('SingleRepository component:', error);
    return <Text>Error</Text>;
  }

  const onEndReach = () => {
    fetchMore();
  };

  return <SingleRepositoryContainer repository={repository} onEndReach={onEndReach} />;
};

export default SingleRepository;