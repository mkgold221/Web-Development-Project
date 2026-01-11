import React from "react";
import { View, Text, Image } from "react-native";
import style from "../../screen/Home/style";

const UserStory = ({ firstName, profileImage }) => {
  return (
    <View style={style.userStoryContainer}>
      <View style={style.borderImage}>
        <Image
          source={profileImage}
          style={style.profileImage}
        />
      </View>
      <Text style={style.firstName}>
        {firstName}
      </Text>
    </View>
  );
};

export default UserStory;
