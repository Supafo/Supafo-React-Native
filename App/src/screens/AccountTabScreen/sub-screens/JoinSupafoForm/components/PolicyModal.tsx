import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../../../../../components/Text";
import { useRef, useState } from "react";
import Button from "../../../../../components/Button";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { Icon } from "../../../../../assets/images";
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { scale, verticalScale } from "react-native-size-matters";



export default function PolicyModal() {

    const actionSheetRef = useRef<ActionSheetRef>(null);
    function showActionSheet() {
        actionSheetRef.current?.show();
    }
    const [isSecondSelected, setIsSecondSelected] = useState<boolean>(false);

    return (
        <View style={[styles.checkboxes, { paddingHorizontal: 30 }]}>
            <View
                style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}>
                <View
                    style={{
                        alignItems: 'flex-start',
                        paddingTop: verticalScale(2),
                    }}>
                    <BouncyCheckbox
                        bounceEffectIn={1}
                        bounceEffect={0}
                        bounceVelocityIn={0}
                        bounceVelocityOut={0}
                        size={16}
                        innerIconStyle={{
                            borderRadius: 50,
                            borderWidth: 2,
                        }}
                        fillColor="#66AE7B"
                        unFillColor="#fff"
                        text=""
                        isChecked={isSecondSelected}
                        iconStyle={{ borderColor: '#66AE7B', borderRadius: 50 }}
                        textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                        onPress={(isChecked: boolean) => {
                            setIsSecondSelected(isChecked);
                        }}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 13, color: '#000000' }}>
                        <TouchableOpacity onPress={showActionSheet}>
                            <Text style={[styles.policies, { marginRight: 10 }]}>
                                Kullanım Şartları
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 13 }}> ve </Text>
                        <TouchableOpacity onPress={showActionSheet}>
                            <Text style={styles.policies}>Gizlilik Politikası'nı</Text>
                        </TouchableOpacity>
                        <Text>okudum, kabul ediyorum.</Text>
                    </Text>
                    <ActionSheet
                        animated={false}
                        indicatorStyle={{ backgroundColor: '#fff' }}
                        initialSnapIndex={0}
                        containerStyle={{
                            paddingTop: 10,
                            backgroundColor: '#fff',
                        }}
                        statusBarTranslucent
                        closeOnPressBack
                        drawUnderStatusBar={true}
                        gestureEnabled={true}
                        headerAlwaysVisible={false}
                        defaultOverlayOpacity={0.3}
                        ref={actionSheetRef}>
                        <View
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                paddingRight: 16,
                                paddingTop: 20,
                            }}></View>
                        <View>
                            <Image
                                source={Icon}
                                resizeMode="center"
                                style={{ alignSelf: 'center', height: 75 }}
                            />
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}>

                            <View style={{ width: '81%' }}>
                                <Text
                                    style={{
                                        marginTop: 47,
                                        color: '#000000',
                                        fontFamily: 'Inter',
                                        fontWeight: '200',
                                        fontSize: 15,
                                    }}>
                                    Uygulamamızın düzgün çalışması için teknik olarak gerekli verileri topluyoruz. Bu veriler, uygulamaya göz
                                    atabilmeniz ve özelliklerini kullanabilmeniz için gereklidir. Ayrıca uygulama trafiğini, kullanıcı davranışını
                                    ve kullanım kalıplarını toplu düzeyde analiz etmemize ve anlamamıza olanak tanıyan istatistiksel verileri de
                                    topluyoruz. Uygulamadan elde edilen istatistiksel veriler toplanır ve uygulamamızın performansını ve
                                    kullanıcı deneyimini geliştirmek için kullanılır.
                                </Text>
                            </View>
                        </View>
                        <Button
                            style={{
                                borderRadius: 15,
                                width: '81%',
                                alignSelf: 'center',
                                marginTop: 40,
                            }}
                            onPress={() => {
                                actionSheetRef.current?.hide();
                            }}>
                            Anladım
                        </Button>
                        <View style={{ height: 50 }} />
                    </ActionSheet>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    policies: {
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        color: '#66AE7B',
        marginLeft: 10,
        marginRight: 10,
    },
    checkboxes: {
        display: 'flex',
        marginTop: 120,
        marginBottom: 32,
        gap: scale(8),
        paddingHorizontal: 35,
        borderColor: 'black',
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        marginBottom: 20,
    },
    closeButton: {
        alignSelf: 'center',
        backgroundColor: '#2196F3',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})