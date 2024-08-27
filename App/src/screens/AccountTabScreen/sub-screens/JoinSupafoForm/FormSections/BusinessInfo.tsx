import { Controller } from 'react-hook-form';
import { StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Input from "../../../../../components/Input";
import Text from "../../../../../components/Text";

export default function BusinessInfo({ control, errors }: { control: any, errors: any }) {

  return (
    <View style={styles.main}>
      <View style={{ marginTop: 3, width: '100%', rowGap: 10 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="İşletme Adı"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="isletme_adi"
        />
        {errors.isletme_adi && <Text>Bu alanın doldurulması zorunludur.</Text>}

      </View>
      <View style={{ marginTop: 16, width: '100%', }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Vergi No"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="vergi_no"
        />
        {errors.vergi_no && <Text>Bu alanın doldurulması zorunludur.</Text>}

      </View>
      <View style={{ marginTop: 16, width: '100%', }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="İşletme Adresi"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={5}
              maxLength={100}
              style={{ width: "100%" }}
            />
          )}
          name="isletme_adresi"
        />
        {errors.isletme_adresi && <Text>Bu alanın doldurulması zorunludur.</Text>}
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    width: "100%",
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
  Input: {
    width: "100%",
  }
});