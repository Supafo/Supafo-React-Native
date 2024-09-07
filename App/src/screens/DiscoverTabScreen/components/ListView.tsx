import { ListViewProps } from "./component.types";
import responsiveScale from "../../../utils/responsiveScale";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import {Card} from '../../../components/Card';


const {scale, verticalScale, moderateScale} = responsiveScale;
const ListView = ({ cardItems, navigation }) => {
    return (
      <FlatList
      style={{top:moderateScale(130)}}
        data={cardItems}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetail', { item })}>
            <Card data={item} />
          </TouchableOpacity>
        )}
        scrollEnabled={true}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: verticalScale(12.5),}} />}
      />
    );
  };
  
  export default ListView;

  const styles = StyleSheet.create({
    cardList: {
      paddingHorizontal: moderateScale(10),
      paddingVertical: verticalScale(10),
    },
  });
  
  