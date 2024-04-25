import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import {
  SearchIcon,
  DonateBackgroundImage,
  DonateIcon,
} from '../../assets/images';
import Input from '../../components/Input';
import {colors} from '../../theme/colors';
import {LocationInput} from '../../components/LocationInput';
import HeadingText from '../../components/HeadingText';
import {Card} from '../../components/Card';
import {Donate} from '../../components/Donate';
import Swiper from 'react-native-swiper';
import BookStatus from '../../components/BookStatus';

export default function HomeTabScreen() {
  return (
    <Screen scrollview>
      <View>
        <LocationInput distance={10} title="Istiklal Park" />
      </View>

      <View style={styles.inputView}>
        <Input
          className="p-[0px]"
          isPassword={false}
          heading=" "
          placeholder="Ara..."
          rounded
          icon={SearchIcon}
          style={styles.input}></Input>
      </View>

      <BookStatus status="delivered" />

      <HeadingText title="Haftanın Yıldızları" />

      <Card />

      <Donate
        backgroundImage={DonateBackgroundImage}
        isAvailable={false}
        icon={DonateIcon}
        title="Bağış Yapmak İster Misin ?"
        button={{
          variant: 'light',
          rounded: true,
        }}
        buttonTitle="Bağış yap"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputView: {
    gap: 8,
  },

  input: {
    width: 335,
    height: 36,
    fontSize: 10,
    color: colors.placeholder,
  },
});
