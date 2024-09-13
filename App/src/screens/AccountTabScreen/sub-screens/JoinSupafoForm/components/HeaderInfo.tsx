import { StyleSheet, View } from "react-native";
import Text from "../../../../../components/Text";
import { ArrowBlackIcon } from "../../../../../assets/images";
import { moderateScale } from "react-native-size-matters";

export default function HeaderInfo({ header }: { header: string }) {
    return (
        <View style={styles.HeaderWrapper}>
            <Text style={styles.header}>{header}</Text>
            <View>
                <ArrowBlackIcon />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    HeaderWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop:15,
    },
    header: {
        color: 'green',
        fontSize:moderateScale(14)
    }
})