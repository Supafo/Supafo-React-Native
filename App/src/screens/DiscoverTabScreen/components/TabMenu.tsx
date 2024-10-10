import { TabMenuProps } from "./component.types";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import responsiveScale from "../../../utils/responsiveScale";

const {scale, verticalScale, moderateScale} = responsiveScale;
const TabMenu = ({ activeTab, setActiveTab }:TabMenuProps) => {
    return (
      <View style={styles.tabContainer}>
        <View style={styles.tabsAndText}>
          <TouchableOpacity style={activeTab === 'liste' ? styles.activeTab : styles.tab} onPress={() => setActiveTab('liste')}>
            <Text style={activeTab === 'liste' ? styles.activeTabText : styles.tabText}>Liste</Text>
          </TouchableOpacity>
          <TouchableOpacity style={activeTab === 'harita' ? styles.activeTab : styles.tab} onPress={() => setActiveTab('harita')}>
            <Text style={activeTab === 'harita' ? styles.activeTabText : styles.tabText}>Harita</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  export default TabMenu;
  const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(20),
        marginStart: moderateScale(10),
        borderWidth: moderateScale(0.5),
        borderRadius: moderateScale(20),
        paddingHorizontal: moderateScale(0),
        height: verticalScale(36),
        width:scale(114.5),
        borderColor:'#D0D5DD',
        backgroundColor:'white',


    },
    tabsAndText: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(1.5),
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(20),
        textAlign:'center',
    },
    tab: {
        borderRadius: moderateScale(20),
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(0),
        alignItems: 'center',
    },
    activeTab: {
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(6),
        borderRadius: moderateScale(20),
        backgroundColor: '#66AE7B',
        alignItems: 'center',
        height: verticalScale(32),
    },
    tabText: {
      fontSize: moderateScale(13),
      color: '#555',
      textAlign:'center',
    },
    activeTabText: {
      fontSize: moderateScale(13),
      color: 'white',
      textAlign:'center',
    },
  });
  