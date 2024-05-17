import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ButtonType} from './components.type';
import Text from './Text';

const Button = (props: ButtonType) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={`flex-row h-[40px] w-full justify-center items-center ${
        props.rounded ? 'rounded-md' : ''
      } ${
        props.variant === 'light'
          ? 'bg-white border-[1px] border-[#66AE7B]'
          : 'bg-[#66AE7B]'
      }`}
      style={[
        props.disabled
          ? {
              backgroundColor: '#ccc',
            }
          : {},
      ]}
      {...props}>
      {props.image && (
        <Image
          source={props.image}
          className="w-[20px] mr-[8.22px]"
          resizeMode="contain"
        />
      )}
      <Text
        className={`${
          props.disabled
            ? 'text-[#808080]'
            : props.variant === 'light'
            ? 'text-[#66AE7B]'
            : 'text-white'
        } text-[16px] font-medium`}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
