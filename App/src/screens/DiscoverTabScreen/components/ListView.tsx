import { ListViewProps } from "./component.types";
import responsiveScale from "../../../utils/responsiveScale";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import {Card} from '../../../components/Card';
import { ScrollView } from "react-native-gesture-handler";


const {scale, verticalScale, moderateScale} = responsiveScale;
const ListView = ({ cardItems, navigation,}: ListViewProps) => {
    return (
      <FlatList
      contentContainerStyle={styles.cardList}
      data={cardItems}
      renderItem={({ item }) => (
        <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => navigation.navigate('RestaurantDetail', { item })}>
          <Card data={item} />
        </TouchableOpacity>
      )}
      scrollEnabled={true}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      ItemSeparatorComponent={() => <View style={{ height: verticalScale(12.5) }} />}
    />
     
    );
  };
  
  export default ListView;

  const styles = StyleSheet.create({
    cardList: {
      paddingHorizontal: moderateScale(10),
      paddingVertical: verticalScale(10),
      top: moderateScale(0)
    },
  });
  
  