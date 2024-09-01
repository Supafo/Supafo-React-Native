import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { moderateScale } from "react-native-size-matters";
import Text from "../../../../../components/Text";
import { colors } from '../../../../../theme/colors';

export default function Category({ setValue, errors }: { setValue: any, errors: any }) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handlePress = (category: { value: string, label: string }) => {
        setSelectedCategory(category.value);
        setValue("category", category.value);
    };

    return (
        <View style={styles.main}>
            {categoryMap.map((category) => (
                <View key={category.value} style={{ marginTop: 3}}>
                    <TouchableOpacity
                        onPress={() => handlePress(category)}
                    >
                        <Text style={[
                            styles.label,
                            { color: selectedCategory === category.value ? colors.greenColor : 'black' },
                        ]}>
                            {category.label}
                        </Text>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#D0D5DD', width: '110%'}} />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const categoryMap = [
    {
        value: "restoran",
        label: "Restoran"
    },
    {
        value: "kafe",
        label: "Kafe"
    },
    {
        value: "fırın",
        label: "Fırın"
    },
    {
        value: "lokanta",
        label: "Lokanta"
    },
    {
        value: "otel",
        label: "Otel"
    },
    {
        value: "market",
        label: "Market"
    },
];

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,
        width: '100%',
      
    },
    label: {
        fontSize: moderateScale(14),
        color: colors.greenColor,
        marginBottom:13,
        marginTop:13,

    },
});
