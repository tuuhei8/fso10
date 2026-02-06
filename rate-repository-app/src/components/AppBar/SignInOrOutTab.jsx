import { Pressable } from "react-native";
import Text from "../Text";
import useSignOut from "../../hooks/useSignOut";
import AppBarTab from "./AppBarTab";

const SignInOrOutTab = ({ user }) => {
  const signOut = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      // eslint-disable-next-line no-undef
      console.log(e);
    }
  };

  if (user) {
    return (
      <Pressable onPress={handleSignOut}>
        <Text color='whiteText' fontSize='subheading'>Sign out</Text>
      </Pressable>
    );
  }

  return <AppBarTab text='Sign in' path='/signIn' />;
};

export default SignInOrOutTab;