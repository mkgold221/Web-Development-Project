import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import UserProfileImage from "../UserProfileImage/UserProfileImage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBookmark,
  faEllipsisH,
  faMessage,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import style from "./Style";

const UserPost = ({
  firstName,
  lastName,
  location,
  profileImage,
  image,
  likes,
  message,
  bookmark,
}) => {
  return (
    <View style={style.container}>
      {/* HEADER */}
      <View style={style.header}>
        <View style={style.userInfo}>
          <UserProfileImage
            profileImage={profileImage}
            imageDimensions={48}
          />

          <View style={style.textContainer}>
            <Text style={style.name}>
              {firstName} {lastName}
            </Text>
            {location && (
              <Text style={style.location}>{location}</Text>
            )}
          </View>
        </View>

        <View style={style.ellipsis}>
          <FontAwesomeIcon icon={faEllipsisH} size={18} />
        </View>
      </View>

      {/* POST IMAGE */}
      <View style={style.postImage}>
        <Image
          source={image}
          style={style.image}
          resizeMode="cover"
        />

        {/* ACTIONS */}
         <View style={style.actions}>
  <View style={style.actionItem}>
    <FontAwesomeIcon icon={faHeart}  style={style.icon} />
    <Text style={style.actionText}>{likes}</Text>
  </View>

  <View style={style.actionItem}>
    <FontAwesomeIcon icon={faMessage}  style={style.icon} />
    <Text style={style.actionText}>{message}</Text>
  </View>

  <View style={style.actionItem}>
    <FontAwesomeIcon icon={faBookmark}  style={style.icon} />
    <Text style={style.actionText}>{bookmark}</Text>
  </View>
</View>

      </View>
    </View>
  );
};

UserPost.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  location: PropTypes.string,
  profileImage: PropTypes.any.isRequired,
  image: PropTypes.any.isRequired,
  likes: PropTypes.number.isRequired,
  message: PropTypes.number.isRequired,
  bookmark: PropTypes.number.isRequired,
};

export default UserPost;
