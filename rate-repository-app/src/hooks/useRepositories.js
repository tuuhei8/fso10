/*
import { useState, useEffect } from 'react';
*/

import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  return result;
  /*
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    // eslint-disable-next-line no-undef
    const response = await fetch('http://192.168.50.120:5000/api/repositories');
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
  */
};

export default useRepositories;