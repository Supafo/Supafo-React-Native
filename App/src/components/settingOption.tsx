import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
interface ISettingOption {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const SettingOption: React.FC<ISettingOption> = ({
  left,
  right,
  title,
  onPress,
  style,
}) => {
  //   const handlePress = () => {
  //     console.log('Press');
  //   };
  return (
    <Pressable style={[styles.root, style]} onPress={onPress}>
      <View style={styles.leftContainer}>
        {left}
        {title ?? <Text style={styles.title}>{title}</Text>}
      </View>
      {right ?? <View style={styles.rightContainer}>{right}</View>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    height: 45,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    alignItems: 'center',
  },
  title: {
    marginLeft: 8,
    fontFamily: 'Bold',
    fontSize: 17,
    lineHeight: 16.94,
    color: 'black',
  },
});
