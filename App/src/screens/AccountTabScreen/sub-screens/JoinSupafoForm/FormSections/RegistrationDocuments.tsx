import { StyleSheet, View } from "react-native";
import Text from "../../../../../components/Text";
import DocumentPicker from 'react-native-document-picker'
import { FileIcon } from "../../../../../assets/images";
import { moderateScale, scale } from "react-native-size-matters";
import { colors } from "../../../../../theme/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function RegistrationDocuments({ control, errors }: { control: any, errors: any }) {
    const selectDoc = async () => {
        try {
            const doc = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf]
            });
            console.log(doc)
        } catch (err) {
            if (DocumentPicker.isCancel(err))
                console.log("esra", err);
            else
                console.log(err)
        }
    }
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.sendHeaderText}> Sağlık Bakanlığı Onaylı Belge</Text>
                <TouchableOpacity
                    style={[styles.sendButton]}
                    onPress={() => { selectDoc }}
                >
                    <View style={styles.sendButtonContainer}>
                        <FileIcon />
                        <Text style={styles.sendText}>Dosya Yükle</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.sendHeaderText}> Tarım ve Orman Bakanlığı Onaylı Belge</Text>
                <TouchableOpacity
                    style={[styles.sendButton]}
                    onPress={() => { selectDoc }}
                >
                    <View style={styles.sendButtonContainer}>

                        <FileIcon />
                        <Text style={styles.sendText}>Dosya Yükle</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        gap: 60
    },
    container: {
        gap: 35,
    },
    sendHeaderText: {
        color: '#333333',
        fontSize: moderateScale(16),
    },
    sendButton: {
        backgroundColor: colors.greenColor,
        borderRadius: 15,
        width:'40%',
        height:moderateScale(34),
        left:110,
        
    },
    sendButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'center',
        gap:9,
        margin:5
    },
    sendText: {
        color: 'white',
    }
})