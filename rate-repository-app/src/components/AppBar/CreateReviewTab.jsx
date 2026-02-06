import { View } from "react-native";
import AppBarTab from "./AppBarTab";

const CreateReviewTab = ({ user, style }) => {
  if (!user) {
    return null;
  }

  return (
    <View style={style} >
      <AppBarTab text='Review' path='/createReview' />
    </View>
  );
};

export default CreateReviewTab;