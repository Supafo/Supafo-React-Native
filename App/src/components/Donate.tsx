import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {DonateType} from './components.type';
import {colors} from '../theme/colors';
import Button from './Button';

export function Donate(props: DonateType) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={props.backgroundImage}
        style={styles.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={styles.icon} source={props.icon} />
          </View>
          {!props.isAvailable ? (
            <View style={styles.headerRight}>
              <Text style={styles.headerRightText}>Yakında</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>

          <Button onPress={props.onPress} style={styles.button} variant="dark">
            <Text style={styles.buttonText}>{props.buttonTitle}</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 115,
    borderRadius: 15,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 15,
  },
  icon: {
    width: 35,
    height: 20.79,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    width: 40,
    height: 16,
    borderRadius: 15,
    backgroundColor: '#66AE7B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightText: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.splashtext,
    textAlign: 'center',
  },
  content: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleContainer: {
    width: 193,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#66AE7B',
  },
  button: {
    width: 88,
    height: 26,
    borderRadius: 15,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 8,
    lineHeight: 9.68,
  },
});
