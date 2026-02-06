import useSignIn from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import SignInContainer from './SignInContainer';
import { useState } from 'react';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
    }
  };

  return <SignInContainer onSubmit={onSubmit} errorMessage={errorMessage} />;
};

export default SignIn;