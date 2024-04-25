import {showMessage} from 'react-native-flash-message';
import {colors} from '../theme/colors';

export const showSuccess = (message = '', description = '') => {
  showMessage({
    message: message,
    description: description,
    type: 'success',
    backgroundColor: colors.success,
    // icon: "success"
  });
};

export const showInfo = (message = '', description = '') => {
  showMessage({
    message: message,
    description: description,
    type: 'info',
    backgroundColor: colors.medium,
    // icon: "info"
  });
};

export const showFailure = (message = '', description = '') => {
  showMessage({
    message: message,
    description: description,
    type: 'danger',
    backgroundColor: '#FDCDCD',
    // icon: "danger"
  });
};
