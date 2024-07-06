import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {PhoneInputType} from './components.type';
import CountryPicker from 'rn-country-picker';

const PhoneInput = (props: PhoneInputType) => {
  const [countryCode, setCountryCode] = useState('90');
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <View className="w-full flex-row" style={{height: '18%'}} >
      <View className="mr-[5px]">
        <Text style={{color: '#333333', paddingStart: 4}}>Ülke Kodu</Text>
          <CountryPicker
            disable={false}
            animationType={'slide'}
            language="en"
            pickerTitle="Select your country"
            searchBarPlaceHolder={'Ülke seçiniz'}
            hideCountryFlag={false}
            hideCountryCode={false}
            countryCode={countryCode}
            pickerContainerStyle={{
              borderWidth: 1,
              borderColor: 'lightgray',
              marginTop: 4,
              height: '60%',
              padding: 13,
              right: 6,
              
            }}
            countryFlagStyle={{height: 8, aspectRatio: 1.7, margin: 5,}}
            dropDownIconStyle={{backgroundColor: 'white', height: 10, aspectRatio: 1.5}}
            selectedValue={(value: any) => {
              setCountryCode(value?.callingCode);
              props.onChangeNumber(phoneNumber);
            }}
          />
      </View>
      <View className="flex-1">
        <Text style={{color: '#333333', paddingStart: 5}}>
          {props.heading || props.placeholder}
        </Text>
        <View className="flex-row items-center rounded-[20px] border-[1px] border-[#D0D5DD] bg-white w-full mt-1 px-[13px]">
          {props.icon && (
            <Image
              source={props.icon}
              className="w-[16px] h-[16px] mr-[10px]"
            />
          )}
          <TextInput
            value={phoneNumber}
            keyboardType="number-pad"
            {...props}
            className="p-[7px] pl-0 flex-1"
            onChangeText={text => {
              setPhoneNumber(text);
              props.onChangeNumber(text);
            }}
            style={{color: '#333333'}}
            placeholderTextColor={'gray'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countryContainer: {
    marginTop: 4,
    display: 'flex',
    paddingLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor:'red',
  },
});

export default PhoneInput;
