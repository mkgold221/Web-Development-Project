import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes as R } from "./Routes";
import Home from "../screen/Home/Home";
import Profile from "../screen/profile/profile";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={R.HOME} component={Home} />
      <Stack.Screen name={R.PROFILE} component={Profile} />
    </Stack.Navigator>
  );
}

export default MainNavigation;
