import {View, Text, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import {PhoneInputType} from './components.type';
import IOSIcons from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'rn-country-picker';

const PhoneInput = (props: PhoneInputType) => {
  const [countryCode, setCountryCode] = useState('90');
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <View className="w-full flex-row">
      <View className="mr-[10px]">
        <Text>Ülke Kodu</Text>
        <View className="flex-row items-center rounded-[15px] border-[1px] border-[#D0D5DD] bg-white w-full mt-1">
          <CountryPicker
            disable={false}
            animationType={'slide'}
            language="en"
            pickerTitle={'Select your country'}
            searchBarPlaceHolder={'Search your country'}
            hideCountryFlag={false}
            hideCountryCode={false}
            countryCode={'90'}
            selectedCountryTextStyle={{marginLeft: 10, marginRight: 5}}
            containerStyle={{
              height: 47,
              paddingLeft: 15,
              paddingRight: 10,
            }}
            countryNameTextStyle={{
              marginLeft: 10,
            }}
            selectedValue={(value: string) => {
              setCountryCode(value);
              props.onChangeNumber(value + phoneNumber);
            }}
          />
        </View>
      </View>
      <View className="flex-1">
        <Text>{props.heading || props.placeholder}</Text>
        <View className="flex-row items-center rounded-[15px] border-[1px] border-[#D0D5DD] bg-white w-full mt-1 px-[13px]">
          {props.icon && (
            <Image
              source={props.icon}
              className="w-[20px] h-[20px] mr-[10px]"
            />
          )}
          <TextInput
            value={phoneNumber}
            keyboardType="number-pad"
            {...props}
            className="p-[15px] pl-0 flex-1"
            onChangeText={text => {
              setPhoneNumber(text);
              props.onChangeNumber(countryCode + text);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneInput;
