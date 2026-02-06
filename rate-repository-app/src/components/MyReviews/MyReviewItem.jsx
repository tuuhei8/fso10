import Text from '../Text';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import theme from '../../theme';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../../hooks/useDeleteReview';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    backgroundColor: 'white',
  },
   flexItemA: {
    flexGrow: 0,
    flexDirection: 'row',
  },
  flexItemB: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  flexItemC: {
    flexGrow: 1,
    textAlign: 'center',
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
  },
  viewRepositoryButton: {
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  deleteReviewButton: {
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
});



const MyReviewItem = ({ review, refetch }) => {
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy');
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const removeReview = (reviewId) => {
    deleteReview(reviewId);
    refetch();
  };

  const deleteButtonAlert = () =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Delete', onPress: () => removeReview(review.id)},
    ]);

  return (
    <View style={styles.flexContainer} >
      <View style={styles.flexItemA} >
        <View style={styles.ratingBox} >
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.details} >
          <Text fontWeight='bold' fontSize='subheading' >{review.repository.fullName}</Text>
          <Text>{date}</Text>
          <View style={styles.review}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexItemB} >
        <View style={styles.flexItemC} >
          <Pressable style={styles.viewRepositoryButton} onPress={() => navigate(`/repository/${review.repository.id}`)}>
            <Text color='whiteText' >View repository</Text>
          </Pressable>
        </View>
        <View style={styles.flexItemC} >
          <Pressable style={styles.deleteReviewButton} onPress={() => deleteButtonAlert()}>
            <Text color='whiteText' >Delete review</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MyReviewItem;