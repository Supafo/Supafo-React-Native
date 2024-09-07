import { MapViewSectionProps } from "./component.types";
import responsiveScale from "../../../utils/responsiveScale";
import { View,StyleSheet,FlatList } from "react-native";
import MapViewModal from "../../../components/MapViewModal";
import CardList from "../../../components/CardList";

const {scale, verticalScale, moderateScale} = responsiveScale;
const MapViewSection = ({ cardItems, fullHeight }: MapViewSectionProps) => {
    return (
      <View style={styles.mapsContainer}>
        <View style={[styles.fullMapsContainer, { height: fullHeight * 1 }]}>
          <MapViewModal slider={null} searchText={null} isClicked={null} setIsClicked={null} />
        </View>
        <View style={styles.fullCardContainer}>
        <FlatList
            data={cardItems}
            renderItem={({ item }) => <CardList item={item} />}
            horizontal={true}
            contentContainerStyle={{ gap: 10 }}
          />
        </View>
      </View>
    );
  };

  export default MapViewSection;

  const styles = StyleSheet.create({
    mapsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullMapsContainer: {
      width: '100%',
      backgroundColor: 'lightgray',
    },
    fullCardContainer: {
      width: '100%',
      padding: moderateScale(10),
    },
  });
  
  