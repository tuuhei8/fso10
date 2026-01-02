import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../../theme';
import { useQuery } from '@apollo/client/react';

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
  let signTabText;
  const { error, data } = useQuery(ME);

  if (error) {
    console.log(error);
  }

  if (data) {
    if (data.me) {
      signTabText = 'Sign out';
    } else {
      signTabText = 'Sign in';
    }
  }

  return (
  <View style={styles.container}>
    <ScrollView horizontal style={styles.flexItemA} >
      <View style={styles.flexItemB} >
        <AppBarTab text='Repositories' path='/' />
      </View>
      <View style={styles.flexItemB} >
        <AppBarTab text={signTabText} path='/signIn' />
      </View>
    </ScrollView>
  </View>
  );
};

export default AppBar;