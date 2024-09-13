import {View } from "react-native";
import { useForm } from "react-hook-form";
import BusinessInfo from "./BusinessInfo";
import ContactInfo from "./ContactInfo";
import Category from "./Category";
import WorkingHours from "./WorkingHours";
import PaymentInformation from "./PaymentInformation";
import RegistrationDocuments from "./RegistrationDocuments";
import RegistrationInfo from "./RegistrationInfo";

export default function FormSections({ currentStep }: { currentStep: number }) {

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue, getValues
  } = useForm<any>({})

  const values = getValues()

  return (

    <View style={{ flex: 1 }}>
      {currentStep === 0 && <BusinessInfo control={control} errors={errors} />}
      {currentStep === 1 && <ContactInfo control={control} errors={errors} />}
      {currentStep === 2 && <Category setValue={setValue} errors={errors} />}
      {currentStep === 3 && <WorkingHours control={control} errors={errors} />}
      {currentStep === 4 && <PaymentInformation control={control} errors={errors} />}
      {currentStep === 5 && <RegistrationDocuments control={control} errors={errors} />}
      {currentStep === 6 && <RegistrationInfo values={values} />}
    </View>
  )
}
