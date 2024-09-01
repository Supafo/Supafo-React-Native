import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../../../../components/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../../theme/colors';
import { moderateScale, scale } from 'react-native-size-matters';
import { ProgressStepComponent } from './components';
import FormSections from './FormSections';
import { useNavigation } from '@react-navigation/native';
import SuccessScreen from './FormSections/SuccessScreen';

type Props = {};

const JoinSupafoForm = (props: Props) => {
  const navigation = useNavigation(); 
  const [currentStep, setCurrentStep] = useState<any>(0)
  function handleSave() {
    if(currentStep === 6){
      navigation.navigate(SuccessScreen)
    }else{
    setCurrentStep(currentStep + 1)
    }
  }
  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <Header title={headerTitleMap[currentStep]} />
      <ProgressStepComponent
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <FormSections currentStep={currentStep} />
      <TouchableOpacity style={[styles.sendButton]}
        onPress={() => {
          handleSave();
        }}
      >
        <Text
          style={styles.sendText}
        >
          {currentStep === 6 ? 'Onayla' : 'Kaydet '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinSupafoForm;

const headerTitleMap: any = {

  0: "İşletme Bilgileri",
  1: "İletişim Bilgileri",
  2: "İşletme Kategorisi",
  3: "Çalışma Saatleri",
  4: "Ödeme Bilgileri",
  5: "İşletme Kayıt Belgeleri",
  6:"İşletme Kaydı",
}

const styles = StyleSheet.create({
  sendButton: {
    alignItems: 'center',
  },
  sendText: {
    width: '89%',
    backgroundColor: colors.greenColor,
    textAlign: 'center',
    padding: scale(10),
    fontSize: moderateScale(17),
    color: 'white',
    borderRadius: 15,
    marginBottom:40,
  },
});
