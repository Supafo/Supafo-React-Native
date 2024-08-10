export interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  backButtonImage: any; //Image for backButton
}

export interface LockIconProps {
  lockImage: any; //Image for LockIcon
}

export interface CountryCodeInputProps {
  countryCode: string;
  setCountryCode: (value: string) => void;
  pickerIcon: any; //Image for Picker Icon
}

export interface PhoneNumberInputProps {
  phone: string;
  setPhone: (value: string) => void;
}

export interface SubmitButtonProps {
  onPress: () => void;
  isEnabled: boolean;
  title: string;
}
