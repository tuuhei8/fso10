import { Text, View } from "react-native"

const RepositoryItem = ({item}) => {
  console.log(item)
  return (
    <View>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.forksCount}</Text>
      <Text>Forks: {item.stargazersCount}</Text>
      <Text>Reviews: {item.ratingAverage}</Text>
      <Text>Rating: {item.reviewCount}</Text>
    </View>
  )
}

export default RepositoryItem