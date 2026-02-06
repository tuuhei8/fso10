import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import Text from '../Text';
import { useFormik } from 'formik';
import theme from '../../theme';
import * as yup from 'yup';
import useReview from '../../hooks/useReview';
import { useNavigate } from 'react-router-native';

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

const Input = ({ error, placeholder, value, onChangeText, multiline }) => {
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
      multiline={multiline}
    />
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('required'),
  repositoryName: yup
    .string()
    .required('required'),
  rating: yup
    .number()
    .required('required')
    .positive()
    .integer()
    .max(100),
  text: yup
    .string()
    .optional(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container} >
      <Input
        placeholder='repository owner*'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        error={formik.errors.ownerName}
      />
       {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
      )}
      <Input
        placeholder='repository name*'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        error={formik.errors.repositoryName}
      />
       {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
      )}
      <Input
        placeholder='rating*'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        error={formik.errors.rating}
      />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
      )}
      <Input
        placeholder='text'
        multiline={true}
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        error={formik.errors.text}
      />
        {formik.touched.text && formik.errors.text && (
          <Text style={{ color: 'red' }}>{formik.errors.text}</Text>
      )}
      <Text>*required</Text>
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color='whiteText'>Send</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [postReview] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const newReview = {
      ownerName: values.ownerName,
      rating: Number(values.rating),
      repositoryName: values.repositoryName,
      text: values.text
    };

    try {
      const { createReview } = await postReview(newReview);
      const repositoryId = createReview.repositoryId;
      navigate(`/repository/${repositoryId}`);
    } catch (e) {
      // eslint-disable-next-line no-undef
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default CreateReview;