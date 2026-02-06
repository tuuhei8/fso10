import { Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "../Text";

const AppBarTab = ({ text, path }) => {

  return (
    <Pressable>
      <Link to={path}>
        <Text color='whiteText' fontSize='subheading'>{text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;