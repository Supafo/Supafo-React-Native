import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Input from "../../../../../components/Input";
import Text from "../../../../../components/Text";
import { ScrollView } from "react-native-gesture-handler";

export default function PaymentInformation({ control, errors }: { control: any, errors: any }) {

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.main}>
            <View style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Banka Adı"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="banka_adi"
                />
                {errors.banka_adi && <Text>Bu alanın doldurulması zorunludur.</Text>}
            </View>
            <View style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Hesap Sahibi Adı"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="hesap_sahibi_adi"
                />
                {errors.banka_adi && <Text>Bu alanın doldurulması zorunludur.</Text>}
            </View>
            <View style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="IBAN"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="iban"
                />
                {errors.iban && <Text>Bu alanın doldurulması zorunludur.</Text>}
            </View>
            <View style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Swift/BIC Kodu"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="swift_bic_kodu"
                />
                {errors.swift_bic_kodu && <Text>Bu alanın doldurulması zorunludur.</Text>}
            </View>
            <View style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Şube Adı ve Kodu"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="sube_adı_kodu"
                />
                {errors.sube_adı_kodu && <Text>Bu alanın doldurulması zorunludur.</Text>}
            </View>
            <View style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Hesap Türü"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="hesap_turu"
                />
                {errors.hesap_turu && <Text>Bu alanın doldurulması zorunludur.</Text>}
            </View>
            <View style={styles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Para Birimi"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="para_birimi"
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,
        width: "100%",
    },
    container: {
        marginBottom: 24,
    }
})