import { DaySelectionModalProps } from "./component.types";
import { StyleSheet, View, Modal, Button, TouchableOpacity, Text} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import responsiveScale from "../../../utils/responsiveScale";

const {scale, verticalScale, moderateScale} = responsiveScale;
const DaySelectionModal = ({ isModalVisible, setIsModalVisible, daysOfWeek, selectedDays, toggleDaySelection }:DaySelectionModalProps) => {
    return (
      <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Gün Seçin</Text>
            {daysOfWeek.map(day => (
              <TouchableOpacity key={day} style={styles.dayButton} onPress={() => toggleDaySelection(day)}>
                <Text style={styles.dayButtonText}>{day}</Text>
                <View style={[styles.checkbox, selectedDays.includes(day) && styles.selectedCheckbox]}>
                  {selectedDays.includes(day) && <Icon name="check" size={moderateScale(18)} color="#fff" />}
                </View>
              </TouchableOpacity>
            ))}
            <Button title="Kapat" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    );
  };

  export default DaySelectionModal;

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      padding: moderateScale(20),
      backgroundColor: 'white',
      borderRadius: moderateScale(10),
    },
    modalTitle: {
      fontSize: moderateScale(16),
      marginBottom: verticalScale(10),
      textAlign: 'center',
    },
    dayButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: moderateScale(10),
      backgroundColor: '#f1f1f1',
      marginBottom: verticalScale(5),
      borderRadius: moderateScale(5),
    },
    dayButtonText: {
      fontSize: moderateScale(14),
    },
    checkbox: {
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: moderateScale(3),
      borderWidth: 1,
      borderColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedCheckbox: {
      backgroundColor: '#FF9200',
    },
  });
  