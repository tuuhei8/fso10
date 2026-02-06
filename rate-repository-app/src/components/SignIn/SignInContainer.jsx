import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import Text from '../Text';
import { useFormik } from 'formik';
import theme from '../../theme';
import * as yup from 'yup';

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

const Input = ({ error, placeholder, value, onChangeText, secureTextEntry }) => {
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
      secureTextEntry={secureTextEntry}
    />
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignInContainer = ({ onSubmit, errorMessage }) => {
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
        secureTextEntry={true}
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        error={formik.errors.password}
      />
       {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Text style={{ color: 'red' }}>{errorMessage}</Text>
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color='whiteText'>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInContainer;