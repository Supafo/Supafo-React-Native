import { Image, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Text from "../../../../../components/Text";
import Input from "../../../../../components/Input";
import { OutlineClose } from "../../../../../assets/images";

export default function FormJoinSupafo() {
  return (


    <View style={styles.main}>
      <View style={{ marginTop: 3, width: '100%', rowGap: 10 }}>
        <Input
          fontSize={15}
          placeholder="İşletme adı"
        />
        <View>
          <Input
            fontSize={15}
            placeholder="Vergi no"
          />
          <Image source={OutlineClose} style={styles.icon} />
        </View>
        <Text>
          <OutlineClose />
        </Text>
        <Input
          fontSize={15}
          placeholder="İşletme adresi"
        />
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  headerTxt: {
    padding: 10,
    color: '#333333',
    fontSize: moderateScale(18),
    fontWeight: '500',
    lineHeight: 19,
  },
  icon: {
    width: 18,
    height: 15,
  },
});