import { SIGN_IN } from "../graphql/mutations";
import { useMutation, useApolloClient } from "@apollo/client/react";
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      // eslint-disable-next-line no-undef
      console.log('useSignIn', error);
    }
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({variables: { credentials: { username, password } } });

    await authStorage.setAccessToken(data.authenticate.accessToken);

    apolloClient.resetStore();

    const token = await authStorage.getAccessToken();

    return token ? { data: token } : '';
  };

  return [signIn, result];
};

export default useSignIn;