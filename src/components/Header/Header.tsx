import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Icon} from '@rneui/themed';

const staticInfo = {
  name: 'Juan Ortiz',
  subtitle: 'Welcome back to your goal',
  uri: 'https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png',
};
const Header = () => {
  const {canGoBack, goBack} = useNavigation();
  const {container, leftContainer, rightContainer, name, subtitle, profileImage, arrowContainer} =
    styles;
  return (
    <View style={container}>
      {canGoBack() && (
        <View style={arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" size={24} />}
            type="clear"
            onPress={() => goBack()}
          />
        </View>
      )}
      <View style={leftContainer}>
        <Text style={name}>Hello {staticInfo.name}</Text>
        <Text style={subtitle}>{staticInfo.subtitle}</Text>
      </View>
      <View style={rightContainer}>
        <Image style={profileImage} source={{uri: staticInfo.uri}} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#808080',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  arrowContainer: {
    marginLeft: -12,
  },
});
