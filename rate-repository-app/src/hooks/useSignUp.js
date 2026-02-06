import { CREATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      // eslint-disable-next-line no-undef
      console.log('useSignIn', error);
    }
  });

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({ variables: { user: { username, password } } });

    return data;
  };

  return [signUp, result];
};

export default useSignUp;