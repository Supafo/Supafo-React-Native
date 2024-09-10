import { StyleSheet, View } from "react-native";
import Text from "../../../../../components/Text";
import { moderateScale } from "react-native-size-matters";

export default function InfoSection({ title, value }: { title: string, value: string }) {
    return (
        <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: moderateScale(12),
        color:'#33333'
    },
    value: {
        width:moderateScale(135),
        fontSize: moderateScale(12),
        color: '#00000080',
    }
})