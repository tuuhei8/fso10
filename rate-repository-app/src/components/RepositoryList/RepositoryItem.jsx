import { View, Image, StyleSheet, Pressable } from "react-native";
import Text from '../Text';
import Statistic from './Statistic';
import theme from "../../theme";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    backgroundColor: 'white',
  },
   flexItemA: {
    flexGrow: 0,
    flexDirection: 'row',
  },
  flexItemB: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  flexItemC: {
    flexGrow: 1,
    textAlign: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    margin: 10,
  },
  details: {
    rowGap: 5,
    width: '80%',
    padding: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.whiteText,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  languageBox: {
    flexDirection: 'row',
  },
  displayButton: {
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  doNotDisplayButton: {
    display: 'none',
  }
});

const RepositoryItem = ({ item }) => {
  let repositoryUrl = '#';
  let buttonStyle = styles.doNotDisplayButton;

  if (item.url) {
    repositoryUrl = item.url;
    buttonStyle = styles.displayButton;
  }

  const repositoryLink = () => {
    Linking.openURL(repositoryUrl);
  };

  return (
    <View style={styles.flexContainer} testID='repositoryItem' >
      <View style={styles.flexItemA} >
        <Image style={styles.avatar} source={{uri: item.ownerAvatarUrl}} ></Image>
        <View style={styles.details} >
          <Text fontWeight='bold' fontSize='subheading' >{item.fullName}</Text>
          <Text>{item.description}</Text>
          <View style={styles.languageBox}>
            <Text style={styles.language} >{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexItemB}>
        <View style={styles.flexItemC}>
          <Statistic type='Stars' number={item.stargazersCount} />
        </View>
        <View style={styles.flexItemC}>
          <Statistic type='Forks' number={item.forksCount} />
        </View>
        <View style={styles.flexItemC}>
          <Statistic type='Reviews' number={item.reviewCount} />
        </View>
        <View style={styles.flexItemC}>
          <Statistic type='Rating' number={item.ratingAverage} />
        </View>
      </View>
      <Pressable onPress={repositoryLink} style={buttonStyle}>
        <Text color='whiteText'>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

export default RepositoryItem;