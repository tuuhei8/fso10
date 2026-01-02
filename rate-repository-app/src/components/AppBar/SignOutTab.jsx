import { Pressable } from "react-native";
import Text from "../Text";
import useSignOut from "../../hooks/useSignOut";

const SignOutTab = ({ text }) => {
  const signOut = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable onPress={handleSignOut}>
      <Text color='whiteText' fontSize='subheading'>{text}</Text>
    </Pressable>
  );
};

export default SignOutTab;