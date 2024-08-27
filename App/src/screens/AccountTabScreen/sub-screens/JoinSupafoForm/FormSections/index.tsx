import { Text, View } from "react-native";
import FormJoinSupafo from "./FormJoinSupafo";


export default function FormSections({ currentStep }: { currentStep: number }) {
  return (

    //bu View ı form component i ile sarmallayıp. inputları form ları vs ayarlayacaksın. bunu kullanıcıların girdiği dataları çekebilmek için yapıyoruz.
    <View style={{ flex: 1 }}>
      {currentStep === 0 && <View>
        <Text>
          <FormJoinSupafo />
        </Text>
      </View>}
      {currentStep === 1 && <View>
        <Text>1</Text>
      </View>}
      {currentStep === 2 && <View>
        <Text>I2sa</Text>
      </View>}
      {currentStep === 3 && <View>
        <Text>Is3a</Text>
      </View>}
      {currentStep === 4 && <View>
        <Text>Isa4</Text>
      </View>}
      {currentStep === 5 && <View>
        <Text>Isa5</Text>
      </View>}
    </View>
  )
}
