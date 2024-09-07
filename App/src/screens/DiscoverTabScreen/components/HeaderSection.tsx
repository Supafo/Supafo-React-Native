import { StyleSheet,View ,TouchableOpacity, Image} from "react-native";
import responsiveScale from "../../../utils/responsiveScale";
import { HeaderSectionProps } from "./component.types";
import filterIcon from '../../../assets/images/filterIcon.png'
import { SearchIcon } from "../../../assets/images";
import Input from "../../../components/Input";


const {scale, verticalScale, moderateScale} = responsiveScale;

const HeaderSection = ({ showActionSheet }:HeaderSectionProps) => {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input
            isSearchBar={true}
            icon={SearchIcon}
            iconStyle={styles.inputIconStyle}
            placeholder='Ara...'
            style={styles.inputInnerStyle}
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={styles.iconStyle}>
          <TouchableOpacity onPress={showActionSheet}>
            <Image style={styles.filter} source={filterIcon} />
          </TouchableOpacity>
        </View>
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
       opacity: 0.8,
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