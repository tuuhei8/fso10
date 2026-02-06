import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, searchKeyword, first) => {

  let variables;
  switch (order) {
    case 'latest':
      variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      break;
    case 'highestRated':
      variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      break;
    case 'lowestRated':
      variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      break;
    default:
      variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  }

  if (searchKeyword.length > 0) {
    variables = {...variables, searchKeyword};
  }

  variables = {...variables, first: first};

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
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