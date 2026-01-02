import { Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "../Text";
import SignOutTab from "./SignOutTab";


const AppBarTab = ({ text, path }) => {

  if (text === 'Sign out') {
    return (
      <SignOutTab text={text} />
    );
  }

  return (
    <Pressable>
      <Link to={path}>
        <Text color='whiteText' fontSize='subheading'>{text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;