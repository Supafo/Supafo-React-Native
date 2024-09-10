import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import routes from '../../../../../navigation/routes';
import { RegistrationInfoIcon } from '../../../../../assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../../../theme/colors';
import { moderateScale, scale } from 'react-native-size-matters';

const SuccessScreen = ({ navigation }: { navigation: any }) => {
    return (
        <View>
            <View style={styles.icon}>
                <RegistrationInfoIcon />
            </View>
            <Text style={styles.successMessage}>Supafo ekibi 48 saat içinde seninle iletişime geçecek. İşletmen onaylanırken sabırlı ol ve Heyecanını kaybetme çünkü biz seni gördüğümüze sevindik!</Text>
            {/* <TouchableOpacity
                style={[styles.sendButton]}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.sendText}>geri</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={styles.sendButton}
                onPress={() => navigation.navigate(routes.HOME_TAB_SCREEN as never)}
            >
                <Text style={styles.sendText}>İncele</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SuccessScreen;

const styles = StyleSheet.create({
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 84,
    },
    successMessage: {
        color: '#000000',
        fontSize: scale(13),
        textAlign: 'center',
        fontWeight: "500",
        marginTop: 30,
    },
    sendButton: {
        alignItems: 'center',
        marginTop: 50,
    },
    sendText: {
        width: '80%',
        backgroundColor: colors.greenColor,
        textAlign: 'center',
        padding: scale(8),
        fontSize: moderateScale(14),
        color: 'white',
        borderRadius: 15,
        fontWeight: "500",
    }
});
