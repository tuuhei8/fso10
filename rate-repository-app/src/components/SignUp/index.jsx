import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from '../Text';
import { useFormik } from 'formik';
import theme from '../../theme';
import * as yup from 'yup';
import useSignUp from '../../hooks/useSignUp';
import useSignIn from '../../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: theme.colors.backgroundColor,
    margin: 5,
    padding: 3,
  },
  inputError: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#d73a4a',
    margin: 5,
    padding: 3,
  },
  button: {
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    margin: 5,
    padding: 5,
  }
});

const Input = ({ error, placeholder, value, onChangeText }) => {
  const inputStyles = [
    styles.input,
    error && styles.inputError,
  ];

  return (
    <TextInput 
      style={inputStyles}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'username must be 5-30 characters long')
    .max(30, 'username must be 5-30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'password must be 5-50 characters long')
    .max(50, 'password must be 5-50 characters long')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Password confirm does not match')
    .required('Password confirm is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container} >
      <Input
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        error={formik.errors.username}
      />
       {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <Input
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        error={formik.errors.password}
      />
       {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Input
        placeholder="confirm password"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        error={formik.errors.passwordConfirm}
      />
       {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: 'red' }}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color='whiteText'>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSumbit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      // eslint-disable-next-line no-undef
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSumbit} />;
};

export default SignUp;