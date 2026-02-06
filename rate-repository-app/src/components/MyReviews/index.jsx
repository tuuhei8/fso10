import { ME } from "../../graphql/queries"; 
import { useQuery } from "@apollo/client/react";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MyReviewItem from "./MyReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const [reviewNodes, setReviewNodes] = useState(null);

  const { error, data, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true }
  });

  if (error) {
    // eslint-disable-next-line no-undef
    console.log(error);
  }

  useEffect(() => {
    if (data) {
      if (data.me) {
        const reviews = data.me.reviews;

        const reviewNodes = reviews
          ? reviews.edges.map(edge => edge.node)
          : [];

        setReviewNodes(reviewNodes);
      } else {
        setReviewNodes(null);
      }
    }
  }, [data]);

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponentStyle={styles.headerBottom}
      renderItem={({ item }) => <MyReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;