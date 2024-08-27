import { StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native-gesture-handler";
import BusinessInfo from "./BusinessInfo";
import ContactInfo from "./ContactInfo";
import Category from "./Category";
import { colors } from "../../../../../theme/colors";
import { moderateScale, scale } from "react-native-size-matters";
import WorkingHours from "./WorkingHours";


export default function FormSections({ currentStep }: { currentStep: number }) {

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({})
  const onSubmit = (data: any) => console.log(data)

  return (

    <View style={{ flex: 1 }}>
      {currentStep === 0 && <BusinessInfo control={control} errors={errors} />}
      {currentStep === 1 && <ContactInfo control={control} errors={errors} />}
      {currentStep === 2 && <Category setValue={setValue} errors={errors} />}
      {currentStep === 3 && <WorkingHours control={control} errors={errors} />}
      {currentStep === 4 && <View>
        <Text>Isa4</Text>
      </View>}
      {currentStep === 5 && <View>
        <Text>Isa5</Text>
      </View>}
      <TouchableOpacity style={[styles.sendButton]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.sendText}
        >Form bilgilerini consolda gör
        </Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  sendButton: {
    width: '100%',
    alignItems: 'center',
  },
  sendText: {
    width: '100%',
    backgroundColor: colors.failure,
    textAlign: 'center',
    padding: scale(10),
    fontSize: moderateScale(17),
    color: 'white',
    borderRadius: 15,
    marginBottom: 15
  },
});
