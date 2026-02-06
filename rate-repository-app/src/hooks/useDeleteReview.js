import { DELETE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";

const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      // eslint-disable-next-line no-undef
      console.log('useReview', error);
    }
  });

  const deleteReview = async (deleteReviewId) => {
    await mutate({ variables: { deleteReviewId } });
  };

  return [deleteReview];
};

export default useDeleteReview;