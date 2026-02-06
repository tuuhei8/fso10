import { POST_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";

const useReview = () => {
  const [mutate, result] = useMutation(POST_REVIEW, {
    onError: (error) => {
      // eslint-disable-next-line no-undef
      console.log('useReview', error);
    }
  });

  const postReview = async (review) => {
    const { data } = await mutate({ variables: { review } });

    return data;
  };

  return [postReview, result];
};

export default useReview;