import { View } from "react-native";
import AppBarTab from "./AppBarTab";

const MyReviewsTab = ({ user, style }) => {
  if (!user) {
    return null;
  }

  return (
    <View style={style} >
      <AppBarTab text='My reviews' path='/myReviews' />
    </View>
  );
};

export default MyReviewsTab;