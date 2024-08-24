import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../../../../components/Header';
import FlatItemList from '../../components/FlatItemList';
import { joinSupafoData } from '../../data/join-supafo-data';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../../theme/colors';
import { moderateScale, scale } from 'react-native-size-matters';
import { ProgressStepComponent } from './components';
import FormSections from './FormSections';

type Props = {};

const JoinSupafoForm = (props: Props) => {
  const [currentStep, setCurrentStep] = useState<any>(0)
  function handleSave() {
    setCurrentStep(currentStep + 1)
  }
  return (
    <View style={{ backgroundColor: '#F5F5FA', flex: 1 }}>
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
        >Kaydet
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
  3: "4",
  4: "5",
  5: "6"
}

const styles = StyleSheet.create({
  sendButton: {
    width: '100%',
    alignItems: 'center',
  },
  sendText: {
    width: '100%',
    backgroundColor: colors.greenColor,
    textAlign: 'center',
    padding: scale(10),
    fontSize: moderateScale(17),
    color: 'white',
    borderRadius: 15,
  },
});
