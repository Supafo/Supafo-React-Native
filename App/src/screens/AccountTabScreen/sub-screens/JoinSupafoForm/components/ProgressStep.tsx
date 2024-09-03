import StepIndicator from 'react-native-step-indicator';
import { StyleSheet, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
export default function ProgressStepComponent({ currentStep, setCurrentStep }: any) {
if(currentStep === 6){
    return null
}
    return (
        <View >
            <StepIndicator
                onPress={(step) => setCurrentStep(step)}
                currentPosition={currentStep}
                stepCount={6}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    sendButton: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: "green",
        textAlign: 'center',
        padding: scale(10),
        fontSize: moderateScale(17),
        color: 'white',
        borderRadius: 15,
    },
});