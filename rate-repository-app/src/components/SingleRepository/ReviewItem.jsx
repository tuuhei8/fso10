import Text from '../Text';
import { View, StyleSheet } from 'react-native';
import theme from '../../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    backgroundColor: 'white',
  },
   flexItemA: {
    flexGrow: 0,
    flexDirection: 'row',
  },
  rating: {
    fontSize: 25,
    textAlign: 'center',
    justifyContent: 'center',
    color: theme.colors.primary,
  },
  details: {
    rowGap: 5,
    width: '80%',
    padding: 5,
  },
  review: {
    flexDirection: 'row',
  },
  ratingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    margin: 10,
  }
});

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.flexContainer} >
      <View style={styles.flexItemA} >
        <View style={styles.ratingBox} >
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.details} >
          <Text fontWeight='bold' fontSize='subheading' >{review.user.username}</Text>
          <Text>{date}</Text>
          <View style={styles.review}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;