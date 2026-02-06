import useRepositories from '../../hooks/useRepositories';
import Text from '../Text';
import RepositoryListContainer from './RepositoryListContainer';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

/*
const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];
*/

const RepositoryList = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const first = 8;
  const { repositories, error, fetchMore } = useRepositories(order, debouncedKeyword, first);

  if (error) {
    // eslint-disable-next-line no-undef
    console.log('Error in RepositoryList component: ', error);
    return <Text>Error in RepositoryList component.</Text>;
  }

  const onEndReach = () => {
    // eslint-disable-next-line no-undef
    console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <RepositoryListContainer repositories={repositories} 
      navigate={navigate}
      order={order} 
      setOrder={setOrder} 
      searchKeyword={searchKeyword} 
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;