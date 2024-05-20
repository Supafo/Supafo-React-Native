import {ScrollView, View} from 'react-native';
import React from 'react';
import {ScreenType} from './components.type';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Screen = ({children, header, scrollview, ...props}: ScreenType) => {
  const insets = useSafeAreaInsets();
  if (scrollview) {
    <ScrollView
      className="flex-1 bg-[#F5F5FA]"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      {header ?? <></>}
      <View className={`flex-1 px-[20px]`} {...props}>
        {children}
      </View>
      <View className={`flex-1 px-[20px]`} {...props}>
        {children}
      </View>
    </ScrollView>;
  }
  return (
    <View
      className="flex-1 "
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: 'white',
      }}>
      {header ?? <></>}
      <View className={`flex-1 px-[20px]`} {...props}>
        {children}
      </View>
    </View>
  );
};

export default Screen;
