import { Controller } from 'react-hook-form';
import { StyleSheet, View } from "react-native";
import Input from "../../../../../components/Input";
import Text from "../../../../../components/Text";

export default function WorkingHours({ control, errors }: { control: any, errors: any }) {

    return (
        <View style={styles.main}>
            <View style={{ marginTop: 3, width: '100%', }}>
            <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Açılış Saati"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="numeric"
                            maxLength={5} // HH:MM format
                        />
                    )}
                    name="opening_hour"
                />
                {errors.opening_hour && <Text>Bu alanın doldurulması zorunludur.</Text>}

            </View>
            <View style={{ marginTop: 16, width: '100%', }}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Kapanış Saati"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="numeric"
                            maxLength={5} // HH:MM format
                        />
                    )}
                    name="closing_hour"
                />
                {errors.closing_hour && <Text>Bu alanın doldurulması zorunludur.</Text>}

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
});