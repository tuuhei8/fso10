import { View } from "react-native";
import AppBarTab from "./AppBarTab";

const SignUpTab = ({ user, style }) => {
  if (user) {
    return null;
  }

  return (
    <View style={style} >
      <AppBarTab text='Sign up' path='/signUp' />
    </View>
  );
};

export default SignUpTab;