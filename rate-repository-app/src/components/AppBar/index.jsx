import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../../theme';
import { useQuery } from '@apollo/client/react';
import SignUpTab from './SignUpTab';
import { useEffect, useState } from 'react';
import SignInOrOutTab from './SignInOrOutTab';
import CreateReviewTab from './CreateReviewTab';
import MyReviewsTab from './MyReviewsTab';

import { ME } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
  },
  flexItemA: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  flexItemB: {
    flexGrow: 1,
    margin: 5,
  }
});

const AppBar = () => {
  const [user, setUser] = useState(false);
  const { error, data } = useQuery(ME);

  if (error) {
    // eslint-disable-next-line no-undef
    console.log(error);
  }

  useEffect(() => {
    if (data) {
      if (data.me) {
        setUser(true);
      } else {
        setUser(false);
      }
    }
  }, [data]);

  return (
  <View style={styles.container}>
    <ScrollView horizontal style={styles.flexItemA} >
      <View style={styles.flexItemB} >
        <AppBarTab text='Repositories' path='/' />
      </View>
      <CreateReviewTab user={user} style={styles.flexItemB} />
      <MyReviewsTab user={user} style={styles.flexItemB} />
      <SignUpTab user={user} style={styles.flexItemB} />
      <View style={styles.flexItemB} >
        <SignInOrOutTab user={user} />
      </View>
    </ScrollView>
  </View>
  );
};

export default AppBar;