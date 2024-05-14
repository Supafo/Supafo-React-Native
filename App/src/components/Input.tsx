import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {InputType} from './components.type';
import IOSIcons from 'react-native-vector-icons/Ionicons';

const Input = ({isPassword, ...props}: InputType) => {
  const [display, setDisplay] = useState(!isPassword);
  return (
    <View className="w-full">
      <Text style={{color: '#333333', paddingStart: 5}} >{props.heading || props.placeholder}</Text>
      <View className="flex-row items-center rounded-[20px] border-[1px] pl-[13px] border-[#D0D5DD] bg-white w-full mt-1">
        {props.icon && (
          <Image source={props.icon} className="w-[16px] h-[16px] mr-[10px]" />
        )}
        <TextInput
          secureTextEntry={!display}
          {...props}
          className="p-[6px] pl-0 flex-1"
          style={{paddingStart: 3}}
        />
        {isPassword ? (
          display === true ? (
            <TouchableOpacity
              onPress={() => setDisplay(false)}
              className="mr-4">
              <IOSIcons
                name="eye-off-outline"
                style={{color: '#808080', fontSize: 20}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setDisplay(true)} className="mr-4">
              <IOSIcons
                name="eye-outline"
                style={{color: '#808080', fontSize: 20}}
              />
            </TouchableOpacity>
          )
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default Input;
