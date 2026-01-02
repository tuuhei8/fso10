import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import Statistic from "./Statistic";
import theme from "../theme";

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
});

const RepositoryItem = ({item}) => {
  return (
    <View style={styles.flexContainer} >
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
    </View>
  );
};

export default RepositoryItem;