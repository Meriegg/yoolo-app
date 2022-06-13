import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerScreenProps,
} from "@react-navigation/drawer";

const DrawerContent: React.FC<any> = (props) => {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={"Home"}
        onPress={() => props.navigate("Home")}
      ></DrawerItem>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
