import { StyleSheet,View ,TouchableOpacity, Image} from "react-native";
import responsiveScale from "../../../utils/responsiveScale";
import { HeaderSectionProps } from "./component.types";
import filterIcon from '../../../assets/images/filterIcon.png'
import { SearchIcon } from "../../../assets/images";
import Input from "../../../components/Input";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import IOSIcons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../../theme/colors";


const {scale, verticalScale, moderateScale} = responsiveScale;

const HeaderSection = ({showActionSheet} : HeaderSectionProps) => {

  const [searchText, setSearchText] = useState('');
    return (
      <View style={{flexDirection:'row',
      marginStart:moderateScale(10),
      marginTop: verticalScale(20),
      marginBottom: verticalScale(17.5),
      alignItems:'center',
      borderColor:'#D0D5DD',
        borderWidth:0.5,
        height:hp('4.425%'),
        borderRadius:moderateScale(14),
        width:wp('89%',
        )
      }}>
      
          <View style={{justifyContent:'center',marginStart:moderateScale(10)}}>
          <IOSIcons name="search-outline" size={wp('5.5%')} color={colors.openGreen}/>

          </View>
      <TextInput style={{color:'black',width: wp('65%'),height:hp('4.425%'),top:moderateScale(2)}}
      onChangeText={text => setSearchText(text)}
      onChange={() => {showActionSheet}}
      placeholder='Ara...'
      onFocus={showActionSheet}
      textAlign='left'
      placeholderTextColor={'gray'}
      value={searchText}>

      </TextInput>
      </View>
    );
  };
  export default HeaderSection;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateScale(10),
      marginTop: verticalScale(2.5),
      marginStart: moderateScale(7.5),
       opacity: 1,
       zIndex:0,
      
    },
    inputContainer: {
      flex: 6,
      justifyContent: 'center', 
      paddingBottom: verticalScale(0), 
      marginRight: moderateScale(5),
      backgroundColor:'white',
      height:verticalScale(33),
      paddingTop: moderateScale(7.3),
      borderRadius: 20,

      
    },
    filter: {
      width: scale(35),
      height: verticalScale(35),
      bottom: moderateScale(0.5),
      borderRadius:moderateScale(20),
      borderWidth:1,
      borderColor:'#D0D5DD',
      backgroundColor:'white',
    },
    inputIconStyle: {
      width: moderateScale(20),
      height: verticalScale(20),
      marginStart: moderateScale(5),
      marginEnd: moderateScale(7.5) 
    },
    inputInnerStyle: {
      width: '100%',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: verticalScale(32), 
      color: 'black', 
      top: moderateScale(2) 
    },
    iconStyle: {
        flex: 1 
    }
  });