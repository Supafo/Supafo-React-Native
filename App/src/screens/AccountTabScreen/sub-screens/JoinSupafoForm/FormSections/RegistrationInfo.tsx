import { StyleSheet, View } from "react-native";
import { HeaderInfo, InfoSection } from "../components";
import { RegistrationInfoIconSm } from "../../../../../assets/images";
import Text from "../../../../../components/Text";
import { ScrollView } from "react-native-gesture-handler";
import PolicyModal from "../components/PolicyModal";

export default function RegistrationInfo({ values }: { values: any }) {
    console.log(values)
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.containerWrapper}>
            <View style={styles.icon}>
                <RegistrationInfoIconSm />
            </View>
            <Text style={styles.text}>İşletmenizi hemen kaydedin, fazla ürünlerinizi değerlendirin ve yeni müşterilerle yeni gelir kapılarını aralayın!</Text>
            <View style={styles.viewWrapper}>
                <HeaderInfo
                    header='İşletme Bilgileri'
                />
                <InfoSection
                    title='İşletme Adı'
                    value={values.isletme_adi}
                />
                <InfoSection
                    title='Vergi No'
                    value={values.vergi_no}
                />
                <InfoSection
                    title='İşletme Adresi'
                    value={values.isletme_adresi}
                />
            </View>
            <View style={styles.viewWrapper}>
                <HeaderInfo
                    header="İletişim Bilgileri"
                />
                <InfoSection
                    title='Telefon Numarası'
                    value={values.tel_no}
                />
                <InfoSection
                    title='Email'
                    value={values.email}
                />
                <InfoSection
                    title='Web Sitesi'
                    value={values.web_sitesi}
                />
            </View>
            <View style={styles.viewWrapper}>
                <HeaderInfo
                    header="İşletme Kategorisi"
                />
                <InfoSection
                    title='Kategori'
                    value={values.category}
                />
            </View>
            <View style={styles.viewWrapper}>
                <HeaderInfo
                    header="Çalışma Saatleri"
                />
                <InfoSection
                    title='Açılış Saati'
                    value={values.opening_hour}
                />
                <InfoSection
                    title='Kapanış Saati'
                    value={values.closing_hour}
                />
            </View>
            <View style={styles.viewWrapper}>
                <HeaderInfo
                    header="Ödeme Bilgileri"
                />
                <InfoSection
                    title='Banka Adı'
                    value={values.banka_adi}
                />
                <InfoSection
                    title='Hesap Sahibi Adı'
                    value={values.hesap_sahibi_adi}
                />
                <InfoSection
                    title='IBAN'
                    value={values.iban}
                />
                <InfoSection
                    title='Swift/BIC Kodu'
                    value={values.swift_bic_kodu}
                />
                <InfoSection
                    title='Şube Adı ve Kodu'
                    value={values.sube_adı_kodu}
                />
                <InfoSection
                    title='Hesap Türü'
                    value={values.hesap_turu}
                />
                <InfoSection
                    title='Para Birimi'
                    value={values.para_birimi}
                />
            </View>
            <View style={styles.viewWrapper}>
                <HeaderInfo
                    header="İşletme Kayıt Belgeleri"
                />
                <InfoSection
                    title='Sağlık Bakanlığı'
                    value=""
                />
                <InfoSection
                    title='Tarım ve Orman Bakanlığı '
                    value=""
                />
            </View>
            <PolicyModal />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerWrapper: {
        gap: 25,
        marginLeft: 20,
        marginRight: 20,
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        color: '#000000',
        textAlign: 'center',
        fontWeight: "500"
    },
    viewWrapper: {
        gap: 15
    }
})