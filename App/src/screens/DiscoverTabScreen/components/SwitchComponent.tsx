import { SwitchComponentProps } from "./component.types";
import { View, Text, StyleSheet } from "react-native";
import { Switch } from 'react-native-switch';
import responsiveScale from "../../../utils/responsiveScale";

const {scale, verticalScale, moderateScale} = responsiveScale;
const SwitchComponent = ({ isEnabled, toggleSwitch }:SwitchComponentProps) => {
    return (
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText,{color: !isEnabled ? 'gray' : '#555'}]}>Tükendi</Text>
        <Switch
                  trackColor={{ false: '#FF9200', true: '#FF9200' }}

                  thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  backgroundActive={'#FF9200'}
                  backgroundInactive={'#D3D3D3'}
                  circleBorderActiveColor={'#FF9200'}
                  circleBorderInActiveColor={'#D3D3D3'}
                  circleActiveColor={'white'}
                  circleInActiveColor={'white'}
                  switchLeftPx={moderateScale(2)}
                  circleBorderWidth={moderateScale(1.75)}
                  barHeight={moderateScale(17.5)}
                  circleSize={moderateScale(17.5)}
                  activeText={''}
                  inActiveText={''}
                  circleBorderInactiveColor='#D3D3D3'
                  circleBorderColor={'#FF9200'}
                 
        />
      </View>
    );
  };

  export default SwitchComponent;

  const styles = StyleSheet.create({
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: moderateScale(10),
      borderRadius:moderateScale(20),
      padding: moderateScale(2.5),
      paddingEnd: moderateScale(0),
      marginEnd: moderateScale(17.5),
      height: verticalScale(30),
      backgroundColor:'white',
    },
    switchText: {
      fontSize: moderateScale(13),
      color: '#555',
      marginEnd: moderateScale(7.5),
    },
  });
  