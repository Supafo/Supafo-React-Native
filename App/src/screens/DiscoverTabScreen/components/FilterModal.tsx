import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Dropdown } from 'react-native-element-dropdown'; // Dropdown component used
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import ModalCloseGreen from '../../../assets/images/bottombaricons/ModalCloseGreen.svg'
import { hourData } from '../../FavouriteTabScreen/data/hour-data';
import responsiveScale from '../../../utils/responsiveScale';
import {colors} from '../../../theme/colors'
import { FilterModalProps } from './component.types';


const {scale, verticalScale, moderateScale} = responsiveScale;

const FilterModal = ({filterSheetRef}:FilterModalProps) => {
    const [isTodaySelected, setIsTodaySelected] = useState<boolean>(false);
    const [isTomorrowSelected, setIsTomorrowSelected] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState('');
    const [dropdown2, setDropdown2] = useState('');
  
    return (
        <ActionSheet 
        indicatorStyle={{backgroundColor: '#fff'}}
        initialSnapIndex={0}
        containerStyle={{
          paddingTop: verticalScale(10),
          backgroundColor: '#fff',
        }}
        statusBarTranslucent
        closeOnPressBack
        animated={false}
        drawUnderStatusBar={true}
        gestureEnabled={true}
        headerAlwaysVisible={false}
        defaultOverlayOpacity={0.3}
        ref={filterSheetRef}>
        <View>
          <View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrele</Text> 
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => filterSheetRef?.current?.hide()}>
                <ModalCloseGreen />
              </TouchableOpacity>
              </View>
            <View style={styles.modalContent}>
              <View>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>Günler</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: verticalScale(17),
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#66AE7B',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Bugün
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    isChecked={isTodaySelected}
                    onPress={(isChecked: boolean) => {
                      setIsTodaySelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: verticalScale(9),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#66AE7B',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Yarın
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: verticalScale(28)}}>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>Saat Aralığı</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: verticalScale(20),
                    paddingRight: moderateScale(12),
                    marginRight: moderateScale(33),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Dropdown
                      data={hourData}
                      style={[styles.dropdown, {marginRight: moderateScale(20)}]}
                      onConfirmSelectItem={(item: any) => setDropdown(item)}
                      labelField="value"
                      valueField="value"
                      value={dropdown}
                      placeholder={'Saat'}
                      itemTextStyle={styles.dropdownItemText}
                      itemContainerStyle={styles.dropdownItemContainer}
                      placeholderStyle={styles.dropdownPlaceholder}
                      selectedTextStyle={styles.dropdownSelectedText}
                      onChange={item => setDropdown(item.value)}
                      iconColor={colors.greenColor}
                    />
                    <Text style={{color: '#000000', fontWeight: '400'}}>
                      ile
                    </Text>
                    <Dropdown
                      data={hourData}
                      style={[
                        styles.dropdown,
                        {marginRight: moderateScale(40), marginLeft: moderateScale(20)},
                      ]}
                      onConfirmSelectItem={(item: any) => setDropdown(item)}
                      labelField="value"
                      valueField="value"
                      value={dropdown2}
                      placeholder={'Saat'}
                      itemTextStyle={styles.dropdownItemText}
                      itemContainerStyle={styles.dropdownItemContainer}
                      placeholderStyle={styles.dropdownPlaceholder}
                      selectedTextStyle={styles.dropdownSelectedText}
                      onChange={item => setDropdown2(item.value)}
                      iconColor={colors.greenColor}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.greenColor,
                        borderRadius: moderateScale(100),
                        marginEnd: moderateScale(10),
                      }}>
                      <MaterialCommunityIcons
                        name="plus"
                        size={scale(23)}
                        color={'white'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderRadius: moderateScale(100),
                      }}>
                      <MaterialCommunityIcons
                        name="minus"
                        size={scale(23)}
                        style={{
                          backgroundColor: 'rgba(102, 174, 123, 0.6)',
                          borderRadius: moderateScale(50),
                        }}
                        color={'white'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{marginTop: verticalScale(29)}}>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>
                    Sürpriz Paket Türü
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: verticalScale(15),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Yeni Paketler
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: verticalScale(9),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Yemekler
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: verticalScale(9),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Unlu Mamülleri
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: verticalScale(22)}}>
                <View style={styles.row}>
                  <Text style={styles.modalSectionTitle}>Diyet Tercihi</Text>
                </View>
                <View
                  style={{
                    marginTop: verticalScale(15),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Vejetaryen
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: verticalScale(9),
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: moderateScale(11),
                    paddingRight: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '400',
                      fontSize: moderateScale(14),
                    }}>
                    Vegan
                  </Text>
                  <BouncyCheckbox
                    bounceEffectIn={1}
                    bounceEffect={0}
                    bounceVelocityIn={0}
                    bounceVelocityOut={0}
                    size={scale(24)}
                    innerIconStyle={{
                      borderRadius: moderateScale(4),
                      borderWidth: moderateScale(2),
                    }}
                    fillColor="#66AE7B"
                    unFillColor="#fff"
                    text=""
                    isChecked={isTomorrowSelected}
                    iconStyle={{borderColor: '#66AE7B', borderRadius: moderateScale(4)}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={(isChecked: boolean) => {
                      setIsTomorrowSelected(isChecked);
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{paddingHorizontal: moderateScale(50), marginBottom: verticalScale(22.5), marginTop: verticalScale(20)}}>
              <TouchableOpacity
                onPress={() => filterSheetRef.current?.hide()}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: verticalScale(10),
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    color: 'white',
                    padding: moderateScale(10),
                    borderRadius: moderateScale(20),
                    backgroundColor: colors.greenColor,
                    width: '100%',
                    textAlign: 'center',
                  }}>
                  Sonuçları Göster
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ActionSheet>
    );
  };

export default FilterModal;

const styles = StyleSheet.create({
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      modalTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: moderateScale(18),
        marginBottom: verticalScale(10),
        fontWeight: '500',
        color: '#333333',
      },
      closeButton: {
        position: 'relative',
        right: moderateScale(45),
        height: scale(15),
        width: scale(15),
      },
    modalContent: {
        paddingLeft: moderateScale(5),
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        padding: moderateScale(0),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      modalSectionTitle: {
        fontSize: moderateScale(16),
        color: colors.greenColor,
        fontWeight: '600',
      },
    checkboxRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: verticalScale(10),
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    checkboxText: {
      fontSize: moderateScale(14),
      color: 'gray',
    },
    checkboxInnerIcon: {
      borderColor: 'green',
      borderWidth: 2,
    },
    checkboxIcon: {
      borderRadius: moderateScale(5),
    },
    timeRangeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: verticalScale(10),
    },
    timeRangeText: {
      fontSize: moderateScale(14),
      color: 'gray',
      marginHorizontal: moderateScale(10),
    },
    dropdown: {
        borderColor: colors.greenColor,
        margin: 0,
        paddingLeft: moderateScale(0),
        paddingRight: moderateScale(2),
        borderRadius: moderateScale(15),
        width: '28%',
        borderWidth: 1,
      },
      dropdownItemText: {
        fontSize: moderateScale(15),
        color: '#000000',
        textAlign: 'center',
      },
      dropdownItemContainer: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
      },
      dropdownPlaceholder: {
        lineHeight: moderateScale(18),
        textAlign: 'center',
      },
      dropdownSelectedText: {
        textAlign: 'center',
        color: '#000000',
      },
  });